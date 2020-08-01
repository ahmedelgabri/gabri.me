---
title: 'Sass mixin for auto-numbering with CSS'
published: true
date: '2013-05-25'
tags: ['sass']
---

While I was working on a project at work I needed to have " table of contents"
type of numbering in an `<ol>` but I wanted the numbers to be nested too like 1.
, 1.1, 1.2, etc... which is not possible in HTML. And I remembered that I have
faced this problem before &amp; I solved it using
[CSS Counters](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters)
and since I use [Sass](http://sass-lang.com/) now to write CSS. I thought about
creating a `@mixin` for this. So here you go: _ Thanks for
[cimmanon on Stackoverflow](http://stackoverflow.com/questions/16645824/check-for-a-variable-in-sass-mixin-print-it-if-its-defined/16648360?noredirect=1#16648360)
for helping me with this_

```sass
@mixin auto-numbers($numbered-element, $sep, $counter: item, $nested-parent: false ){
    $sel: ();
    @if $nested-parent {
        $sel: append($sel, unquote($nested-parent));

        #{$nested-parent}{
            list-style: none;
            margin-left: 0;
        }
    }
    $sel: append($sel, unquote('&'), comma);

    #{$sel}{
        counter-reset: #{$counter};
        > #{$numbered-element}{
            &:before{
                counter-increment: #{$counter};
                content: if($nested-parent, counters(#{$counter}, "#{$sep} ") "#{$sep} ", counter(#{$counter}) "#{$sep} ") ;
            }
        }
    }
}
```

The `@mixin` takes four arguments & must be called on the parent element:

`$numbered-element` The element that you wanted to counted, in my case it was an
`<li>` it can be anything.

`$sep` s the seprator sign you want to use <b>Must be a string</b>

`$counter` ounter name, if you are using the `@mixin` more than once you must
change the name for each one so it won't reset the counter before it.

`$nested-parent` assing the name of the parent element if you wanted to work in
a nested way like a `<ol>` or `<ul>` inside another `<ol>` or `<ul>`

here is a demo of the mixin in action

<p
  data-height="400"
  data-theme-id="0"
  data-slug-hash="bsIhF"
  data-default-tab="result"
  className="codepen"
>
  See the Pen{' '}
  <a href="http://codepen.io/ahmedelgabri/pen/bsIhF/">
    SASS MIXIN FOR AUTO-NUMBERING WITH CSS
  </a>{' '}
  by Ahmed El Gabri (<a href="http://codepen.io/ahmedelgabri">@ahmedelgabri</a>)
  on <a href="http://codepen.io">CodePen</a>.
</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

### Useful links about CSS counters

- [W3C specs](http://www.w3.org/TR/CSS21/generate.html)
- [MDN CSS counters](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters)
- [David Walsh: CSS Counters](http://davidwalsh.name/css-counters)
- [Opera dev: Automatic numbering with CSS Counters](http://dev.opera.com/articles/view/automatic-numbering-with-css-counters/)
- [impressivewebs: CSS Counters: counter-increment and Friends](http://www.impressivewebs.com/css-counter-increment/)
