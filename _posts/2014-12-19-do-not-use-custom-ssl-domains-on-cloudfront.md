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