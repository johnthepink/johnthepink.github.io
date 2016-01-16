---
title: How To React Mixin Your ES6
layout: post
categories: []
tags: []
---

> ...or, how we made all our content related classes "likeable" with one file.

## Background

I am currently working on a [Meteor](https://meteor.com) app that uses [Webpack](https://webpack.github.io/) and [React](https://facebook.github.io/react/index.html). The app contains multiple feeds that contain multiple different types of content (articles, stories, videos, albums, etc.). In order to properly display the unique characteristics of each type of content, the app is currently making use of about 6 different React classes for displaying individual pieces of content.

However, each of these 6 classes are not completely unique. We make use of helper classes to try to reduce the amount of duplicate code. This has been great for the different aspects of displaying content, but is not as effective when classes need to share functionality. That's where [mixins](https://facebook.github.io/react/docs/reusable-components.html#mixins) come in.

## React Mixins with ES6 Classes

The original `React.createClass` syntax made including mixins very easy:

```javascript
const Article = React.createClass({
  mixins: [Likeable],
  // everything else
});
```

But, React is moving towards the [ES6 Class syntax](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) for creating classes:

```javascript
class Article extends React.Component {
  // everything else
}
```

Unfortunately, this newer syntax does not include a way for including mixins. So, we are using the [react-mixin](https://github.com/brigand/react-mixin) module, along with [ES7 decorators](https://github.com/brigand/react-mixin#but-its-at-the-end-of-the-file).

Now, including our mixin looks something like this:

```javascript
import { Component } from "react"
import ReactMixin from "react-mixin"
import { Likeable } from "app/client/mixins"

@ReactMixin.decorate(Likeable)
export default class Article extends Component {
  // everything else
}
```

The decorate function magically includes our mixin, and all of its functionality in to our Article class. We can do the same thing in all of our other content related classes.

## Likeable

Now, on to the functionality. I wanted the ability to make all of our different content classes "likeable" without the need to duplicate that code in all 6 classes, and now we have the setup for that. So, lets create our mixin:

```javascript
import { Likes } from "apollos/core/lib/collections"
import { nav as navActions, liked as likedActions } from "apollos/core/client/actions"

import Helpers from "app/client/helpers"

const Likeable = {

  componentWillMount: function() {
    this.likeableAction = this.onClickAction.bind(this)
  },

  onClickAction: function() {
    const entry = this.getEntry();

    this.updateRedux(entry);
    this.updateDatabase(entry);

    return {
      type: "FALSY",
      payload: {}
    }
  },

  getEntry: function() {
    const data = this.data;
    if (data.devotion) return data.devotion
    if (data.article) return data.article
    if (data.story) return data.story
    if (data.currentSermon) return data.currentSermon
    if (data.series) return data.series
    if (data.album) return data.album
  },

  updateRedux: function(entry) {
    this.props.dispatch(likedActions.toggle({
      entryId: entry.entryId
    }));
  },

  updateDatabase: function(entry) {
    // find existing like
    const foundLike = Likes.findOne({
      userId: Meteor.user()._id,
      entryId: entry.entryId
    });

    // update database
    if (foundLike) {
      Likes.remove(foundLike._id);
    } else {
      Likes.insert({
        userId: Meteor.user()._id,
        entryId: entry.entryId,
        title: entry.title,
        image: entry.channelName === "sermons" ?
          Helpers.backgrounds.image(this.data.series) :
          Helpers.backgrounds.image(entry),
        link: Helpers.content.links(entry),
        icon: Helpers.categories.icon(entry),
        category: Helpers.categories.name(entry),
        date: entry.meta.date,
        status: entry.status,
        dateLiked: new Date()
      });
    }
  }

}

export default Likeable
```

This looks a lot like a normal React Class, and can use many of the same lifecycle functions that a React Class can (`componentWillMount`, `componentWillUnmount`, etc). Lets walk through this.

First, we import anything we need for our mixin. In our case, we are including the Likes collection so that we can store it in the database. We are also including some [redux](http://redux.js.org/) actions so that we can update the state of the app. Finally, we include our Helpers to massage our content.

The `componentWillMount` function will be called just like a normal React Class, except that it is called prior to the class which is including this mixin. Here, we set our action to take upon the user "liking" something, and bind `this` so we can use it throughout our mixin. `this.likeableAction` is used in the parent class.

The `onClickAction` first handles getting our entry, in this case an article, but as you can see in `getEntry` this could be any number of different content types. Then, it updates our redux store to toggle the "likeness" of the content. Finally, it updates the database, either adding or removing the "Like", respectively.

## Conclusion

I was able to drop this mixin in to all 6 of our content related classes, and all of our content became "likeable". This is a huge win for maintainability, and adding future "likeable" content will be trivial and clean. I plan on refactoring some other parts of our app to use this same approach (infinite scrolling, sharing, etc).

Have you a mixin.