---
http://adamsilver.github.io/articles/the-role-of-the-front-end-developer/
http://elyseholladay.github.io/front-end-arch-talk/#/

Developer UX???
Deployment startegy.
AUTOMATION AUTOMATION ATUOMATION.
Documentation.
Styleguide. Code sharing. etc... is not an afterthought. It's extremely important.
More than 3 people touchng the same code/files? you need some a system, rules and enforce them.

One module/File can be crappy. But if you have a crappy system it's very very hard to fix it. So focus on getting the
system right first.

---


If you are reading this, then have one of two problems:

1. You are a Manager/Lead/CTO/etc... and you have huge pile of shitty front-end code that hinders you and your team to go forward with speed.

2. Or you are a front-end developer that have to deal with a huge entangeled and specific pile of scattared spaghetti HTML/CSS/JavaScript code on a daily basis.

Why might ask me why I'm saying this? Because front-end code is easy to write that 90% of the people underestimate the maintainability costs of it on the long run and then it becomes the main bottleneck to add new features and move fast in
the future.

How many times you wanted to ship your product or make a change as simple as changing your header background color but
your Front-end developer is telling you that this change might take 3 days instead of 3 mins because the header partials
is actually 6 partials and those 6 partials are affected by 5 CSS files.

How many times as a Front-end developer you inherited a crappy outsourced project that included every single library on
the internet or a huge legacy codebase that was written 7-8 years ago, maybe is using Mootools, or uses jQuery 1.4, or uses tables for layout or was genereated by Dreamweaver! At least for me I have went through all of this and thankfully I'm still alive but with lots of white hair _actually it's genes_.

Front-end development is becoming more and more complex, you only need to go through
[some](https://gist.github.com/dypsilon/5819504) [of](https://github.com/moklick/frontend-stuff)
[these](https://github.com/dypsilon/frontend-dev-bookmarks) [lists](https://github.com/codylindley/frontend-tools) on
Github to realize this. And now is time to have someone to bring order to your team when it comes to front-end.

A Front-end acrhitect is someone who has the talent to simplify, organize, structure and streamline complex workflows
and that's not a talent that every Senior or Lead front-end developer posses. I've worked with many front-end developers
who were amazing and way better than me, but they never had any sense about code maintanability or resuse. And I'm not
saying this in a bad way at all, these shipped features and projects which is very good thing.

But they did so by making the life of people who inherit these projects hell. I've seen developers using Bootstrap just
to align two divs next to each other or using jQuery just to select some elements _for your info
`document.querySelector()` and `document.querySelectorAll()` works in IE8 using CSS2 selectors, you shouldn't need more
than this_, I've seen people floating/positioning the body tag for no reason other than not understanding how the box
model or positioning context works. Not to mention how all these examples affects performance and user experience.

I'd say as developers our job is 90% maintanability and 10% - _if you are lucky_ - writing stuff from scratch, when it
comes to front-end, anyone, yes anyone can easily write HTML, CSS and even some JavaScript _thanks to jQuery_. I'm not
joking but my wife can actually write HTML and CSS but is she a developer? No way. But not anyone can architecht the
front-end code to be maintainable, extensable and easy to understand. This is the beauty of front-end and here the lies the main problem too.

A Front-end Architect is someone who writes guidelines and enforces them, streamline the workflow, mentor others, share
knowledge, structure your front-end code base and be responsible for the quality of the front-end code. No more X team
is using Bootstrap and Y team is using foundation and Z team is using there own framework, no more some teams like
CommonJS and other teams like AMD or ES6 modules. Especially when teams overlap, all of this is one of the core
responsabilities of a Front-end Architect, of course not alone. He is not a dictator, he needs to discuss this with the
whole front-end team and reach an agreement on this.

It might start from 2 or 4 spaces _I don't like tabs, sorry_ to which module system we are going to use. Front-end folks
are some of the most opinionated people you will ever work with, which is I think is the best thing about Front-end.
I changed my mind on lots of stuff just by having some discussions with my colleagues. But everyone needs to think about
one thing when working in a team, which is the time you take to ship a new feature or project is directly proportional
to the complexity of your front-end structure.




