---
title: 'Multiple files search and replace in vim'
published: true
date: '2017-03-12'
tags: ['vim', 'cli', 'productivity']
---

Many people assume that vim is a dumb editor after they see it for the first
time and they start to ask how can I do X like my current editor is doing it.
And that's a mistake, because editing in vim is a different way of thinking. I
did this mistake when I was first learning too, one of those questions that
seems to be very simple is, how can I do search & replace in multiple files in
vim.

The typical way of doing this in most editors is something like clicking
`CTRL/CMD+SHIFT+F` or something which presents you with three fields to add your
search query string, the string you want to replace it with & an optional field
for filetype/extension. Then click `Enter` & you are done.

Simple, yes. Easy, yes. Powerful, not really. Doing multiple files search &
replace is actually very easy & straightforward in vim **(and doesn't require
any plugins)** but it's extremely powerful.

> When you use vim (or even Emacs) your CLI is part of your editor, this means
> that you can use anything that you have installed in your `$PATH`, and for
> anyone who have some decent knowledge about the UNIX philosophy or how the CLI
> works & how powerful it is, they will know that your imagination is the limit.

What I'm going to show here is just the basic idea of how to do a search &
replace in vim, the rest is up to you...

Let's assume you have a comment in each of your files that has the phrase
`I hate vim` & you want to change it to `I love vim`, here is how you can do
this in 2 steps using `:args` & `:argdo` commands

First step,

```vim
:args `grep --recursive --files-with-matches 'I hate vim' .`

" can be shorter

:args `grep -r -l 'I hate vim' .`
```

What will happen here is that the command inside the backticks will run & the
results will be evaluated & passed to `:args` which in turn open vim buffers
from the list of files that this command will return. One caveat here is that
the string you are searching for must be inside single quotes, not double
quotes.

> The powerful part here that you are not tied to `grep` or any other command,
> you can use [`rg`](https://github.com/BurntSushi/ripgrep),
> [`ag`](https://github.com/ggreer/the_silver_searcher),
> [`pt`](https://github.com/monochromegane/the_platinum_searcher),
> [`ack`](https://beyondgrep.com/), `grep` or even `git grep`. Any command that
> will return a list of files to vim will work. vim is just a consumer here.

Second & last step, now that you have multiple buffers opened with your search
results you need to do your replace action on them. Also, optionally save the
files or do something else. If you type `:args` alone now you will see a list a
of the buffers in your arglist _(argumnet list)_, so to run commands on an
arglist you need to use `:argdo` command to do this, in our case we want to
replace a string with another. So we will do this

```vim
:argdo %s/I hate vim/I love vim/g | update
```

Think of `:argdo` as a map function that takes an iterator to loop over a list
applying this iterator on each item of the list, because that's exactly how it
works. `:argdo <iterator>`. Here our _iterator_ is vim's substitute command
`%s/<query>/<replace>/flags` so I'm just saying find the string `I hate vim` &
replace it with `I love vim` with the global flag `g` on, to replace all
instances of the string. The `| update` part is simply telling vim to save the
files. You can do other things if you want before saving.

> In short I tend to think about vim's search & replace with `:args` & `:argdo`
> as functional composition that looks something like this
> `agrdo(args(filter(query)), iterator)` which when you look at it this way
> helps you a lot more than trying to think of it in terms of commands to
> remember or execute.

What I didn't mention here that if you know regex you can do crazy stuff here,
because all these grep programs supports `Regex` & vim also supports it. And as
always `:help` or `:h` is your friend. So read `:h args`, `:h argdo`,
`:h :substitute` for more info.
