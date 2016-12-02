I have been using <a href="http://gulpjs.com" onclick="javascript:_gaq.push(['_trackEvent','outbound-article','http://gulpjs.com']);">gulp</a> for a couple of months now &#038; I like how simple it is compared to Grunt also that I'm actually writing code not configurations &#038; it's easier to understand.

<!-- more -->

When I was converting the project I'm working on now from Grunt to Gulp I had this idea, why not make the default task as TOC to list all available tasks? instead of using it for a real task. How many times you cloned/forked/collaborated on a project &#038; had to open `Gruntfile.js` or `Gulpfile.js` to check which task you should run or open `README.md` to check this?

So I decided to make the default task as TOC of all the tasks available in the `Gulpfile.js` and this is what I came up with.

```javascript
// This is (optional) if you don't want colored output
// you can ditch this if you are not using it for anything else.
var utils = require('gulp-util');

gulp.task('default', function() {
    var tasks = Object.keys(gulp.tasks).sort();
    utils.log(utils.colors.yellow('You have the following tasks to run:'));
    tasks.forEach(function(t){
        if(t === 'default') return;
        utils.log(utils.colors.yellow('• gulp '+ t ));
    });
});
```

I'm getting the task names as an array using `Object.keys()`, sorting them alphabetically, then looping through the array &#038; printing out each task name excluding the default task.

Of course this is so raw now, as it currently lists _all_ the tasks available, maybe you don't want to do this or you want to list just the main/important tasks. I think this is very useful especially in teams &#038; open source projects.

What do you think about this? I'd like to get feedback &#038; ideas on how to improve this.

