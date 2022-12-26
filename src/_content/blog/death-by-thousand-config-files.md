---
title: 'Death by thousand config files'
published: true
date: '2017-08-27'
tags: ['front-end', 'config', 'build tools', 'tooling']
---

Today, a couple of hours ago
[Prettier released version `1.6.0`](https://github.com/prettier/prettier/tree/1.6.0)
with support for `.prettierrc` & `.prettierignore` files. If you follow me on
Twitter you might have noticed how much I love prettier. But at the same time,
you might have noticed my growing pain of the endless stream for `.*rc` &
`.*ignore` files.

One of the things that I **really** liked about prettier was the lack of config
_by any means, files, etc..._

### Here is a list of file config files we currently have in our repo that is only related to front-end tools:

- `.babelrc` - also will support `.js`
- `.eslintrc.js` - supports `.yaml` & `.js`
- `.eslintignore`
- `.npmrc` - Just has `save-exact = true`
- `.nvmrc` - to make sure everyone is using the same node version
- `.yarnrc` - has `exact "true"` & `save-prefix ""`. We use `yarn`
- `package.json` - aside from the normal `package.json` stuff, it contains
  `jest` configuration which I could have already kept in a `jest.config.js`.
- `webpack.config.js` - still a config-ish file, that depends on the loaders
  that you use can depend on the other `.*rc` files too. For example,
  `babel-loader` will pick up the config from `.babelrc`. If you have
  `eslint-loader` it will pick up `.eslintrc`, etc...

### Here are a couple more that we might have in the next few days/weeks:

- `.flowconfig`
- `.stylelintrc`
- `.stylelintignore`

### And of course:

- `.prettierrc`
- `.prettierignore`

### honorary mention:

- `.tsconfig.json` - for typescript
- ~~`.bsconfig.json` - for bucklescript if you use
  [ReasonML](https://reasonml.github.io)~~ actually in ReasonML this might be
  the only config file you need next to `webpack.config.js`. Another _reason_ to
  like it.

#### and more...

Not to mention that `babel-env` & `autoprefixer` now use the `browserlist`
project, which allows you to pass which browsers you want to support so they can
handle the polyfills & prefixes for you & guess what? It also has it's
[own files](https://github.com/ai/browserslist#queries)!

So that makes the total `14` files in our repo. Isn't this a bit too much for
config files? Before everyone starts yelling at me that I can add most of these
configs inside `package.json` - _which I don't mind doing_ - and most probably
will start doing. that's not the main issue.

#### The issue is

- This loop will never end: tomorrow someone comes with a new great tool called
  `X` & they decide they need some config for it & boom we have `.Xrc` &
  `.Xignore` now. This loop will never end this way.
- They are not separate. 90% of the time you will need to change a couple of
  them if you want to add a new tool because all of them relate/work with each
  other. Which makes it painful to deal with.

So I have a simple question here.

<blockquote className="twitter-tweet" data-lang="en">
  If we keep adding new `.*rc` files can we at least try &amp; agree on a single `.*rc` file to hold all of these configs? 🤷🏻‍♂️

&mdash; Ahmed El Gabri (@AhmedElGabri)
<a href="https://twitter.com/AhmedElGabri/status/902236725229101056">August 28,
2017</a>

</blockquote>

I know that not all of these `.*rc` files can be merged into one, but at least
can we agree that many of them can? most of these configs are just `JSON`
objects so why not store them all in one place?

Also, this way if a new tool comes out we just need to add a new key. It doesn't
solve the whole problem but at least it keeps us a little bit saner.

What is wrong with this? And yes it must be a `.js` file:

- Comments are easier than in `.json` files
- You can change the config depends on the environment.
- If you want, you can dynamically generate your config.

```js
// use this to toggle on/off some configs or switch them completely
const isPROD = process.env.NODE_ENV === 'production'

module.exports = {
    jest: { ... },
    babel: { ... },
    prettier: { ... },
    stylelint: { ... }
}
```

Or even better!

<blockquote className="twitter-tweet" data-conversation="none" data-lang="en">
  exactly. why not just have a `.config` dir in the project root, and put all the stuff in there, so they are out of sight, but there if you need to change something. you set up eslint in `.config/eslint/rc.json` or something similar, and its done, on the side.

&mdash; Pavlos Vinieratos (@pvinis)
<a href="https://twitter.com/pvinis/status/1056853151540826112?ref_src=twsrc%5Etfw">October
29, 2018</a>

</blockquote>

### So people might say & how is this better than having multiple files?

The answer is, it's not much better but at least we can have these:

- Less cognitive load
- One place to handle most of the logic (env switching, etc...)
- Restoring some sanity?

I do like all of these projects, they are amazing projects made by smarter
people than I am. I never felt JavaScript fatigue, but I started to feel
Config/rc files fatigue.
