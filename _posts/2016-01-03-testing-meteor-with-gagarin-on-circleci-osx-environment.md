---
title: Testing Meteor with Gagarin on Circleci Osx Environment
layout: post
categories: []
tags: []
---

[CircleCI](https://circleci.com/) has been rolling out a [new OSX environment](https://circleci.com/mobile/ios/) for use in the automated building, testing, and deploying of iOS apps. The team I work with is currently building a Meteor app that we are going to deploy to iOS, Android, and other places, and we have been using CircleCI for a while, so we were excited at the chance to automate iOS builds to staging and production.

We had been running [Gagarin](https://github.com/anticoders/gagarin) tests on the CircleCI Linux containers without issue, but when switching to the OSX containers there were a few gotchas. I didn’t find many others trying to do the same, so I thought I’d share.

## circle.yml

An example project with example tests is available [here](https://github.com/johnthepink/gagarin-circleci-osx), but here is the meat of it:

```yaml
machine:
  pre:
    - brew update; brew cleanup; brew cask cleanup
    - brew uninstall --force brew-cask; brew update
    - brew install brew-cask
    - brew install homebrew/versions/node010
    - curl https://install.meteor.com | sh
    - brew cask install google-chrome
    - brew install chromedriver

dependencies:
  pre:
    - npm install -g gagarin
    - chromedriver --port=9515:
       background: true

test:
  override:
    - gagarin -v -t 10000
```

## gotchas

You can stop reading now, but if you don’t then here is an explanation of the above yaml:

brew and brew-cask and pre-installed on the OSX containers, but brew always needs to be updated, and the version of brew-cask preinstalled is out of date. So, we update, clean, uninstall, and reinstall.

```
brew update; brew cleanup; brew cask cleanup 
brew uninstall --force brew-cask; brew update
brew install brew-cask
```

node is not pre-installed, so we install the version of node that Meteor likes, 0.10.41.

```
brew install homebrew/versions/node010
```

Install Meteor, obviously.

```
curl https://install.meteor.com | sh
```

Then, the one that stumped me for a while. chromedriver is pre-installed on the linux containers, but it’s not enough to just install chromedriver and run it. You actually need to install Google Chrome, as well (duh) (which is why we updated brew-cask).

```
brew cask install google-chrome
brew install chromedriver
```

Now you should be good to run your tests. Have fun!