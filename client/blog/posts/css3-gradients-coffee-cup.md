Last week while i was reading through my RSS feeds i found to great articles wrote by [David DeSandro](http://desandro.com/), the 1st one was about making [Opera logo purely with CSS](http://desandro.com/articles/opera-logo-css/) and the other one was making a [pure CSS font](http://desandro.com/resources/curtis-css-typeface/).

<!-- more -->

In this time i was redesigning my site and adding a blog to it , so i was thinking about a my first post what will it be so after reading David`s articles i remembered a tutorial at PSDTUTS+ [using Gradients to make a Coffe cup](http://psd.tutsplus.com/tutorials/tutorials-effects/using-gradients-to-make-light-and-shadow-and-a-coffee-cup/) so i wanted to see if i can replicate this with CSS only  so the credit goes to David for giving me the inspiration to do this.

```html
<div id="wrapper">
    <div id="base_shadow"></div>
    <div id="base" class="base"></div>
    <div id="base_highlight"></div>
    <div id="base_gradient"></div>
    <div id="hand_shadow"></div>
    <div id="cup_shadow"></div>
    <div id="hand"></div>
    <div id="cup_base" class="base"></div>
    <div id="cup_gradient"></div>
    <div id="coffee"></div>
    <div id="smoke"></div>
</div>
```

So it's consists of 12 divs think of it as 12 layers , no Z-index used cause once you declare Position property to an element it gets a Z-Index higher than the element before it so the order of the elements are important to write clean CSS code. The Wrapper div is set to position:relative and all inner divs set to position:absolute to be able to position them relative to it's parent which in this case is the wrapper div.

To center the inner divs easily i have a trick , subtract the width of the inner div from the parent div that it will be position relative to then divide the result by 2 and the same for the height for example: ( #base width - #wrapper width /2 = the top position ) the same for the height. _I'm not sure this will work in all situations._

The CSS is very easy , to make complete circles just assign a border-radius which is half the height and width of the element and that's it check [this article](http://blog.creativityden.com/the-hidden-power-of-border-radius-2/) for more info about the border-radius.

Then we get to the interesting part gradients i personally like [Mozilla's declaration](https://developer.mozilla.org/en/CSS/-moz-linear-gradient) over the [Webkit](http://developer.apple.com/safari/library/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Gradients/Gradients.html) one cause it's more easy for me to remember and work with ( BTW , how can you make an ellipse Gradient for webkit ? ). I'll be glad to hear any feedback.

_Update:_ Today after Opera released it's latest [beta](http://www.opera.com/browser/next/) they now supports CSS3 gradients so i've updated the demo & the downloaded files

<a class="jsbin-embed" href="http://jsbin.com/nateta/1/embed?output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
