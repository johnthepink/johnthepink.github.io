---
title: AWS S3 Copy File Size Limit
layout: post
categories: []
tags: []
---

Last year, I rolled together a custom video platform for [WorshipU][1] using [AWS][2]. It includes an admin for uploading videos to [S3][3], transcoding to multiple formats using [Elastic Transcoder][4], delivery using [Cloudfront][5], and [video.js][6] to play the videos in the browser.

The admin allows content managers to upload a bunch of videos at the same time to a designated upload folder in the S3 bucket, and then associate the videos with lessons at a later time. Upon association, the video is moved to a folder specific to the lesson, based on the lesson's id, quality, and encoding:

    310/720.webm
  
WorshipU is a Rails application, so naturally I used the official AWS ruby gem for accessing their API. To move the video from the uploads folder to its respective lesson folder, I used the `move_to` method for `S3Objects`. Behind the scenes, `move_to` performs a copy and then deletes the original.

```ruby
# get video from S3 uploads directory
video = bucket.objects[lesson.tmp_url]

# move the file to its new location
video.move_to("#{lesson.id}/original.mp4")
```

I've been really happy with this stack, and it worked great for about a year. Then recently, the content manager started uploading videos with much larger file sizes, and the background task that processes videos started failing. That's how I discovered that S3 has a 5gb file size limit on copying.

It looks like newer versions of the gem may address the file size limitations automatically. I couldn't find any information on it, but if you are using `aws-sdk-v1`, like me, then there is a sparsely documented way around this using the [copy_from method][7]. I could only find this [pull request][8] discussing it, but it allows you to do a multipart copy by passing respective parameter. It also request you to pass the length of the item as well.

```ruby
# get video from S3 uploads directory
video = bucket.objects[lesson.tmp_url]

# create temporary object in new location
copy = bucket.objects.create("#{lesson.id}/original.mp4", "tmp")

# multipart copy from the uploads directory
# to the new object
copy.copy_from(
  video, 
  content_length: video.content_length, 
  use_multipart_copy: true
)

# delete the file in the uploads directory
video.delete
```

This fixed the problem perfectly for me, although with a few more steps. It would have been nice if I could have just sent the multipart copy option to the `move_to` function.

[1]: https://worshipu.com
[2]: http://aws.amazon.com/
[3]: http://aws.amazon.com/s3/
[4]: http://aws.amazon.com/elastictranscoder/
[5]: http://aws.amazon.com/cloudfront/
[6]: https://github.com/videojs/video.js
[7]: http://docs.aws.amazon.com/AWSRubySDK/latest/AWS/S3/S3Object.html#copy_from-instance_method
[8]: https://github.com/aws/aws-sdk-ruby/pull/218