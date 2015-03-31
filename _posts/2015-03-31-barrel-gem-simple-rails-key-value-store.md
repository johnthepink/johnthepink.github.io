---
title: Barrel - Simple Key Value Store
layout: post
categories: []
tags: []
---

I made a really simple gem called [Barrel](https://github.com/johnthepink/barrel). You can use Barrel with Rails to store things. It will keep them and give them back later. Especially good for long running calculations.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'barrel'
```

And then execute:

    $ bundle
    $ rails generate barrel:install

## Usage

Barrel is so simple:

```ruby
Barrel.store 'Total Monkeys', '42'
Barrel.find 'Total Monkeys'
# => '42'
```

