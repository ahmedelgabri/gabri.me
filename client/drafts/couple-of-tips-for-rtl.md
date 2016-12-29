I have dealt with RTL HTML & CSS alot throughout my career & still find that
people still do basic mistakes, even if they are native RTL speakers _(Arabic in
my case)_. So here are a couple of tips.

### Always, always, always _really can't stress this enought_ use the `dir` attribute.

Believe me it'll save you from lots of troubles, it'll fix punctuation & more.
importantlly will help fixing aligning numbers with text _not always, but for
simple stuff_.

---
Example:

<h2> <em>5</em> إعلانات مفعلة و  <em>1</em> رصيد يومي </h2>

---


### Don't use the `dir` attribute on the `<html>` tag.

Most people use it on the `<html>` tag, but it'll flip the scrollbars in IE8-10 & this will confuse the users instead, use it on the `<body>` tag.

### Don't name any of your helper/classes _float-left, align-right, etc..._

When naming your helper classes or any classes that has some kind of direction in it _i.e. `.float-left`, `.align-right`, etc.._ don't use right or left, use _start_ & _end_ and here is why.

If you use `.float-left` then you 90% of the time you will need to flip this
in your RTL stylsheet. Then you will end up with

```
.float-left {
  float: right;
}
```

Very confusing, instead left is always the start of the document in LTR
& right is the end of it & vice versa in RTL so it's logical to use "start"
& "end" instead & now you will not get this confustion anymore.

```
// In LTR stylesheet
.float-start {
  float: left;
}

// In RTL stylesheet
.float-start {
  float: right;
}
```
Now there is not confusion anymore. I wonder why no one from W3C thaought
about this.
