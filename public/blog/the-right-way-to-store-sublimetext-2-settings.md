Most articles I read on the web on this tells you to copy `Packages`, `Pristine packages` & `Installed Packages` folders. but the truth is that you only need to copy `Packages/User` folder.

So, you might ask what about my installed packages, themes, user configs, etc... The answer is, everything is stored inside the ` Packages/User` folder, Yes even your packages. [Sublime Package Control](http://wbond.net/sublime_packages/package_control) installed packages information is stored inside a file called

<!-- more -->

`Package Control.sublime-settings` which resides inside ` Packages/User` & each time you open Sublimetext 2 Package control checks this file to be able to update the packages.

So here is the trick, on a clean installation, package control will find the file but it won't find the packages installed. Then it will install them for you _Just give it some time_. I have personally tested this on 2 machines & it worked.

So on a new machine you do this:
1. Install SublimeText 2
2. Install Package Control "it will ask to restart SublimeText 2"
3. Before opening SublimeText 2 again, copy your Saved ` User/` folder or create a Symbolic link
4. Open SublimeText 2 & wait for the packages to be downloaded
