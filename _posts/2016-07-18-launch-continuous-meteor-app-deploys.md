---
title: Launch -- Continuous Meteor App Deploys
layout: post
categories: []
tags: []
---

_Update 7/21/2016: I have changed the links for the sites out from Galaxy to Heroku. All the Galaxy information still applies, just using Heroku since it's free._

Last week, I gave a talk at [Crater Remote Conference](http://conf.crater.io/) about how we build, deploy, and distribute [Meteor](https://meteor.com) Cordova apps automatically. The video isn't available yet, but the slides are available [here](https://launch-presentation.surge.sh). And so you don't have to flip through all that, here is the gist of the presentation.

## tl;dr

What if I told you that you could build, deploy, and distribute an iOS app built with Meteor like this? [launch](https://github.com/newspring/meteor-launch) is here.

```
launch build myapp.com
launch galaxy myapp.com
launch testflight
```

![](http://i.giphy.com/8E1uPDT9gfhJK.gif)

## Back Story

We are currently developing an app for iOS and Android. We chose Meteor so that we could target both platforms using the same code base (thanks to the Meteor build tool and Cordova). The development experience has been pretty great, but we made the decision early on that we wanted to be able to ship 1 alpha build a week. This would allow us to show progress to our stakeholders, and get the app in the hands of our team often.

#### Current Build Process

![](/public/img/build-process.png)

Our current build process is pretty involved and tedious to do manually. It takes about 30 minutes if you have everything set up, have the process memorized, and are all around having a  good day. Once a week, 30 minutes isn't that hard to sacrifice. But on a bad day, this can take forever. It's also not very conducive to the idea that everyone on the team can deploy.

## There Is A Better Way

We developed a tool called [`launch`](https://github.com/newspring/meteor-launch) that automates this process for you! You can run it locally, or on a CI. This way, we could focus on writing code, and deploy based on pull requests or release tags.

#### :allthethings: `launch` Can Do

1. build iOS app
2. build Android app
3. deploy to [Galaxy](https://galaxy.meteor.com)
4. deploy to [Hockey](https://hockeyapp.net) (both iOS and Android)
5. deploy to iTunes Store/TestFlight
6. deploy to Google Play

## Getting Started

```bash
npm install -g meteor-launch
launch init # adds launch.json
vim launch.json # fill out the vars
```

That's all you have to do to add `launch` to your new or existing Meteor project. There is [documentation](http://newspring.github.io/meteor-launch/) on all the actions supported, and explanations on how to get the variables you will need.

## Examples

We have set up a couple examples of how to use `launch`, including how to run them on [Travis](https://travis-ci.org).

#### Launch Basic Example

This project is the boilerplate you get from a `meteor create`, and demonstrates how to build an Android app, deploy it to Galaxy, and upload the app to Hockey for distribution using these commands:

```bash
launch build https://launch-basic-example.meteorapp.com
launch galaxy https://launch-basic-example.meteorapp.com
launch hockey
```

- [Source Code](https://github.com/NewSpring/launch-basic-example)
- [Travis Config](https://github.com/NewSpring/launch-basic-example/blob/master/.travis.yml)
- [Travis Build](https://travis-ci.org/NewSpring/launch-basic-example/)
- [Live Site on Heroku](https://launch-basic-example.herokuapp.com/)
- [Hockey Download](https://rink.hockeyapp.net/apps/9c21ad20059c4486baf98fb9ef472a9c)

#### Launch Todos Example

We also have the Meteor Todos example, which demonstrates how to use all the `launch` actions:

```bash
launch build https://launch-todos-example.meteorapp.com
launch galaxy https://launch-todos-example.meteorapp.com
launch hockey # uploads iOS and Android
launch testflight
launch playstore
```

- [Source Code](https://github.com/NewSpring/launch-todos-example)
- [Travis Config](https://github.com/NewSpring/launch-todos-example/blob/master/.travis.yml)
- [Travis Build](https://travis-ci.org/NewSpring/launch-todos-example/)
- [Live Site on Heroku](https://launch-todos-example.herokuapp.com/)
- [Android Hockey Download](https://rink.hockeyapp.net/apps/a6221f3834f149599f8da90bd23fd147)
- [iOS Hockey Download](https://rink.hockeyapp.net/manage/apps/351335)

TestFlight and Google Play Store uploads you will have to take my word for, but try it out and see for yourself!

## How `launch` Helped Us

Our original goal was to ship 1 alpha build a week during development of our app. With `launch`: **we have been shipping multiple builds a day**. It's now easy for anyone on our team to ship a build to our alpha and beta environments just by creating a GitHub release tag. Our stakeholders are well informed about progress (and they are happy). Selfishly, I am super happy because building and deploying is the worst.

Shipping 2 builds a day manually would take over 5 hours a week. It takes a fraction of that time to set up `launch`, and then you never have to think about it again.

## Check It Out

- [launch on GitHub](https://github.com/newspring/meteor-launch)
- [launch on NPM](https://www.npmjs.com/package/meteor-launch)
- [docs site](http://newspring.github.io/meteor-launch/)

The presentation and the docs go in to a lot more detail about how to set everything up, and how to get running on a CI.

Let me know if you have any questions! I am happy to help out.
