---
title: Dark Slack
layout: post
categories: []
tags: []
---

![](/public/img/dark-slack.png)

Yes, I'm talking about a real dark theme for Slack on OSX. The only catch, you have to build it yourself. It's super easy!

Just go clone my repo [here](https://github.com/johnthepink/dark-slack), and follow the instructions in the README. Basically it's as easy as this:

```
npm install -g nativefier
nativefier https://[your-org].slack.com --inject darkslack.css --name "Dark Slack" --icon slack.icns
```

This generates an [Electron](http://electron.atom.io/) app that wraps the web version of Slack. Since we are wrapping the web version, you do lose the organization switcher on the left. But, you can still sign in to multiple organizations and switch between them with command-K.

Honestly, I'm kind of enjoying the noise reduction that comes with only having one organization open at a time. Oh, and also my eyes aren't bleeding.
