import {copyFile, rename, rm} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'

const serverDirectory = new URL('../dist/server/', import.meta.url)
const entry = new URL('entry.mjs', serverDirectory)
const astroEntry = new URL('astro-entry.mjs', serverDirectory)
const wrapper = new URL('./cloudflare-entry.mjs', import.meta.url)
const negotiation = new URL('./content-negotiation.mjs', import.meta.url)
const builtNegotiation = new URL('content-negotiation.mjs', serverDirectory)

await rm(astroEntry, {force: true})
await rename(entry, astroEntry)
await Promise.all([
	copyFile(wrapper, entry),
	copyFile(negotiation, builtNegotiation),
])

console.log(
	`Wrapped ${fileURLToPath(astroEntry)} with Markdown content negotiation`,
)
