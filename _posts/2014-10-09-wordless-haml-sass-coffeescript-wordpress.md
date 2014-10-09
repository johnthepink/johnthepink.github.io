---
title: Wordless HAML SASS and Coffeescript in your Wordpress
layout: post
categories: []
tags: []
---

[Wordpress](http://wordpress.org) can be a giant pain to develop for, especially if you come from a Ruby background. The framework feels outdated and clunky compared to [Rails](http://rubyonrails.org).  A lot of the reason it feels this way is the lack of integration with our favorite build tools, such as HAML, SASS, Coffeescript. If you love these tools, like I do, you should check out the [Wordless](https://github.com/welaika/wordless) plugin for Wordpress.

Wordless creates a Rails-style theme that organizes all of your assets and let's you use HAML, SASS, and Coffeescript. Then, when you're ready to deploy you can compile and compress your assets, and it converts everything to regular PHP/HTML files.

If you read my [previous post]() about using Docker for Wordpress development, I created a fork of [eugeneware's image](https://github.com/eugeneware/docker-wordpress-nginx) that you can use [here](https://github.com/johnthepink/docker-wordpress-nginx-wordless).

~~~
git clone https://github.com/johnthepink/docker-wordpress-nginx-wordless
~~~

  1. Open this image in Kitematic, create an app, and it will install all the depencies for you, (rvm, ruby, wordless, wordpress, nginx, mysql, etc)
  2. In your browser, navigate to your new wordpress install (Kitematic has a 'View App' icon)
  3. Fill out the info about your site
  4. Login to the admin
  5. Click on 'Appearance' and activate the wordless theme
  6. Click 'Plugins' and actived the wordless plugin
  7. Go to the root of your site and see wordless is working
  8. Develop your custom theme

Check out the [Wordless documentation](http://welaika.github.io/wordless/docs/0.3/index.html) for more info.

