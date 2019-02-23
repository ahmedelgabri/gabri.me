---
title: 'Analyzing & optimizing your webpack bundle'
published: true
date: '2017-01-29'
tags: ['webpack', 'performance', 'JavaScript']
---

One of the problems I noticed with many developers that when they use a module
bundler like Webpack, Browserify, etc… they tend to think that it will
automagically handle optimization for them just by enabling & using all the
optimization plugins available in the tool.

But that’s not true, while these bundlers plus their plugins & optmization
settings can handle nearly 90% of the this issue, you still need to handle the
rest yourself or at least measure & check every once in a while what your bundle
looks like. So I’ll show you a couple of things you can do with Webpack to
optimize your bundle even more.

I’ll cover how to analyze your bundle & remove things you don’t need (you might
even not be aware of some stuff, more on that latter)

So let’s start…

## Analyzing your Webpack bundle

I have a very simple react app here, you just type in the input field & it will
slugify the output of what you typed.

![](/img/webpack-analyze-app.gif)

That's the code for the app, pretty normal stuff nothing fancy here.

```js
import React, {Component} from 'react'
import {render} from 'react-dom'
import slug from 'slug'

const Input = ({onChange}) => <input type="text" onChange={onChange} />

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
    }

    this.handleEvent = this.handleEvent.bind(this)
  }

  handleEvent(e) {
    this.setState({text: e.target.value.trim()})
  }

  render() {
    return (
      <div>
        <Input onChange={this.handleEvent} />
        <p>{slug(this.state.text) || 'Start typing...'}</p>
      </div>
    )
  }
}

render(<App />, document.querySelector('#App'))
```

So, you run it through Webpack & eveything is fine, right? It compiles, works &
everyone is happy. But look at this output from Webpack.

![](/img/webpack-analyze-output.jpg)

The bundle size is **1.84mb**! And there is this file called `So.js` which is
`1.91mb` alone, and it's coming from a folder called `unicode/category`. How can
we get more info about this?

You have a couple of options here:

1. Open `node_modules` & `grep`, `find` or even manually to try & find where is
   that `unicode` folder is.
2. Use Webpack's powerful CLI flags to get more data & information about your
   bundle.

I'll go with the second option, so I'll add this script to my `package.json` so
I can run the command easily

```json
{
  "name": "webpack-analyze",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "NODE_ENV=production webpack",
    "debug": "npm run build -- --progress --colors --profile --display-modules --display-reasons --display-error-details"
  },
  "license": "MIT",
  "dependencies": {
    "babel-core": "6.22.1",
    "babel-loader": "6.2.10",
    "babel-preset-es2015": "6.22.0",
    "babel-preset-react": "6.22.0",
    "react": "15.4.2",
    "react-dom": "15.4.2",
    "slug": "0.9.1",
    "slugify": "1.1.0",
    "webpack": "2.2.0"
  }
}
```

> Tip: you can reuse `npm run` scripts in other npm scripts & pass flags to them
> by adding `--` between the command & the flags. Like in the `debug` script
> here.

This `npm run debug` will simply reveal more info about the bundle & modules
that will allow us to narrow down what is the problem exactly. I recommend to
read more about the [Webpack CLI](https://webpack.js.org/api/cli/) to get an
idea on what else you can do. So after running `npm run debug` you will get
something like this (_it's too big to put it all in the post so this is just the
part that we are interested in_)

![](/img/webpack-analyze-debug.jpg)

So now we know that `So.js` is related to the `slug` module, great. So it turns
out that the `slug` module, has a `postinstall` hook that creates some unicode
files to handle different languages & `So.js` is one of them & it holds mainly
Arabic & Tibetan unicode symbols.

Another solution to check your bundle which can actually help you even, is using
something like
[`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer).
Because it visualizes the size of your dependency tree using tree maps, it
should look like this.

![](/img/webpack-bundle-analyzer.jpg)

So, the perfect scenario you would use a different module other than `slug`, but
let's assume that you can replace this right now for whatever reason (time,
overhead, etc...) you still don't want to serve these `~2mb` for your users. So
how can you do this?

Turns out that solutions was pretty simple, you can use Webpack's
[`IgnorePlugin`](https://webpack.github.io/docs/list-of-plugins.html#ignoreplugin)
to tell Webpack to ignore this file from the bundle.

```js
plugins: [
  // ignore the So.js unicode table file (mainly it contains Arabic & tibitan unicode data)
  new webpack.IgnorePlugin(/unicode\/category\/So/, /node_modules/),
]
```

And here is the output after that change, the bundle is only `150KB` now.

![](/img/webpack-analyze-output-after.jpg)

Congratulations, you have just removed `~2mb` from your bundle 🎉

While following best practices when setting up Webpack can go a long way for
optimizing your bundle, you still need to monitor it for any sudden size
increase and/or audit it every once in a while to make sure things like this
doesn't happen.

If you want to play with the code it's on
[Github](https://github.com/ahmedelgabri/webpack-analyze)
