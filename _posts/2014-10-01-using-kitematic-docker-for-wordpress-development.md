---
title: Using Kitematic/Docker for Wordpress Development
layout: post
categories: []
tags: []
---

![Kitematic](/public/img/kitematic.png)

[Kitematic](https://kitematic.com/) is an awesome new tool for interacting with [Docker](https://docker.com/), an awesome virtualization tool. I recently needed to do some [Wordpress](http://wordpress.org/) development, and rather than install a web server, mySQL, PHP, etc., I was able to generate and run a virtual server using Kitematic that set all this up for me.

Go ahead and download [Kitematic](https://kitematic.com), and go through the installation process.

Kitematic uses Dockerfiles to generate Docker containers, which are small virtual environments. Dockerfiles specify an operating system, as well as a series of commands to install the dependencies, languages, and other things necessary for the environment. 

If you haven't used Kitematic before, go ahead and make a `docker-images` directory somewhere on your computer.

~~~
mkdir ~/docker-images/ && cd ~/docker-images/
~~~

Searching Github will bring up a lot of wordpress-related Dockerfiles. I used [this one](https://github.com/eugeneware/docker-wordpress-nginx), as it handles everything for you. We can clone this in to the directory we just made.

~~~
git clone https://github.com/eugeneware/docker-wordpress-nginx
~~~

Back in Kitematic, click on the 'Images' button and then 'Create Image'. Click 'Select Folder' and then select the folder you just created. It will take a few minutes to install everything.

When the image is ready, click on the 'Apps' icon, and click 'Create App'. Name the app, and select the 'docker-wordpress-nginx' image. 

Once the app is ready, click the 'View App' icon and your new Wordpress install will open in your browser.

Happy Dockering!
