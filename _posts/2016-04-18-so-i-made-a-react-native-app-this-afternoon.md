---
title: So I Made A React Native App This Afternoon
layout: post
categories: []
tags: []
---

Well... it was an afternoon recently. But, you get the idea.

![](/public/img/bitminter.png)

I have built apps using Objective C, and I have been building a Cordova-based app using React and Meteor. So, I have at least an idea of what's going on in both situations. I have always dreaded jumping in to Objective C, and I have always been let down by the _feeling_ of a Web View app. Which is why React Native has been on my radar for a bit.

## React Native promises a lot

1. Write javascript
2. Generate native code in iOS and Android
3. Share code between the two

I am always skeptical of frameworks that promise you can live the dream. They always seem to fall short, or are buggy, or etc. This is probably why I waited so long to try out React Native, but I kept hearing so much about it.

## The App

I wanted to create a simple app that checks the status of my bitcoin miner on my mining pool, Bitminter. Here is the basic flow:

1. Take a Bitminter API key
2. Make a request to the Bitminter API
3. Display the data received

## It's Awesome

I've been using React a lot, so when I generated a React Native project, it just felt right. Here are some snippets.

I was able to utilize React's state for storing the API key and the returned data. 

```javascript
class BitminterNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      api_key: null,
      input_value: null,
    };
  }
}
```

React's lifecycle functions (componentDidMount) allowed me to easily initiate the request to the API.

```javascript
componentDidMount() {
  this.loadFromStorage()
    .then(() => {
      if (this.state.api_key) {
        this.fetchData();
      }})
      .done();
}
```

`fetch` is available so the request was easy.

```javascript
getDataOptions = () => {
  return {
    headers: {
      'User-Agent': 'app',
      'Authorization': `key=${this.state.api_key}`,
    },
    timeout: 5000
  };
}

fetchData = () => {
  this.setState({
    user: null
  });

  fetch(REQUEST_URL, this.getDataOptions())
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        user: responseData
      })
    })
    .catch((error) => {
      console.log("Error in fetch");
    })
    .done();
}
```

There is a polyfill for CSS flexbox properties, so styling was super easy.

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002b36',
  },
});

render() {
  <View style={styles.container}>
    // etc
  </View>
}
```

## Native Mappings

React Native has a bunch of mappings to native functionality out of the box (camera, photos, storage, etc). There is also a really great ecosystem of [React Native packages](https://js.coach/react-native).

I wanted to be able to store the Bitminter API locally so you don't have to put it in every time (very tedious). React Native handles this out of the box with `AsyncStorage`. This lets you read and write to native storage writing only javascript. I just defined methods that attempted to load the key from storage. If it does load, it updates the React state. If it doesn't load, it presents an input which takes the key and then writes it to storage on submit.

```javascript
async loadFromStorage() {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      this.setState({
        api_key: value
      });
    }
  } catch (error) {
    console.log(`AsyncStorage error: ${error.mesage}`);
  }
}

async writeToStorage() {
  this.setState({
    api_key: this.state.input_value
  });
  this.fetchData();
  try {
    await AsyncStorage.setItem(STORAGE_KEY, this.state.input_value);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
}
```

## That's It

The full code is available [here](https://github.com/johnthepink/BitminterNative). 

And, the app is available in the [App Store](https://itunes.apple.com/us/app/bitminter/id1100517333?ls=1&mt=8).

It really only took me two hours to make this. It's not that complicated, and that is thankfully reflected in how simple it was to make.

![](/public/img/bitminter-demo.gif)


