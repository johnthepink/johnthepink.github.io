---
title: Blossom API Gem
layout: post
categories: []
tags: []
---

## tl;dr

I created the [blossom_api](https://github.com/johnthepink/blossom_api) gem for Blossom's API.

~~~ruby
gem 'blossom_api'
~~~

...then:

~~~
$ bundle
~~~

...and finally:

~~~ruby
my_project = BlossomApi::Project.new(
  organization_id: 'xxx',
  project_id: 'xxx',
  access_token: 'xxx'
)

my_project.create_card 'New feature', 'Description of the feature'
~~~

...more features to come.

## The rest

A team I work on has been testing out using [Blossom](https://www.blossom.io) for our project management over the past couple weeks. So far, I have really enjoyed how it both tailors to developers and looks good while doing it. I'd definitely recommend it.

Leading up to making this switch, our development team's structure had really be compromised. There was no central point of entry for the other departments to make requests, or ask for solutions. In order to try to clear up communication, keep everyone informed, and move effectively, it made sense to me that only developers should have Blossom accounts. This degree of separation is not meant to be mean, it's just not ideal for other departments to be muddling about in our project management software. Who better to make decisions about priority, assignment, and implementation than the people actually developing?

To help bridge the gap caused by this, I created a system for other staff to be able to submit requests to an "Inbox" project through a form on the staff portal. Then, I can go through and assign requests in Blossom appropriately. The ability to create cards is available in the gem.

I also created a calendar interface to the Blossom API so that other staff can see what we are working on, our project completion of tasks, etc. I haven't extracted that in to the gem yet, but I plan on doing a lot more with it.