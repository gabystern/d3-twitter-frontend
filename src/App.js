import React, { Component } from 'react';
import Graph from './components/graph'

class App extends Component {

  constructor(){
    super()
    this.state = {
      tweets: [],
      searchTerm: "travelban"
    }
    this.mapTweets = this.mapTweets.bind(this)
    this.filteredTweets = this.filteredTweets.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/tweets')
    .then(resp => resp.json())
    .then(tweets => { this.setState({ tweets }) })
  }

  filteredTweets(){
    let filteredTweets = this.state.tweets.filter(function(tweet) {
      let hashtags = JSON.parse(tweet.hashtags)
      let downcase = hashtags.map((hashtag) => hashtag.toLowerCase())
      downcase.includes(this.state.searchTerm.toLowerCase())
    })
    this.setState({ tweets: filteredTweets })
  }

  mapTweets(){
    this.state.tweets.map((tweet) => {
      <li>tweet.content</li>
    })
  }

  render() {
    return (
      <div>
        < Graph tweets={this.state.tweets}/>
      </div>
    )
  }
}

export default App;
