---
title: Automated iMessages (or, How To Make Your Friends Really Mad)
layout: post
categories: []
tags: []
---

A while back, some of my friends and I decided it would be hilarious if we could repeatedly send iMessages to someone as a prank. So, I wrote an [Applescript](https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html). This little guy is dangerous. Please do not do anything malicious with it. I accept no responsiblity.

~~~applescript
set VICTIM to "999-999-9999"set MSG to "something"set APPLE_ID to "E:your@email.com"repeat while true	tell application "Messages"		send MSG to buddy VICTIM of service APPLE_ID		delay 1	end tellend repeat
~~~

I put the `delay 1` in there to prevent the iMessages from getting throttled and erroring out. The iMessage server will start rejecting them if they come too fast.

## Usage

1. Clone the repo and open `iMessage.scpt` in Script Editor.
2. Change `VICTIM` to the phone number of the person who is about to be mad.
3. Change `MSG` to the message you want to send that person.
4. Change `APPLE_ID` to the email (including the 'E:') of the Apple ID you want to send from.
5. Press the play button and then hide.

With great power comes great responsiblity. Now that you hold the key, don't make anyone mad.

With that said, here is the [repo](https://github.com/johnthepink/imessage-spam).