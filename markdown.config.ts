import plainLight from './src/lib/plain-light.json'
import plainDark from './src/lib/plain-dark.json'

type ShikiNode = {
	type: string
	tagName?: string
	properties?: Record<string, unknown>
	children?: unknown[]
	value?: string
}
type ShikiRoot = {children: ShikiNode[]}
type ShikiMetaContext = {options: {meta?: {__raw?: string}}}

function getCodeBlockTitle(meta?: string): string | undefined {
	return meta
		?.match(/(?:^|\s)(?:filename|title)=(?:"([^"]+)"|'([^']+)'|(\S+))/)
		?.slice(1)
		.find(Boolean)
}

const codeBlockTitleTransformer = {
	name: 'code-block-title',
	root(this: ShikiMetaContext, root: ShikiRoot) {
		const title = getCodeBlockTitle(this.options.meta?.__raw)

		if (!title) {
			return
		}

		/*
		 * Wrapped rather than prepended: the pipeline downstream keeps only the
		 * root's first child, so a title added as the <pre>'s sibling replaces
		 * the code instead of sitting above it.
		 */
		root.children = [
			{
				type: 'element',
				tagName: 'div',
				properties: {className: ['code-block']},
				children: [
					{
						type: 'element',
						tagName: 'div',
						properties: {className: ['code-title']},
						children: [{type: 'text', value: title}],
					},
					...root.children,
				],
			},
		]
	},
}

export const shikiOptions = {
	themes: {
		light: {...plainLight, type: 'light' as const},
		dark: {...plainDark, type: 'dark' as const},
	},
	transformers: [codeBlockTitleTransformer],
}
