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
      sentiment = "positive"
    } else if (avg < -0.1){
      sentiment = "negative"
    } else {
      sentiment = "neutral"
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
              <Segment>
                <Statistic size='tiny'>
                  <Statistic.Value text> {sentiment} </Statistic.Value>
                  <Statistic.Label>Average Sentiment</Statistic.Label>
                </Statistic>
                <Divider />
                <Statistic size='tiny'>
                  <Statistic.Value text> {truncated} </Statistic.Value>
                  <Statistic.Label>Average Sentiment Rating</Statistic.Label>
                </Statistic>
              </Segment>
              <Segment>
                <p className='sentiment-text'><strong>Most Positive Tweet:</strong><br></br>{maxContent}</p>
              </Segment>
              <Segment>
                <p className='sentiment-text'><strong>Most Negative Tweet:</strong><br></br>{minContent} </p>
              </Segment>
            </Segment.Group>
          </Grid.Row>
      )
    } else {
      return(<div></div>)
    }}
  }

}
