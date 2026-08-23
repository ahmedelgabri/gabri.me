/*
 * Satori cannot set Arabic. It hands the run to opentype.js, which throws on
 * Amiri's required-ligature lookup, and it has no bidi pass either — so even
 * fonts it survives come out as disconnected letters in the wrong order.
 *
 * The way through is to do the shaping ourselves and hand satori a run it only
 * has to draw: every letter swapped for the contextual presentation form the
 * U+FE80 block holds for it, and the whole run emitted right-to-left.
 */

/*
 * The block allocates those forms strictly in Unicode order — one slot for the
 * bare hamza, which joins nothing; two for a letter that only joins to its
 * right ('r'), isolated then final; four for one that joins on both sides
 * ('d'), isolated, final, initial, medial. So these tags are the whole table:
 * U+0621…U+063A, then U+0641…U+064A picking the slot counter back up where the
 * first run left it.
 */
const JOINING_RUNS: Array<[number, string]> = [
	[0x0621, 'urrrrdrdrdddddrrrrdddddddd'],
	[0x0641, 'dddddddrrd'],
]

type Joining = 'u' | 'r' | 'd'

interface Letter {
	joining: Joining
	/* Isolated, final, and — for the dual-joining letters — initial, medial */
	forms: number[]
}

const LETTERS = new Map<number, Letter>()

let slot = 0xfe80
for (const [start, tags] of JOINING_RUNS) {
	for (let i = 0; i < tags.length; i++) {
		const joining = tags[i] as Joining
		const count = joining === 'u' ? 1 : joining === 'r' ? 2 : 4
		const forms = Array.from({length: count}, (_, n) => slot + n)
		LETTERS.set(start + i, {joining, forms})
		slot += count
	}
}

/*
 * Lam followed by alef is not two letters but one glyph — the block's only
 * mandatory ligature. The four pairs sit past ي, isolated then final, in the
 * alef order the block itself uses.
 */
const LAM = 0x0644
const LAM_ALEF = new Map([
	[0x0622, 0xfef5],
	[0x0623, 0xfef7],
	[0x0625, 0xfef9],
	[0x0627, 0xfefb],
])

const ISOLATED = 0
const FINAL = 1
const INITIAL = 2
const MEDIAL = 3

/**
 * Shape a run of Arabic into presentation forms in visual order, ready to be
 * drawn left to right. Only for pure Arabic runs: the reversal at the end
 * would flip any Latin caught in the same string.
 */
export function shapeArabic(text: string): string {
	const codes = Array.from(text, (char) => char.codePointAt(0) ?? 0)
	const glyphs: string[] = []

	for (let i = 0; i < codes.length; i++) {
		const letter = LETTERS.get(codes[i])

		if (!letter) {
			glyphs.push(String.fromCodePoint(codes[i]))
			continue
		}

		const previous = LETTERS.get(codes[i - 1] ?? 0)
		const next = LETTERS.get(codes[i + 1] ?? 0)
		/* Only a dual-joining letter reaches forward, and only a joining one accepts it */
		const joinsBack = letter.joining !== 'u' && previous?.joining === 'd'
		const joinsOn =
			letter.joining === 'd' && next !== undefined && next.joining !== 'u'

		const ligature =
			codes[i] === LAM ? LAM_ALEF.get(codes[i + 1] ?? 0) : undefined
		if (ligature !== undefined) {
			glyphs.push(String.fromCodePoint(joinsBack ? ligature + 1 : ligature))
			/* The alef has been consumed by the ligature */
			i++
			continue
		}

		const form = joinsBack
			? joinsOn
				? MEDIAL
				: FINAL
			: joinsOn
				? INITIAL
				: ISOLATED
		glyphs.push(String.fromCodePoint(letter.forms[form]))
	}

	return glyphs.reverse().join('')
}
