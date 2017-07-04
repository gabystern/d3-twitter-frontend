import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, area } from 'd3-shape'
import { nest } from 'd3';


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
    this.createArea = this.createArea.bind(this)
    this.nest = this.nest.bind(this)
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

    let g = svg.append("svg:g");

    this.nest(x, y, svg)

  }

  nest(x, y, svg){
    let origNest = d3.nest()
      .key(function(d) { return d.sentiment })
      .entries(this.props.tweets)
    //array of negative scores
    let layer0 = origNest[0].values.map(function(d) {
      let parsedDate = new Date(Date.parse(d.tweet_created_at))
      return {key: d.sentiment, value: d.sentiment_score, date: parsedDate} })
    // let layer0x = origNest[0].values.map((d) => d.tweet_created_at)
    //array of neutral scores
    let layer1 = origNest[1].values.map(function(d) {
      let parsedDate = new Date(Date.parse(d.tweet_created_at))
      return {key: d.sentiment, value: d.sentiment_score, date: parsedDate} })
    //array of positive scores
    let layer2 = origNest[2].values.map(function(d) {
      let parsedDate = new Date(Date.parse(d.tweet_created_at))
      return {key: d.sentiment, value: d.sentiment_score, date: parsedDate} })

    let newData = layer0.concat(layer1).concat(layer2)
    console.log(newData)

    let nest = d3.nest()
      .key(function(d) { return d.key })
      .entries(newData)

    this.createArea(layer1, x, y, svg, newData, nest)
  }

  createArea(layer1, x, y, svg, newData, nest){
    let stack = d3.stack()
      .keys(function(d){ return d.key })
    debugger
    // let series = stack(newData)
    let area = d3.area()
      .x(function(d) {d.date})
      .y0(this.height)
      .y1(function(d) { return y(d.value); });

    let valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

    svg.append("path")
       .data([layer1])
       .attr("class", "area")
       .attr("d", area);

    svg.append("path")
      .data([layer1])
      .attr("class", "line")
      .attr("d", valueline);
  }



    // g.selectAll("areas")
    //   .data(this.props.tweets)
    //   .enter()
    //   .append("area")
    //   .classed("area", true)
    //   .attr("x", function(d){
    //     let epoch = Date.parse(d.tweet_created_at)
    //     let newDate = new Date(epoch)
    //     return x(newDate)-500
    //   })
    //   .attr("y1", function(d){ return y(d.sentiment_score)})
    //   .attr("y0", y(0))
        // .x(function(d) { return x(d.tweet_created_at) })
        // .y1(function(d) { return y(d.sentiment_score)  })
        // .y0(y(0));


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
