import React, { Component } from 'react';
import RemoveButton from './RemoveButton'
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { extent } from 'd3';
import { timeParse } from 'd3-time-format';
import { nest } from 'd3';
import { axisLeft } from 'd3';
import { scale } from 'd3';
import { scaleTime } from 'd3';
import { style } from 'd3-selection';
import { event } from 'd3'

export default class ScatterPlot extends Component {

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


  createSvg = () => {

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

    let retweets = this.props.tweets.map(function(d){
      return d.retweet_count
    })

    let retweetColor = d3.nest()
      .key(function(d) { return d.retweet_count; })
      .entries(this.props.tweets)

    let y = d3.scaleLinear()
      .domain([-0.1, d3.max(retweets)+1])
      .range([this.height, 0]);

    let x = d3.scaleTime()
      .domain([min, max])
      .range([0, 1000])

    let linearColorScale = d3.scaleLinear()
      .domain([0, retweetColor.length])
      .range(['red','green'])

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
      .text("Number of Retweets/Tweet");

    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    var g = svg.append("svg:g");

    g.selectAll("scatter-dots")
      .data(this.props.tweets)
      .enter()
        .append("circle")
        .classed("test", true)
        .style("fill", function(d,i){
          if (d.retweet_count > 30){
            return 'red'
          } else if (d.retweet_count > 10) {
            return 'darkturquoise'
          } else if (d.retweet_count >= 4) {
            return 'palegreen'
          } else if (d.retweet_count < 4) {
            return 'paleturquoise'
          }
        })
        .style("opacity", 0.8)
        .attr("cx", function(d){
            let epoch = Date.parse(d.tweet_created_at)
            let newDate = new Date(epoch)
            return x(newDate)
          })
        .attr("cy", function(d){
          return y(d.retweet_count)
        })
        .attr("r", function(d){
          return (d.retweet_count*2)
        });

    g.selectAll("scatter-dots")
      .exit()
      .remove()
    }


  componentDidMount(){
    this.createSvg()
  }

  pendingRender(){
    if (this.props.tweets.length === 0){
      console.log("pending")
    } else {
      this.plot(d3.select(".display"))
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if (nextProps.tweets[0] !== this.props.tweets){
  //     return true
  //   }
  // }

  // componentWillUpdate(nextProps, nextState){
  //   if (this.props.tweets.length > 0 && nextProps.tweets.length > 0){
  //     this.props.tweets = nextProps.tweets
  //   }
  // }

  // handleClick(){
  //   debugger
  // }


  render(){
    console.log(this.props.tweets)
    console.log(d3.select(".display"))
    this.pendingRender()

    return (
      <div>
        < RemoveButton onClick={this.props.handleRemoveClick} />
      </div>
    )
  }


}
