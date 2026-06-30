import plainLight from './src/lib/plain-light.json'
import plainDark from './src/lib/plain-dark.json'

type ShikiRoot = {children: unknown[]}
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

		root.children.unshift({
			type: 'element',
			tagName: 'div',
			properties: {className: ['code-title']},
			children: [{type: 'text', value: title}],
		})
	},
}

export const shikiOptions = {
	themes: {
		light: {...plainLight, type: 'light' as const},
		dark: {...plainDark, type: 'dark' as const},
	},
	transformers: [codeBlockTitleTransformer],
}
