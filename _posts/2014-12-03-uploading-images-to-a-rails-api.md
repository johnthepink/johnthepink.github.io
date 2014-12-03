---
title: Uploading Images To A Rails Api
layout: post
categories: []
tags: []
---

Receiving an uploaded image at an API endpoint is a bit different than just processing form data. With form data, gems like [Carrierwave](https://github.com/carrierwaveuploader/carrierwave/) or [Paperclip](https://github.com/thoughtbot/paperclip) abstract away the complexity of handling uploaded files. With an API, the client needs to be converting the image to [Base64](http://en.wikipedia.org/wiki/Base64) data, and then uploading the data for the API to decode.

First, if you aren't already, you need to process your JSON so that it plays nicely with [strong parameters](https://github.com/rails/strong_parameters). In this example I will assume you have a User model with a picture attribute.

~~~ruby
def user_params
	# get raw json
	json = JSON.parse(request.raw_post)
	params = ActionController::Parameters.new(json)

	# process through strong params
	params = params.require(:user).permit(:picture_data)
	
	# call method to decode picture data
	params[:picture] = decode_picture_data(params[:picture_data])
end
~~~

Next, we need to decode the picture data. I use Carrierwave, and this is what I needed to do to make it happy. However, if you use something else it shouldn't be that different.

~~~ruby
def decode_picture_data picture_data
	# decode the base64
	data = StringIO.new(Base64.decode64(picture_data))
	
	# assign some attributes for carrierwave processing
	data.class.class_eval { attr_accessor :original_filename, :content_type }
	data.original_filename = "upload.png"
	data.content_type = "image/png"
	
	# return decoded data
	data
end
~~~

The important step there was converting decoding the Base64 data. The other steps were useful in talking to Carrierwave. Now you should be able to save your User record without any issue.

~~~ruby
@user.update!(user_params)
~~~