---
layout: blog-post
title: "This Site is Now Entirely on S3 :: Josh D Miller :: joshdmiller.com"
posttitle: This Site is Now Entirely on S3
tags:
    - me
---

Okay, so I got tired of the MongoHQ server connection issues that caused
exceptions on my EC2 instances, and since this particular instance was running
only this blog, I decided to make a change. I have been curious about the
potential for hosting a site on Amazon Web Services' [Simple Storage Service (S3)](http://aws.amazon.com/s3)
since their announcement earlier this year of support for serving an `index.html`,
if present when just a directory is requested, e.g. `www.joshdmiller.com`
returns `www.joshdmiller.com/index.html`.

As this blog is relatively simple, I thought it would be a prime candidate to
test this. Using [Jekyll](http://jekyllrb.com/), a static site generator written
in Ruby, I rewrote the code for this site, which involved only a few major
steps: (1) seting up the basic infrastructure of the site; (2) translating the
[SCAML](http://scalate.fusesource.org/documentation/scaml-reference.html)
templates I used in Scalatra back into HTML; (3) translating the
dynamically-generated content into its static equivalents. The posts were
already in [Markdown](http://daringfireball.net/projects/markdown/) format, so
nothing was really needed here, save some YAML Front Matter, per Jekyll's docs.
All said, this took only a few hours and I don't have to pay for a server
anymore.  My verdict: Jekyll's pretty cool.

I'll throw the code up on a public repository within the coming days in case
someone wants inspiration.

