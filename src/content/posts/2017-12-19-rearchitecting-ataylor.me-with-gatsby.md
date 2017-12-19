---
title: "Rearchitecting ataylor.me With Gatsby"
date: "2017-12-19"
path: "/rearchitecting-ataylor.me-with-gatsby/"
slug: rearchitecting-ataylor.me-with-gatsby
hero: gatsby-visual-studio-code-screenshot-12-2017.png
---

Back in May I took a stab at getting my blog going but it never got off the ground. It's never seemed like a priority but as I sit here on a rainy day it seems like a good time to dig in.

Like a lot of people I've been really liking [React](https://reactjs.org/). I thought of using [WordPress](https://wordpress.org/) as a back end via the [REST API](https://developer.wordpress.org/rest-api/) with React on the front end but really wanted to keep the speed an ease of my previous static setup. An entire CMS seemed like overkill for a place where I would be the only author and user.

So I've been on the hunt for a way to write in markdown, build the front end with React, serve the site statically and manage the entire thing on [GitHub](https://github.com/).

I pondered tweaking an existing static site generator to generate JSON, rather than HTML, so I could deploy both the back end and front end statically. I've had some experience with [Jekyll](https://jekyllrb.com/) but wanted to stick with writing JavaScript, not Ruby. Initially I found [Phenomic](https://phenomic.io/) but it was framework agnostic and seemed to be more of (a cool) side project than something serious. After a long search I found [Gatsby](https://www.gatsbyjs.org/). 

Gatsby is a modern website generator based on the React with great docs, solid example, an very active main developer and a good community.

It sounded like exactly what I was looking for, without any hacking. I downloaded Gatsby and was up and running with the starter theme quickly. I was able to write my own theme using React components and even learn some [GraphQL](http://graphql.org/) along the way. If you are looking for something similar give it a shot - I'm glad I did.