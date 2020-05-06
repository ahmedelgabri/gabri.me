---
title: 'Quick tip: VirtualBox & localhost'
published: true
date: '2013-04-19'
tags: null
---

This is just a quick tip that I found & I thought it might be useful for others.
How many times you are building something locally & you want to test on
different browsers or even different OSs, All the time of course. Here is a
small tip I found [here](http://ubuntuforums.org/showthread.php?t=682519), If
you are developing locally & have some VirtualBox images "I recommend using
[these](http://www.modern.ie/en-us/virtualization-tools) for IE" & you want to
test your local website/app on your VirtualBox machine just type `10.0.2.2` &
you will access your localhost _this is tested on Mac, I dunno if the same
applies to Windows or not_.

### Apache VirtualHosts

Now, I have a problem cause I'm using Apache VirtualHosts on my machine, this is
how my `httpd-vhosts.conf` file looks like this

```apacheconf filename=httpd-vhosts.conf
 NameVirtualHost *:80

 <VirtualHost *:80>
   VirtualDocumentRoot /Users/<username>/Sites/%1/%-1/build
 </VirtualHost>
```

Now when I try the above method of VirtualBox I can't access my local sites
using VirtualHosts aliases, for the time being when I want to test I disable my
Virtualhosts & enable it back when I'm done. If anyone knows how can I fix this
it'll be great.
