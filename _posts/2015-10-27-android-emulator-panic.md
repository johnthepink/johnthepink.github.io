---
title: Android Emulator Panic
layout: post
categories: []
tags: []
---

For the past couple weeks, I have been researching ways to automate the building and deploying of [Meteor](https://meteor.com) applications. I have a couple posts forthcoming about that, but what I want to talk about today is some trouble I had with the vanilla Android SDK install for Mac.

So....

After downloading [Android Studio](http://developer.android.com/sdk/index.html), and setting my `$ANDROID_HOME` path:

~~~bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
~~~

...and installing the Android 5.1.1 SDK (this is what Meteor uses):

![android](/public//img/android-sdk.png)

...I added the Android platform to my Meteor app:

~~~bash
meteor add-platform android
~~~

Finally, I tried firing up the Meteor application in the Android emulator:

~~~bash
meteor run android
~~~

ERRORRRORORORORORORORORR

~~~
PANIC: Missing emulator engine program for 'x86' CPUS.
~~~

![wut](http://i.giphy.com/l41lVk06uxbKQ9Fg4.gif)

It turns out, the Android SDK is looking for an emulator that does not exist after the install:

![emulators](/public/img/android-emulators.png)

It's looking for `emulator-x86` instead of `emulator64-x86`. Very interesting. So, I did the dumbest thing possible and copied it over:

~~~bash
cp ~/Library/Android/sdk/tools/emulator64-x86 ~/Library/Android/sdk/tools/emulator-x86
~~~

And that fixed it. Great. Anyone have any ideas what's going here?

