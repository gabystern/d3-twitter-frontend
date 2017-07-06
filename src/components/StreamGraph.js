import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, area } from 'd3-shape'
import { color } from 'd3';
import { tip } from 'd3-tip'


export default class StreamGraph extends Component {

  constructor(props){
    super(props)
    this.data = this.props.tweets

    this.margin = {
      top: 60,
      bottom: 80,
      left: 80,
      right: 80
    };
    this.width = this.w - this.margin.left - this.margin.right;
    this.w = 800;
    this.h = 500;
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
      .append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    let chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + 80 + "," + 60 + ")");
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

    let z = d3.scaleOrdinal(d3.schemeCategory10);

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
    var color = d3.scaleLinear()
      .range(["#aad", "#556"]);

    var area = d3.area()
      .x(function(d) {return x(d.data.date) })
      .y1(function(d) { return y(d.data.totalVal); })
      .y0(y(0))
      .curve(d3.curveBasis);

// for mouseover functionality
    // let div = d3.select("body").append("div")
    //   .attr("class", "tooltip")
    //   .style("opacity", 0);

    g.selectAll("path")
       .data(series)
       .enter().append("path")
       .attr("d", area)

    g.selectAll(".layer")
     .data(layers)
     .enter().append("path")
     .attr("class", "layer")
     .attr("d", function(d) { return area(d.totalVal)})
     .style("fill", function(d, i) { return z(i) });

// working on colors
    //  var setColor = d3.scaleLinear()
    //   .range(["#51D0D7", "#31B5BB"]);
     //
    //  let paths = document.getElementsByClassName('layer')
    //  var colors = Object.keys(paths).forEach(function(key) {
    //     return paths[key].style.fill = setColor(Math.random())
    //  })
    //  debugger

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
      <div>
      </div>
    )
  }


}
