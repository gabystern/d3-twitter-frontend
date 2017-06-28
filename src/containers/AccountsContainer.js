import React, { Component } from 'react';
import ScatterPlotShow from '../components/ScatterPlotShow'
import StreamGraph from '../components/StreamGraph'
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'
import { Route, Switch } from 'react-router-dom'

class AccountsContainer extends Component {

  constructor(){
    super()
    this.state = {
      charts: [],
      tweets: [],
      searchTerm: ""
    }
    this.mapTweets = this.mapTweets.bind(this)
    this.filteredTweets = this.filteredTweets.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/tweets')
    .then(resp => resp.json())
    .then(tweets => { this.setState({ tweets }) })
    fetch('http://localhost:3000/api/v1/charts')
    .then(resp => resp.json())
    .then(charts => { this.setState({ charts })})
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
        < NavBar />
        <Switch>
          <Route exact path ='/home' render={() => < HomePage /> } />
          <Route exact path="/scatterplot" render={()=> < ScatterPlotShow tweets={this.state.tweets}/>} />
          <Route exact path="/streamgraph" render={()=> < StreamGraph tweets={this.state.tweets} />} />
        </Switch>
      </div>
    )
  }


}

export default AccountsContainer;
