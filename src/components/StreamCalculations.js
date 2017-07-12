import React, { Component } from 'react';
import { Segment, Statistic, Grid, Divider } from 'semantic-ui-react'
import * as d3 from 'd3';

export default class StreamCalculations extends Component {

    constructor(props){
      super(props)
    }

  render(){
    let counter = 0
    this.props.tweets.forEach((tweet) => {
      if (tweet.sentiment_score > 0.1 || tweet.sentiment_score < -0.1){
        counter+=tweet.sentiment_score
      }
    })
    let avg = counter/this.props.tweets.length
    let truncated = Math.floor(avg * 100) / 100
    let sentiment = ""
    if (avg > 0.1){
      sentiment = "POSITIVE"
    } else if (avg < -0.1){
      sentiment = "NEGATIVE"
    } else {
      sentiment = "NEUTRAL"
    }

    let maxContent = ''
    let minContent = ''
    if (this.props.tweets.length > 0){
      let sentiments = this.props.tweets.map((tweet) => {return tweet.sentiment_score})
      let max = sentiments.reduce(function(a, b) {
        return Math.max(a, b);
      });
      let min = sentiments.reduce(function(a, b) {
        return Math.min(a, b);
      });

      function findMaxTweet(tweet){
        return tweet.sentiment_score === max
      }

      function findMinTweet(tweet){
        return tweet.sentiment_score === min
      }

      let maxTweet = this.props.tweets.find(findMaxTweet)
      let minTweet = this.props.tweets.find(findMinTweet)
      maxContent = maxTweet.content
      minContent = minTweet.content

    }

    {if (this.props.tweets.length > 0){
      return (
          <Grid.Row>
            <Segment.Group horizontal>
              <Segment size="tiny" className="avg-sentiment-segment">
                <p className="avg-sentiment"><strong>{sentiment}</strong><br></br>Average Sentiment</p>
              </Segment>
              <Segment size="tiny">
                <p><strong>{truncated}</strong><br></br>Average Sentiment Rating</p>
              </Segment>
              <Segment size="tiny">
                <p><strong>Most Positive Tweet:</strong><br></br>{maxContent}</p>
              </Segment>
              <Segment size="tiny">
                <p><strong>Most Negative Tweet:</strong><br></br>{minContent} </p>
              </Segment>
            </Segment.Group>
          </Grid.Row>
      )
    } else {
      return(<div></div>)
    }}
  }

}
