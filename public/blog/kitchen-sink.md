OK, so images can get quite complicated as we have a few variables to work with! For example the image below has had a caption entered in the WordPress image upload dialog box, this creates a [caption] shortcode which then in turn wraps the whole thing in a `div` with inline styling! Maybe one day they'll be able to use the `figure` and `figcaption` elements for all this. Additionally, images can be wrapped in links which, if you're using anything other than `color` or `text-decoration` to style your links can be problematic.

<div id="attachment_28" class="wp-caption alignnone" style="width: 510px"><a href="#"><img src="assets/img_large.png" alt="Your Alt Tag" title="bmxisbest" width="500" height="300" class="size-large wp-image-28" /></a>
<p class="wp-caption-text">This is the optional caption.</p>
</div>

The next issue we face is image alignment, users get the option of _None_, _Left_, _Right_ &amp; _Center_. On top of this, they also get the options of _Thumbnail_, _Medium_, _Large_ &amp; _Fullsize_. You'll probably want to add floats to style the image position so important to remember to clear these to stop images popping below the bottom of your articles.

<img src="assets/img_medium.png" alt="Your Alt Title" title="Your Title" width="300" height="200" class="alignright size-medium wp-image-28" />

<img src="assets/img_thumb.png" alt="Your Alt Title" title="Your Title" width="150" height="150" class="alignleft size-thumbnail wp-image-28" />

<img class="aligncenter size-medium wp-image-28" title="Your Title" src="assets/img_medium.png" alt="Your Alt Title" width="300" height="200" />

<img src="assets/img_full.png" alt="Your Alt Title" title="Your Title" width="840" height="300" class="alignnone size-full wp-image-28" />

Additionally, to add further confusion, images can be wrapped inside paragraph content, lets test some examples here.<img src="assets/img_medium.png" alt="Your Alt Title" title="Your Title" width="300" height="200" class="alignright size-medium wp-image-28" />

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur.<img src="assets/img_thumb.png" alt="Your Alt Title" title="Your Title" width="150" height="150" class="alignleft size-thumbnail wp-image-28" />Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur.<img src="assets/img_thumb.png" alt="Your Alt Title" title="Your Title" width="150" height="150" class="aligncenter size-thumbnail wp-image-28" />Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur.
And then... Finally, users can insert a WordPress [gallery], which is kinda ugly and comes with some CSS stuck into the page to style it (which doesn't actually validate, nor does the markup for the gallery). The amount of columns in the gallery is also changable by the user, but the default is three so we'll work with that for our example with an added fouth image to test verticle spacing.
<style type="text/css">#gallery-1{margin:auto;}#gallery-1 .gallery-item{float:left;margin-top:10px;text-align:center;width:33%;}#gallery-1 img{border:2px solid #cfcfcf;}#gallery-1 .gallery-caption{margin-left:0;}</style>
<div id="gallery-1" class="gallery galleryid-1 gallery-columns-3 gallery-size-thumbnail">
<dl class="gallery-item">
<dt class="gallery-icon">
<a href="#" title="Your Title"><img width="150" height="150" src="assets/img_thumb.png" class="attachment-thumbnail" alt="Your Alt Title" title="Your Title" /></a>
</dt>
</dl>
<dl class="gallery-item">
<dt class="gallery-icon">
<a href="#" title="Your Title"><img width="150" height="150" src="assets/img_thumb.png" class="attachment-thumbnail" alt="Your Alt Title" title="Your Title" /></a>
</dt>
</dl>
<dl class="gallery-item">
<dt class="gallery-icon">
<a href="#" title="Your Title"><img width="150" height="150" src="assets/img_thumb.png" class="attachment-thumbnail" alt="Your Alt Title" title="Your Title" /></a>
</dt>
</dl>
<br style="clear: both" />
<dl class="gallery-item">
<dt class="gallery-icon">
<a href="#" title="Your Title"><img width="150" height="150" src="assets/img_thumb.png" class="attachment-thumbnail" alt="Your Alt Title" title="Your Title" /></a>
</dt>
</dl>
<br style="clear: both;" />
</div>
<table>
<thead>
<tr>
<th>Table Head Column One</th>
<th>Table Head Column Two</th>
<th>Table Head Column Three</th>
</tr>
</thead>
<tfoot>
<tr>
<td>Table Footer Column One</td>
<td>Table Footer Column Two</td>
<td>Table Footer Column Three</td>
</tr>
</tfoot>
<tbody>
<tr>
<td>Table Row Column One</td>
<td>Short Text</td>
<td>Testing a table cell with a longer amount of text to see what happens, you're not using tables for site layouts are you?</td>
</tr>
<tr>
<td>Table Row Column One</td>
<td>Table Row Column Two</td>
<td>Table Row Column Three</td>
</tr>
<tr>
<td>Table Row Column One</td>
<td>Table Row Column Two</td>
<td>Table Row Column Three</td>
</tr>
<tr>
<td>Table Row Column One</td>
<td>Table Row Column Two</td>
<td>Table Row Column Three</td>
</tr>
<tr>
<td>Table Row Column One</td>
<td>Table Row Column Two</td>
<td>Table Row Column Three</td>
</tr>
</tbody>
</table>
<ol>
<li>Ordered list item one.</li>
<li>Ordered list item two.</li>
<li>Ordered list item three.</li>
<li>Ordered list item four.</li>
<li>By the way, Wordpress does not let you create nested lists through the visual editor.</li>
</ol>
<ul>
<li>Unordered list item one.</li>
<li>Unordered list item two.</li>
<li>Unordered list item three.</li>
<li>Unordered list item four.</li>
<li>By the way, Wordpress does not let you create nested lists through the visual editor.</li>
</ul>
<blockquote>
Currently WordPress blockquotes are just wrapped in blockquote tags and have no clear way for the user to define a source. Maybe one day they'll be more semantic (and easier to style) like the version below.
</blockquote>
<blockquote cite="http://html5doctor.com/blockquote-q-cite/">
HTML5 comes to our rescue with the footer element, allowing us to add semantically separate information about the quote.
<footer>
<cite>

<a href="http://html5doctor.com/blockquote-q-cite/">Oli Studholme, HTML5doctor.com</a>

</cite>

</footer>
</blockquote>
<h1>Level One Heading</h1>
<h2>Level Two Heading</h2>
<h3>Level Three Heading</h3>
<h4>Level Four Heading</h4>
<h5>Level Five Heading</h5>
<h6>Level Six Heading</h6>
This is a standard paragraph created using the WordPress TinyMCE text editor. It has a <strong>strong tag</strong>, an _em tag_ and a <del>strikethrough</del> which is actually just the del element. There are a few more inline elements which are not in the WordPress admin but we should check for incase your users get busy with the copy and paste. These include <cite>citations</cite>, <abbr title="abbreviation">abbr</abbr>, bits of `code` and <var>variables</var>, <q>inline quotations</q>, <ins datetime="2011-12-08T20:19:53+00:00">inserted text</ins>, text that is <s>no longer accurate</s> or something <mark>so important</mark> you might want to mark it. We can also style subscript and superscript characters like C0<sub>2</sub>, here is our 2<sup>nd</sup> example. If they are feeling non-semantic they might even use <b>bold</b>, <i>italic</i>, <big>big</big> or <small>small</small> elements too.
Incidentally, these HTML4.01 tags have been given new life and semantic meaning in HTML5, you may be interested in reading this <a title="HTML5 Semantics" href="http://csswizardry.com/2011/01/html5-and-text-level-semantics">article by Harry Roberts</a> which gives a nice excuse to test a link.

It is also worth noting in the "kitchen sink" view you can also add <span style="text-decoration: underline;">underline</span>
styling and set <span style="color: #ff0000;">text color</span> with pesky inline CSS.
<p style="text-align: left;">Additionally, WordPress also sets text alignment with inline styles, like this left aligned paragraph.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.
<p style="text-align: right;">This is a right aligned paragraph.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.
<p style="text-align: justify;">This is a justified paragraph.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.
<p style="padding-left: 30px;">Finally, you also have the option of an indented paragraph.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.
And last, and by no means least, users can also apply the `Address` tag to text like this:
<address>123 Example Street,

Testville,

West Madeupsburg,

CSSland,

1234</address>
...so there you have it, all our text elements
