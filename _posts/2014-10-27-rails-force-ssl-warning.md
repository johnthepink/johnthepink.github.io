---
title: Rails Force SSL Warning
layout: post
categories: []
tags: []
---

The [Rails](http://rubyonrails.org) `production.rb` config file contains this nice little option if you ever need to run your entire web app over SSL.

~~~ruby
Rails.application.configure do
	config.force_ssl = true
end
~~~

## Warning

It is important, however, to understand exactly what this does. It does **not** just redirect all your requests to HTTPS.  It also makes use of the [HTTP Strict Transport Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) policy (HSTS). This means your server will respond to every request with an included `Strict-Transport-Security max-age=31536000` header. Browsers read this as: 

> *Only use HTTPS for the next 31536000 seconds (1 year).*

You can browse and clear Chrome's HSTS cache by navigating to:

~~~
chrome://net-internals/#hsts
~~~

## Alternative

So, if you want to ever offer your service over vanilla HTTP again, it is important that you do **not** use `config.force_ssl`. Instead, use this [ActionController::ForceSSL](http://api.rubyonrails.org/classes/ActionController/ForceSSL/ClassMethods.html#method-i-force_ssl) method in your `application_controller.rb` file to redirect all your traffic to SSL without using HSTS.

~~~ruby
class ApplicationController < ActionController::Base
  force_ssl if: :ssl_configured?

  def ssl_configured?
    !Rails.env.development?
  end
end
~~~

Or, only redirect the specific actions that need to be processed over HTTPS using the same method.
