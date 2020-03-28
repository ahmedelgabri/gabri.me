---
title: 'Custom colors in your ZSH prompt'
published: true
date: '2013-01-24'
tags: ['commandline', 'zsh', 'shell']
---

I have been using [ZSH](https://github.com/robbyrussell/oh-my-zsh/) as my main
shell for nearly a year &amp; I really love it! Most of my days are between
[iterm2](http://www.iterm2.com/) &amp;
[Sublime Text 2](http://www.sublimetext.com/). So customizing both are a natural
thing for me.

<!-- more -->

So I have already customized my terminal to a very good extend but lately I have
been more into trying to do some shell scripts to fasten my workflow. Like
pushing, Committing, minifying and/or compiling my [Sass](http://sass-lang.com/)
code. I wanted to output some colored messages in the terminal but I didn't like
my limited color pallet in the terminal (Red, Green, Yellow, Cyan, White, Black,
etc..) I wanted different color hues &amp; some fancy stuff.

So I searched for this if it's possible <del> &amp; I found
[this](https://github.com/robbyrussell/oh-my-zsh/issues/1101) for ZSH &amp;
iterm2, another search for "Spectrum" &amp; I found
[this function](https://github.com/robbyrussell/oh-my-zsh/blob/master/lib/spectrum.zsh#L22)</del>
Actually, it turned out that the spectrum function is already in
[ohmyzsh](https://github.com/robbyrussell/oh-my-zsh/blob/master/lib/spectrum.zsh#L23)
. Drop this function inside your `.zshrc` file then call `spectrum_ls` in the
terminal &amp; boom! watch the magic.

<img src="/img/zsh-colors.png" alt="zsh-colors" class="aligncenter size-full wp-image-891" />

Now all you need to is to reference the color code outputted like so `$FG[000]`
in your ZSH theme, just replace "000" with the color code "000" is black btw
&amp; you are good to go! for example in create a new ZSH theme &amp; try this
`PROMPT='$FG[154]%~%{$reset_color%} '`.

I hope someone can find this useful, I didn't know about it before &amp; I'm
really in love with the terminal.
