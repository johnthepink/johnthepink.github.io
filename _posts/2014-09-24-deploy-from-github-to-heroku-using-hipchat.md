---
title: Deploy From Github To Heroku Using Hipchat/Hubot
layout: post
categories: []
tags: []
---

So you've got Hipchat running at your company, and you've heard of teams using it for deployment, but you don't want to spend money on some kind of continuous integration service. Here's a cheap way you can start using Hipchat to deploy your repositories to Heroku, or any other server.

## Set Up Hubot

First, if you don't have [Hubot](https://hubot.github.com/) up and running, follow [these install instructions](https://github.com/github/hubot/tree/master/docs) and then [deploy it to Heroku](https://github.com/github/hubot/blob/master/docs/deploying/heroku.md). Then come back. Don't worry, it's free.

## Set Up Auth Admin

Next, you will want to use Hubot's Auth feature to give yourself admin status. To do this, you will need to know your Hipchat user id. Run this in Hipchat:

~~~
@hubot show users
~~~

Your id should be to the left of your name. Next, add your id as the Auth admin by running this from the command line:

~~~
heroku config:set HUBOT_AUTH_ADMIN=<your user id>
~~~

Now, when you ask Hubot who the admin is, it should say you.

~~~
@hubot who has admin role
~~~

## Set Up Deploy Role

The next thing you should do is give whoever needs the ability to deploy from Hipchat the role 'deploy':

~~~
@hubot <your name> has deploy role
~~~

Now when you ask Hubot what your role is, it should respond with admin and deploy roles:

~~~
@hubot what role does <your name> have
~~~

## Set Environment Variables

The last thing we need to do before setting up our scripts is add some environment variables to Hubot's Heroku server so it can securely talk to Github and Heroku.

First, you need to generate a new RSA key pair by running this in your terminal. Name it `hubot_rsa`, or something like that.

~~~bash
ssh-keygen -t rsa
cat ~/.ssh/hubot_rsa.pub
~~~

Copy the output, and then add it to your [Github settings](https://github.com/settings/ssh) and [Heroku settings](https://dashboard-next.heroku.com/account).

Next, copy the private key you just created out of the terminal output:

~~~bash
cat ~/.ssh/hubot_rsa
~~~

Finally, we are going to add all this to Hubot's environment variables. Make sure to user double quotes on the private key to preserve line breaks.

~~~bash
heroku config:set APPNAME_GITHUB_URL=<insert git-based github remote (not https)>
heroku config:set APPNAME_PRODUCTION_URL=<insert git-based heroku remote>
heroku config:set SSH_PRIVATE_KEY="<insert private key>"
~~~


## Install Hubot Script

Finally, ready for scripts. Take this bad boy, create a file name `deploy.coffee` in Hubot's `scripts` directory, and paste it in.

~~~coffeescript
# Description:
#   Deploy is used to deploy from git repositories to servers.
#
# Commands:
#   hubot deploy <repo>
#
# Author:
#   johnthepink
 
util = require "util"
exec = require("child_process").exec
 
module.exports = (robot) ->
  robot.respond /deploy (.*)/i, (msg) ->
 
    # return unless deploy role
    unless robot.auth.hasRole(msg.envelope.user,'deploy')
      msg.send 'You do not have the deploy permissions. Contact the admin.'
      return
 
    repo = msg.match[1]
 
    # you can extend this if statement to deploy more than one app
    if repo == 'app'
      msg.send "Deploying #{repo}"
 
      child = exec "./deploy-app.sh", (err, stdout, stderr) ->
        msg.send err if err
        msg.send stderr if stderr
        msg.send stdout
    else
      msg.send 'I do not know him'
~~~

## Install Shell Script

Do the same for this script, but this time in Hubot's root directory, and name it `deploy-app.sh`.

~~~bash
#!/bin/sh
 
# Mostly stolen from https://github.com/vidpresso/hubot-syncer/blob/master/pullpushprod.sh
 
cd /app
 
echo "Setting up SSH."
mkdir /app/.ssh
echo "$SSH_PRIVATE_KEY" > .ssh/id_rsa
echo "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
echo "Host heroku.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
 
echo "Cloning repo."
git clone $APPNAME_GITHUB_URL
cd /app/appname
 
echo "Adding heroku url."
git remote add prod $APPNAME_PRODUCTION_URL
 
echo "Pushing to heroku."
git checkout master # makes sure there's a master branch to push.
git push prod master
 
echo "Cleaning up..."
rm -Rf /app/appname
rm -Rf /app/.ssh
 
exit 0
~~~

## Deploying!

Hubot is now ready to push the master branch of your Github repo to Heroku. Just call him out:

~~~
@hubot deploy app
~~~

The great part about this is you can extend the `deploy.coffee` file to handle multiple apps, and then create a shell script for each of them. If you don't use Heroku, you could easily modify `deploy-app.sh` to use `rsync`. You would just need to add your public key to the server and your good to go.