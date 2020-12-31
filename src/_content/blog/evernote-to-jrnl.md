---
title: 'Migrating from Evernote'
published: true
date: '2015-11-08'
tags: ['notes', 'journal', 'python', 'node', 'vim', 'unix', 'terminal']
---

To start, Evernote is nice app. But not for me, I always had this love/hate
relationship with it and with note talking apps in general. All I want from a
note talking app is very simple.

1. I don't need to use the app to write my notes, I can use my favourite text
   editor to do this.
2. Export my notes as text/Markdown.
3. Full Markdown support.
4. Own my data and the ability to choose whatever service I like to sync my
   notes with, iCloud, Dropbox, etc...

Evernote supported none of these requirements, but it was the best one and
recommended by nearly everyone I know. So I started to use it and then after a
couple of years I moved to [simplenote](http://simplenote.com) which was a bit
better but note much better than Evernote, it supported Markdown _to some
extend_ the app was less sluggish too which was a huge plus.

Last year I found about [Alternote](http://alternoteapp.com/) for Evernote, It
combined what I liked between Evernote and Simplenote together and it allowed me
to write note using Markdown. So I went back to Evernote. But I was still not
happy at all.

### Using your text editor of choice

I use Vim and most of my day I spend doing stuff in iTerm2, and I don't see any
point for me to not be able to write my notes using Vim or _insert your fav text
editor here_ and/or using Markdown. Both Evernote and Simplenote don't
officially have any way to do this, so I found these Vim plugins
[evervim](https://github.com/kakkyz81/evervim) and
[simplenote.vim](https://github.com/mrtazz/simplenote.vim) I tried both for a
while but I was not satisfied and it was not the workflow I liked.

I'm aware of [Geeknote](http://www.geeknote.me/) but it was too much for me, I
like simple solutions.

### Export my notes as text/Markdown

- Evernote export is the worst, it export your notes as `.enex` or `.html`.
- Simplenote, exports your notes as text but without any metadata. I didn't like
  this too.

### Full Markdown support

- Evernote: No.
- Simplenote: Yes to some extend.

### Own my data and sync using my favourite service.

Both doesn't support this option.

So I had to find another option because I was really getting annoyed, I tried
lots of apps that integrated with Evernote or Simplenote but I didn't like any
of them. In my search for a better workflow, I found
[jrnl](http://maebert.github.io/jrnl/) _which you can use without Day one_ Which
seemed like exactly what I was looking for. But I needed a way to get my notes
on my phone and also to keep the tagging and search functionality here when
[Day one](http://dayoneapp.com) comes to play. Did I mention that they have an
official [CLI](http://dayoneapp.com/tools/cli-man/) tool too!

### Converting Evernote `.enex` export to `.json`

But in order to do this I have to migrate my notes from Evernote to Day one. But
the export from Evernote is `.enex`, how can I do anything useful with it. I
found this Python package called
[ever2simple](https://github.com/claytron/ever2simple) it was meant to be a tool
to convert `.enex` to `.json` to be able to import your notes into Simplenote
but the irony is that Simplenote doesn't support this anymore!

But still having all my notes as `.json` was a huge improvement to `.enex`

### Create Markdown notes from `.json`

At this point I have a `.json` file with all my notes info in there with all the
metadata too, which is great. Day one CLI tool can import any text format file
to Day one. So at this point I wrote a _dirty_ node script to create all my
notes as Markdown files and import them using the Day one CLI tool.

Here is the _quick & dirty_ script using node and ES2016 (aka ES6) syntax.

```js:script.js
#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {execSync} = require('child_process')
const moment = require('moment')
const slug = require('slug')
const notes = require('./evernote.json')

let title
let tags
let date
let creationDate
let content
let file
let slugg

notes.forEach((note) => {
  title = note.content.split('\n')[0].substring(2)
  slugg = slug(title.toLowerCase())
  date = moment(note.createdate).format('YYYY-MM-DD')
  creationDate = moment(note.createdate).format('YYYY-MM-DD HH:mm')
  tags =
    note.tags.length > 1
      ? note.tags.map((tag) => `#${tag.toLowerCase()}`).join(', ')
      : note.tags.map((tag) => `#${tag.toLowerCase()}`).join()
  file = path.join(__dirname, './evernote-md', `${date}-${slugg}.md`)
  content = `# ${title}
  ---
  date: ${creationDate}
  tags: ${tags}
  ---
${note.content
  .substring(note.content.split('\n')[0].length)
  .replace(/\s?\n\n?\s?/g, '\n')}
`
  console.log(tags)

  fs.writeFileSync(file, content, 'utf-8')
  execSync(`dayone -d="${creationDate}" new < ${file}`)
})
```

At this moment I managed to import all my notes to Day one with my all metadata.
And the nice thing in Day one that if you have `#something` this can be
converted automatically for you as a tag.

### The new workflow and Syncing options

After managing to import all my notes from Evernote to Day one app, now I need
to connect the dots using `jrnl`. jrnl configuration is stored inside
`~/.jrnl_config` file as JSON you can check all the option
[here](http://maebert.github.io/jrnl/advanced.html#configuration-file) It does
support encryption too.

Here is how my configuration looks like

```json:.jrnl_config
{
  "default_hour": 9,
  "linewrap": 79,
  "encrypt": true,
  "default_minute": 0,
  "tagsymbols": "#",
  "editor": "nvim",
  "timeformat": "%Y-%m-%d %H:%M",
  "highlight": true,
  "journals": {
    "default": {
      "journal": "<dayone iCloud path on my laptop>"
    }
  }
}
```

Also in Day one I've set it to iCloud although you can use one or more of these
options:

- Day one sync
- Dropbox
- iCloud
- Custom location

### Rejoice!

Now all I need to do is type `jrnl` in my terminal and it will open my editor
with all my settings, snippets etc... and I can write in Markdown. Once I save,
my note is created in Day one uploaded and synced to all my devices.
