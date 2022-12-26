---
title: 'RTL on the web, web related tools & maybe more...'
published: true
date: '2018-03-28'
tags: ['front-end', 'design', 'rtl', 'tooling', 'arabic']
---

Last month [@necolas](https://twitter.com/necolas) tweeted a thread about
localization & RTL support in web apps. It's a very nice thread, you should
check it!

<blockquote className="twitter-tweet" data-lang="en">
Does your team work on a localized app? One that needs GUI translations, needs RTL layout, and has user content in multiple languages. What localisation-related challenges are you aware of and struggling with?

&mdash; Nicolas (@necolas)
<a href="https://twitter.com/necolas/status/964935779679051776?ref_src=twsrc%5Etfw">February
17, 2018</a>

</blockquote>

And since I am a native Arabic speaker & also a developer who had his own share
of working on multi-lingual websites I replied to him & we had some discussion
which actually made think about RTL support in general but more specifically in
the context of the Web, Web related tool & maybe even some media tools around
that.

<blockquote className="twitter-tweet" data-lang="en">
As a Native Arabic speaker I find the latter more legible, the one you mention as legible is using Tahoma Arabic font which IMO very bad in Arabic. Feels like Comic Sans but Arabic version.

&mdash; Ahmed El Gabri (@AhmedElGabri)
<a href="https://twitter.com/AhmedElGabri/status/964971931614240768?ref_src=twsrc%5Etfw">February
17, 2018</a>

</blockquote>

I'll start with some known issues with Regards to Arabic support & then more
general problems when working on multi-lingual apps/sites & some solutions for
some of these issues:

- Arabic support in media tools, Photoshop, etc...
- Arabic typography on the web
- RTL development & some wrong assumptions.

So let's start...

### Arabic support in media tools, Photoshop, etc...

This is in my opinion the cause of most of the issues, because people uses these
tools trusting that they are doing the right thing. But the reality is they
don't, did you know that Photoshop used to have two versions? one that supports
mainly Latin languages & one that was supporting RTL languages like Arabic &
Hebrew. It was called (Photoshop CC me) the "me" part I think referred to the
"Middle East" version. It used be released later than the normal version too.

They changed this now, but you need to turn a setting on if you want to right
Arabic [for example](https://forums.adobe.com/thread/1878946)

To understand the problem a bit, you need to understand how the script works.
Written Arabic is a script, so letters are connected to each other & letters
have different shapes depends on the position that they are in. As you can see
in this image from [Wikipedia](https://en.wikipedia.org/wiki/Arabic_alphabet)

<div>
  <div style={{background: 'white', marginBottom: '.5rem'}}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/af/Arabic_Language.svg"
      style={{maxWidth: '100%'}}
    />
  </div>
  <p>This says "The Arabic"</p>
</div>

Compare this to the next image

<div>
  <div style={{background: 'white', padding: '.5rem', marginBottom: '.5rem'}}>
    <img
      src="/img/broken-arabic.svg"
      style={{maxWidth: '100%', margin: '0 auto', display: 'block'}}
    />
  </div>

This exactly the same as above, but in a software that doesn't support Arabic

</div>

This is one of the most common issues with media tools & people who just trust
the tools without doing much research. Funny fact thought, even multi-billion
dollar companies & blockbuster Hollywood movies make this mistake.

You can see more examples about this in this amazing
[Nope not Arabic](https://nopenotarabic.tumblr.com/) by
[@ra](https://twitter.com/ra) and sometimes
[@tha_rami](https://twitter.com/tha_rami) tweets about this too, here is an
example

<blockquote className="twitter-tweet" data-lang="en">
My only criticism of Black Panther is the reuse of this shot. You make a movie empowering non-white people, it&#39;d be nice to just spend 0.002% of your VFX budget on fixing your fake Arabic to actually be Arabic.<br /><br />Black Panther remains an incredible, I&#39;d daresay must-see, movie. https://t.co/G1EmC1eFh6

&mdash; Rami Ismail (@tha_rami)
<a href="https://twitter.com/tha_rami/status/964868593535119360?ref_src=twsrc%5Etfw">February
17, 2018</a>

</blockquote>

### Arabic typography on the web

It's very simple, not that good at all. The default system fonts are very
limited & the most used font (Tahoma Arabic) for lots of people _including me_
feels like the Comic Sans equivalent but for Arabic. The sad part is Arabic
typography is actually very very rich!

So, in order to have nice Arabic typography on the web you need to use a custom
font, but not all Arabic custom fonts are good (there are some exceptions like
[AlAmiri font](http://www.amirifont.org/) by
[@khaledghetas](https://twitter.com/khaledghetas), also & the good Arabic fonts
are mostly not free & very expensive. Hopefully one day some of
[@arabictype](https://twitter.com/arabictype) & @khaledghetas work can be
installed by default on operating systems so we can have better defaults.

And Khaled summed it up better than me:

<blockquote className="twitter-tweet" data-lang="en">
Almost all system fonts were designed decades ago and they were only passable because of the lowres rendering back in the day. Newer ones like Noto and <br /> Segoe UI are better, with the exception of Apple new Arabic UI font which is worse than its predecessor.

&mdash; Khaled Hosny (@KhaledGhetas)
<a href="https://twitter.com/KhaledGhetas/status/965003153438658560?ref_src=twsrc%5Etfw">February
17, 2018</a>

</blockquote>

### RTL development & some wrong assumptions.

There are lots of assumptions here that I read across the web, some of it seems
very logical but in fact wrong.

#### Directional thinking (right/left margins, floats, etc...)

IMO, one of the things that CSS got wrong was using the words "left" & "right"
in `margins`, `paddings`, `floats`, etc... better names would have been `start`
& `end`. Because most developers when they start writing CSS they think in LTR
only (even if they are working on a website that needs to support both) & then
afterwards they slap a stylesheet to "flip everything".

But sometimes you fall in the trap of having your classes named something like:

```css filename=ltr.css
.float-left {
	float: left;
}

.margin-right {
	margin-right: 10px;
}
```

Then you override these in your RTL stylesheet as follows, which is very counter
intuitive, confusing & hard to maintain.

```css filename=rtl.css
.float-left {
	float: right;
}

.margin-right {
	margin-left: 10px;
}
```

Compare that to this, which IMO is easier to understand & maintain

In LTR stylesheet

```css filename=ltr.css
.float-start {
	float: left;
}

.margin-start {
	margin-left: 10px;
}
```

In RTL stylesheet

```css filename=rtl.css
.float-start {
	float: right;
}

.margin-start {
	margin-right: 10px;
}
```

This would have been even better if CSS had these values the same too

```css filename=ltr.css
.float-start {
	float: start;
}

.margin-start {
	margin-start: 10px;
}
```

#### Using `dir="rtl"` on the `<html>` tag

Yes it makes sense & very logical to do so. But do you know that this will flip
the scrollbars to the other side of the screen? Some will say yes this is the
right behavior & since we are "flipping" from LTR to RTL scrollbars should be
flipped too.

If the web started with good RTL support I would have said yes, do it. But
because the web started with mainly English support (LTR) everyone I know in the
Middle East is already accustomed to the scrollbars on the right as they are in
LTR & when flip this it becomes very disorienting & confusing experience.

I can't remember how many times my mom complained to me about this while she was
browsing some Arabic website & finds the scrollbars are on the opposite side of
the screen.

Use `dir="rtl"` on the `<body>` instead, this will flip the text as intended but
will keep the scrollbars in the same place.

#### Flipping media controllers (play, pause, etc...)

Please don't. Like really, don't. It's a terrible terrible idea! These things
are universal, don't confuse the users. Unless you know for sure, like 99.9%
sure that your target users will want this.

#### Arabic numbers reads from Left-to-Right (LTR)

Yes, we write from Right-to-Left but with numbers we do it from Left-to-Right,
make sure to handle this properly whether you use
[`<bdo>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo) or wrap
your numbers in `<span dir="ltr">` just make sure they are LTR & not RTL.

And one more point regarding numbers, what is considered Latin numbers now are
actually the original Arabic numbers & what are considered Arabic numbers now
are actually Hindi numbers. So you don't need to change this too.

#### UI & Design issues when supporting multiple languages

- Your designs should be as fluid as possible, no width on any element. Only
  your grid.
- It should handle long lines & text wrapping without breaking the UI
- If you still live in the age of pixel perfect & the fold, then good luck.

These seem to be very simple rules & even very logical to do, but you would be
amazed how many designers & developers don't follow these rules when working on
a website/app that supports multiple languages.

I can go on & on in RTL development, but these are good enough to get you
started.

I have had my share working on multi-lingual websites/apps, I built apps &
websites for more than 20+ languages including projects that had to support
English, Arabic & Russian for a single website (that was fun!)

Supporting different languages which shares the same alphabets is already hard
enough, so I understand how hard it is to support different language with
different alphabets, direction & rules. So if you plan to support Arabic & RTL
in your app/site please do your homework & don't just add it as an afterthought
or at the end. Because it doesn't work this way, it will hurt your brand & will
also show that you don't care enough about this group of people.

The least thing you can do is to show your app/site/ad/etc... to an Arabic
speaking person before you go live. I'm sure you can find at least one person in
your city who
[speaks Arabic](<https://en.wikipedia.org/wiki/List_of_languages_by_total_number_of_speakers#Ethnologue_(2017_20th_edition)>)
