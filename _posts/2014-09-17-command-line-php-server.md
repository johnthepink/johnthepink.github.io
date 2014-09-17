---
title: Command Line PHP Server
layout: post
categories: []
tags: []
---

I spend a lot of time in [Rails](http://rubyonrails.org) and [Middleman](http://middlemanapp.com/) and other Ruby frameworks. But, every once in a while I need to do some Wordpress development, and switching between those two environments can be a pain if you're not careful.

My old way of dealing with this was to:

  1. Shut down Pow
  2. Start up Xamp
  3. Play around in my /private/etc/hosts file
  4. Flush my DNS
  5. etc.

That's just not ideal. Lucky enough, PHP 5.4.0 and higher include a built in command line server. This is perfect for me. All you have to do is run this from the directory you want to serve:

~~~
php -S localhost:8000
~~~

More info is available in the [PHP documenation](http://php.net/manual/en/features.commandline.webserver.php).



