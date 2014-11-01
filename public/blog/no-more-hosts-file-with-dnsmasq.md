In my search for the best local development setup on my Mac, I wanted to have local domains something like `project.dev` that can work when I'm working on a project locally instead of `http://localhost/dev/projectname/somethingelse/etc/`. It's easier, faster, cleaner & looks better.

The old way to achieve this needs you to edit the `/etc/hosts/` & Apache `httpd-vhosts.conf` files each time you want to add new project, or if you are using `VirtualDocumentRoot` inside `httpd-vhosts.conf` you will have something like this

```
NameVirtualHost *:80
<VirtualHost *:80>
   VirtualDocumentRoot /Users/<username>/Sites/%1/%-1/build
</VirtualHost>
```

Then you will only need to edit the `hosts` file. Which is still manual & tedious.

The solution I found is using [dnsmasq](http://en.wikipedia.org/wiki/Dnsmasq), the setup actually is easy & straightforward. First you need to install dnsmasq through [Homebrew](http://brew.sh/) `brew install dnsmasq` make sure you follow the steps mentioned after the end of the installation.

Then we need to edit `/usr/local/etc dnsmasq.conf`, let's say you want the local domain name to be `.dev` then you should add this line `address=/.dev/127.0.0.1` to `dnsmasq.conf` if you want to add more domains you can just add a new line with a new domain name. Next we need to create a file called `dev` _with no file extension_  inside `/etc/resolver/` with this `nameserver 127.0.0.1` inside. _If you have multiple domains you will need multiple files, each file name need to match the domain name_

The last step is to setup your `httpd-vhosts.conf` let's say your folder structure is like this

```
Sites/
|- dev/
|--|-project/
|----|-public/
```

Then you will need to add this to your `httpd-vhosts.conf` file

```
<Virtualhost *:80>
    UseCanonicalName Off
    VirtualDocumentRoot "/Users/<username>/Sites/dev/%1/public/"
    ServerAlias *.dev
    LogFormat "%V %h %l %u %t \"%r\" %s %b" vcommon
    ErrorLog "/Users/<username>/Sites/dev/vhosts-error_log"
</VirtualHost>
```

If you have multiple domains then you will need to add more blocks, a block for each domain.

After you save this file you will need to restart Apache & Dnsmasq, but I found that sometimes the dnsmasq settings don't get applied if I restarted it so I restart the computer itself.

Now, try to access any projects you have under the dev folder using this pattern `http://<project-name>.dev` this will always serve what is inside the `public/` folder under this project. whenever you create a new project under the `dev/` folder it will be accessible using `.dev` domain, no need to manually do anything or edit the `hosts` file anymore.
