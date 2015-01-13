---
title: Do Not Use Custom SSL Domains On Cloudfront
layout: post
categories: []
tags: []
---

I've been using Amazon S3 and Cloudfront to deliver assets for several Rails apps for a while. It's a really great way to offload work from your application server, and it delivers your images, css, js, etc., really fast using caches around the world. 

Basically, you send your assets out to S3, and set up Cloudfront to point at them. I've got this automated, and don't even think about it anymore. I will have to share that set up in a later post. But for now, on to the real issue.

Cloudfront supplies you with a subdomain -- somerandomstring.cloudfront.net -- and you can load all your files over https with it. It will even let you set up multiple subdomains pointing at your files so that your browser will download more items in parallel. So, I thought, wouldn't it be nice if I could set up subdomains of my own domain (assets1.mydomain.com, assets2.mydomain.com), point those at AWS, and deliver assets using Cloudfront that way. I figured there would be a nice way and affordable way to do this, as most AWS stuff is reasonably priced. So, I started the process of setting this up without even thinking about it.

>  "...we charge a fixed monthly fee of $600 for each custom SSL certificate you associate with your CloudFront distributions..." <br> <div style="text-align:right;">- [Amazon](http://aws.amazon.com/cloudfront/custom-ssl-domains/)</div>

And that was the end of that.

## Edit - 1.13.2015

[Robert](https://disqus.com/by/fnordfish/) pointed out in the comments that there is another option for using custom domains with SSL on Cloudfront using [SNI](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/SecureConnections.html#cnames-https-sni). This is much more affordable, since there is no extra cost. You just pay normal Cloudfront rates for HTTPS requests. However, the caveat is that some older browsers don't support SNI.

In the case of the project I was working on, the team didn't think it was wise to drop support for those older browsers. So, we just stuck with the standard Cloudfront domains. SNI is a great option if you are targeting modern browsers.
