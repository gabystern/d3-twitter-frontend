import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, area } from 'd3-shape'
import { color, ease } from 'd3';
import { tip } from 'd3-tip'


export default class StreamGraph extends Component {

  constructor(props){
    super(props)
    this.data = this.props.tweets

    this.margin = {
      top: 10,
      bottom: 80,
      left: 80,
      right: 80
    };
    this.width = this.w - this.margin.left - this.margin.right;
    this.w = 800;
    this.h = 400;
    this.height = this.h - this.margin.top - this.margin.bottom;
    this.createSvg = this.createSvg.bind(this)

    this.pendingRender = this.pendingRender.bind(this)
  }

  createSvg(){
    let svg = select("#root")
      .append("svg")
        .attr("id", "chart")
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("align","center")
      .append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    let chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + 80 + "," + 60 + ")")
  }

  plot = (svg) => {
    let parsedTimeArray = this.props.tweets.map(function(d){
      let epoch = Date.parse(d.tweet_created_at)
      let newDate = new Date(epoch)
      return newDate
    })
    let min = d3.min(parsedTimeArray)
    let max = d3.max(parsedTimeArray)

    let sentimentRange = this.props.tweets.map(function(d){
      return d.sentiment_score
    })

    let y = d3.scaleLinear()
      .domain([d3.min(sentimentRange), d3.max(sentimentRange)])
      .range([this.height, 0]);

    let x = d3.scaleTime()
      .domain([min, max])
      .range([0, 1000])

    svg.append("text")
      .attr("x", 640 / 2 )
      .attr("y",  this.height + this.margin.top + 20)
      .style("text-anchor", "middle")
      .text("Date");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin.left)
      .attr("x",0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Sentiment Score");

    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    let layers = this.props.tweets.map(function(tweet){
      if (tweet.sentiment === "positive"){
        let parsedDate = new Date(Date.parse(tweet.tweet_created_at))
        return {positive: tweet.sentiment_score, negative: 0, neutral: 0, date: parsedDate, totalVal: tweet.sentiment_score, sentiment: "positive"}
      } else if (tweet.sentiment === "negative"){
        let parsedDate = new Date(Date.parse(tweet.tweet_created_at))
        return {positive: 0, negative: tweet.sentiment_score, neutral: 0, date: parsedDate, totalVal: tweet.sentiment_score, sentiment: "negative"}
      } else {
        let parsedDate = new Date(Date.parse(tweet.tweet_created_at))
        return {positive: 0, negative: 0, neutral: tweet.sentiment_score, date: parsedDate, totalVal: tweet.sentiment_score, sentiment: "neutral"}
      }
    })

    let g = svg.append("svg:g");

    let stack = d3.stack().keys(["negative", "positive", "neutral"])
    var series = stack(layers)
    console.log(series)

    var ease = d3.easeCubic;

    var startData = this.props.tweets.map(function(data) {
        return 0;
    });

    var area = d3.area()
      .x(function(d) {return x(d.data.date) })
      .y1(function(d) { return y(d.data.totalVal); })
      .y0(y(0))
      .curve(d3.curveBasis)

    g.selectAll("path")
       .data(series)
       .enter().append("path")
       .attr("d", area)
       .classed("test", true)
       .style("fill", this.sentimentColorFill())

  }

  sentimentColorFill(){
    let counter = 0
    this.props.tweets.forEach((tweet) => {
      if (tweet.sentiment_score > 0.1 || tweet.sentiment_score < -0.1){
        counter+=tweet.sentiment_score
      }
    })
    let avg = counter/this.props.tweets.length
    if (avg > 0.1){
      return 'FF76FE'
    } else if (avg < -0.1){
      return 'F34C28'
    } else {
      return '1BCDEB'
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.tweets.length !== 0 && this.props.tweets !== prevProps.tweets) {
      let root = document.getElementById('root')
      let chart = document.getElementById('chart')
      chart.parentNode.removeChild(chart)
      this.createSvg()
      this.plot(d3.select(".display"), this.props.tweets)
    }
  }

  pendingRender(){
    if (this.props.tweets.length === 0){
      console.log("pending")
    } else {
      this.plot(d3.select(".display"))
    }
  }

  componentDidMount(){
    this.createSvg()
  }

  render(){
    this.pendingRender()
      return (
        <div></div>
      )
  }


}
