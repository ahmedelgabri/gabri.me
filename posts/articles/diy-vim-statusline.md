---
title: 'DIY Vim statusline'
published: true
date: '2015-10-05 14:00'
tags: ['vim','unix','terminal']
---
Nearly two years ago I decided to switch to Vim and move all my work into one
app. The command line/Terminal or more sepcifically iTerm2. That desicion turns
out to be one of the best things I've ever done. I'm still not a Vim expert by
any means but I always look for ways to improve my workflow.

As anyone who starts to use Vim you start installing lots of plugins to try and
emulate some functionalities that you are used to in your text editor or IDE.
Which is a wrong thing to do, but that's a different story and already lots of
people talk about this before.

So one of the things that is important in Vim is the statusline it shows lots of
useful info about the file you are editing and the mode you are currently on,
etc... and as nearly everything in Vim it's insanely customizable so I went with
the easiest solution which was
[airline](https://github.com/bling/vim-airline), Airline is really powerful and
customizable too. But after a while and as I usually do; I try to simplify my
tools as much as I can and reduce the moving parts/dependencies. I started to
read about statusline `:h 'statusline'` and check some articles about Vim and
going through any dotfiles repo I can find and go through its code not only for
Vim but for everything.

I found out that for my needs I actually don't need airline, also because I was
using lots of plugins this started to slow down Vim startup and sometimes
editing too which was a red flag for me cause one of the reason of using Vim was
that it's blazingly fast to start, nearly instant. So I decided I'll write my
own customization to emulate what I liked about airline without all the overhead
of it. I managed to achieve what I want and it turns out to be quite simple.

```vim
" Statusline

let g:currentmode={
    \ 'n'  : 'N ',
    \ 'no' : 'N·Operator Pending ',
    \ 'v'  : 'V ',
    \ 'V'  : 'V·Line ',
    \ '^V'; : 'V·Block ',
    \ 's'  : 'Select ',
    \ 'S'  : 'S·Line ',
    \ '^S' : 'S·Block ',
    \ 'i'  : 'I ',
    \ 'R'  : 'R ',
    \ 'Rv' : 'V·Replace ',
    \ 'c'  : 'Command ',
    \ 'cv' : 'Vim Ex ',
    \ 'ce' : 'Ex ',
    \ 'r'  : 'Prompt ',
    \ 'rm' : 'More ',
    \ 'r?' : 'Confirm ',
    \ '!'  : 'Shell ',
    \ 't'  : 'Terminal '
    \}

" Automatically change the statusline color depending on mode
function! ChangeStatuslineColor()
  if (mode() =~# '\v(n|no)')
    exe 'hi! StatusLine ctermfg=008'
  elseif (mode() =~# '\v(v|V)' || g:currentmode[mode()] ==# 'V·Block' || get(g:currentmode, mode(), '') ==# 't')
    exe 'hi! StatusLine ctermfg=005'
  elseif (mode() ==# 'i')
    exe 'hi! StatusLine ctermfg=004'
  else
    exe 'hi! StatusLine ctermfg=006'
  endif

  return ''
endfunction

" Find out current buffer's size and output it.
function! FileSize()
  let bytes = getfsize(expand('%:p'))
  if (bytes >= 1024)
    let kbytes = bytes / 1024
  endif
  if (exists('kbytes') && kbytes >= 1000)
    let mbytes = kbytes / 1000
  endif

  if bytes <= 0
    return '0'
  endif

  if (exists('mbytes'))
    return mbytes . 'MB '
  elseif (exists('kbytes'))
    return kbytes . 'KB '
  else
    return bytes . 'B '
  endif
endfunction

function! ReadOnly()
  if &readonly || !&modifiable
    return ''
  else
    return ''
endfunction

function! GitInfo()
  let git = fugitive#head()
  if git != ''
    return ' '.fugitive#head()
  else
    return ''
endfunction

set laststatus=2
set statusline=
set statusline+=%{ChangeStatuslineColor()}               " Changing the statusline color
set statusline+=%0*\ %{toupper(g:currentmode[mode()])}   " Current mode
set statusline+=%8*\ [%n]                                " buffernr
set statusline+=%8*\ %{GitInfo()}                        " Git Branch name
set statusline+=%8*\ %<%F\ %{ReadOnly()}\ %m\ %w\        " File+path
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}             " Syntastic errors
set statusline+=%*
set statusline+=%9*\ %=                                  " Space
set statusline+=%8*\ %y\                                 " FileType
set statusline+=%7*\ %{(&fenc!=''?&fenc:&enc)}\[%{&ff}]\ " Encoding & Fileformat
set statusline+=%8*\ %-3(%{FileSize()}%)                 " File size
set statusline+=%0*\ %3p%%\ \ %l:\ %3c\                 " Rownumber/total (%)

hi User1 ctermfg=007
hi User2 ctermfg=008
hi User3 ctermfg=008
hi User4 ctermfg=008
hi User5 ctermfg=008
hi User7 ctermfg=008
hi User8 ctermfg=008
hi User9 ctermfg=007
```

First we need to get create a map of Vim modes and change the color of the
statusline depends on the mode we are in. What `ChangeStatuslineColor()` does
is that it gets the current mode and checks in the `currentmode` map and change
the color of the statusline accordingly. Pretty simple.

Next, the `FileSize()`, `ReadOnly()` and `GitInfo()` are pretty self
explanatory. The next section is how we but all this information together and
construct the statusline.

First we need to tell vim to always show the statusline by doing `set laststatus=2` next we construct our statusline using all the functions that we created before. I won't go through all the code here and I highly recommend reading `:h statusline` what all these characters means.

At last, we set the colors for statusline using `highlight User1-9`, more in `:h hl-User1` and if you want to know where these color values comes from you can
check my previous [article](/blog/custom-colors-in-your-zsh-prompt) on this.

Full credit goes to Reman on [Stackoverflow](http://stackoverflow.com/questions/5375240/a-more-useful-statusline-in-vim/10416234#10416234) and greduan [dotfiles](https://github.com/Greduan/dotfiles/blob/76e16dd8a04501db29989824af512c453550591d/vim/after/plugin/statusline.vim).

Here is a gif for my statusline <a href="/img/statusline.gif"><img src="/img/statusline.gif" alt=""></a> and here is the code in my [vimrc](https://github.com/ahmedelgabri/dotfiles/blob/c4f40c27b295ecfb7673bd29d373cab26b93379b/vim/vimrc.local#L302-L423) _I have enabled true color in iTerm2, Neovm and tmux. So ignore the hex code for colors_

Vim and CLI are both really powerful and the ability to have your workflow in
one place is very productive as everything we don't know it's scary at first but
once you get some basic understanding of it it becomes easier to understand.

