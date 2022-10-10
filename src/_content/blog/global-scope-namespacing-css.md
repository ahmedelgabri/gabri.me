---
title: 'Global scope, namespacing & CSS'
published: true
date: '2013-08-06'
tags: ['css', 'front-end']
---

> ### Update (2022):
>
> I mainly use https://tailwindcss.com/ at this point & highly recommend it.
>
> ### Update (2016):
>
> Currently I don't use or recommend using BEM with big apps, I prefer
> functional/atomic CSS, CSS modules or CSS in JS with React. These are useful
> links:
>
> - [http://www.jon.gold/2015/07/functional-css/](https://web.archive.org/web/20150823170213/http://jon.gold/2015/07/functional-css/)
> - [https://blog.colepeters.com/building-and-shipping-functional-css/](https://web.archive.org/web/20160315192131/https://blog.colepeters.com/building-and-shipping-functional-css/)
> - https://marcelosomers.com/writing/rationalizing-functional-css/
> - https://glenmaddern.com/articles/css-modules
> - http://tachyons.io/

### The problem

Anyone who worked with `CSS` before knows that one of the biggest problems we
face as front-end developers is that `CSS` lacks scope or namescpacing, unlike
with JavaScript for example. Which makes it very prone to selector conflicts
which is something for sure you have struggled with at least a couple of times,
whether it’s through third-party plugins/apps/API’s injected `CSS` or you
working on an old projects with a tight deadline or even working with other
developers who don’t understand `CSS` very well.

### The fix

Some smart people came up with new ideas to fix it like that:
[Jonathan Snook's SMACSS](http://smacss.com/book/categorizing) or the clever
guys at Yandex with their [BEM](http://bem.info/method/) methodology & syntax
which I prefer and started to use in all my projects.

But with the rise of [OOCSS](http://oocss.org/) and trying to be as modular and
flexible as possible and to make our selectors short and concise, the problem
seems still existant. For example take the media object Harry Roberts mentioned
in his
[article about BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/); the
syntax looks like the following.

```css
.media {
}

.media__img {
}

.media__img--rev {
}

.media__body {
}
```

It’s still prone to conflicts, cause maybe another developers or even a
third-party API decided to use .media class, selectors will conflict and the
last one will win - _I’m not talking about specificity here, my rules are no IDs
& max two selectors per rule. I'm trying to write simplest specific rules as
possible -_, so I’m assuming that this component is first class citizen in your
`CSS`.

### My idea

I’m in the process of writing a small framework to act as my starting point for
any of the projects that I’m working on. So my solution for it was to create a
fake scope. I achieved this by prefixing all my selectors with something like an
your project initials, or your initials _maybe if you work alone_, framework
initials, something that you &amp; your team can understand. **This should be
documented of course**.

So let's make this easier, if we imagined that `CSS` had a global scope like
JavaScript it will look something like this.

```md
global object

    |_ <your prefix>

        |_ media object

        |_ grid

        |_ tabs

        |_ buttons
```

You shouldn’t be using different prefixes in your project, you will only use
**only one per project**. For example lets take the same `.media` object above
and apply this idea to it, assuming that we are working on “realmadrid.com”
website. the new code will look like that:

```css
.rm-media {
}

.rm-media__img {
}

.rm-media__img--rev {
}

.rm-media__body {
}
```

And you will need to apply this to all of your project objects, the pros of this
approach are:

- Your selectors are protected _scoped_ from new selectors by third-party
  plugins/APIs or from new developers
- Easily you will understand if this code was written by you/your team or by
  someone else.
- If you work on multiple projects at a time, it'll make it easier for you to
  understand which project you are working on with a glance.

The only downside I can think of know is it' more verbose especially if you are
going to use multiple classes on the same object like so. Which I stopped caring
about anyway. Code readability is much more important

```html
<div class="clearfix rm-media rm-media--wide rm-theme--green">
	<div class="rm-media__img">
		<!-- code -->
	</div>

	<div class="rm-media__body">
		<!-- code -->
	</div>
</div>
```

Yes I used `.clearfix` without a prefix cause it's not an object class &amp;
most probably when it's used by someone else it is a clearfix, if you want to be
on the safe side maybe you can prefix helper classes with `.h-` or something if
you like I'll be using this technique in all of my upcoming projects &amp; let's
see, but I'm optimistic about this approach. Let me know if you have any ideas
about this or how can I improve it more.

##### Update: YouTube is doing the same.

<a href="/img/youtube.png">
  <img
    src="/img/youtube.png"
    alt="youtube"
    className="aligncenter size-medium wp-image-937"
  />
</a>

#### Useful links

- [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
- [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- [The Evolution Of The BEM Methodology](http://coding.smashingmagazine.com/2013/02/21/the-history-of-the-bem-methodology/)
- [A New Front-End Methodology: BEM](http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/)
