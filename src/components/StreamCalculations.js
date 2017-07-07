import React, { Component } from 'react';

export default class StreamCalculations extends Component {

    constructor(props){
      super(props)
    }

  AvgSentiment(){
  }

  render(){
    let counter = 0
    this.props.tweets.forEach((tweet) => {
      if (tweet.sentiment_score > 0.1 || tweet.sentiment_score < -0.1){
        counter+=tweet.sentiment_score
      }
    })
    let avg = counter/this.props.tweets.length
    let sentiment = ""
    if (avg > 0.1){
      sentiment = "positive"
    } else if (avg < -0.1){
      sentiment = "negative"
    } else {
      sentiment = "neutral"
    }
    console.log(counter)
    console.log(avg)

    {if (this.props.tweets.length > 0){
      return (
        <div className="ui segment">
        <div className="ui statistic">
          <div className="value">
            {sentiment}
          </div>
          <div className="label">
            Average Sentiment
          </div>
          </div>
        </div>
      )
    } else {
      return(<div></div>)
    }}
  }

}
