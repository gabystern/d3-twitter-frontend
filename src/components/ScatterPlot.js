import React, { Component } from 'react';
import * as d3 from 'd3';
import { nest, axisLeft, scale, scaleTime, style, event, select, scaleLinear, timeParse} from 'd3';
import { tip } from 'd3-tip'

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
    this.h = 400;
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
        .attr("align","center")
      .append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    let chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + 80 + "," + 60 + ")")
      .attr("xmlns", "http://www.w3.org/2000/svg");
  }

  plot = (svg, tweets) => {

    let parsedTimeArray = this.props.tweets.map(function(d){
      let epoch = Date.parse(d.tweet_created_at)
      let newDate = new Date(epoch)
      return newDate
    })
    let min = d3.min(parsedTimeArray)
    let max = d3.max(parsedTimeArray)

    let retweets = this.props.tweets.map(function(d){
      return d.retweet_count
    });

    let retweetColor = d3.nest()
      .key(function(d) { return d.retweet_count; })
      .entries(this.props.tweets);

    let y = d3.scaleLinear()
      .domain([-0.1, d3.max(retweets)+1])
      .range([this.height, 0]);

    let x = d3.scaleTime()
      .domain([min, max])
      .range([0, 1000]);

    svg.append("text")
      .attr("x", 640 / 2 )
      .attr("y",  this.height + this.margin.top + 20)
      .attr("dy", "1em")
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
      .classed("smallchart", true)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    let g = svg.append("svg:g");

    let div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: "2-digit" };

    g.selectAll("scatter-dots")
      .data(this.props.tweets)
      .enter()
        .append("circle")
        .classed("dot", true)
        .style("fill", function(d,i){
          if (d.retweet_count > 30){
            return 'FF76FE'
          } else if (d.retweet_count > 10) {
            return '1BCDEB'
          } else if (d.retweet_count >= 4) {
            return 'FFDC62'
          } else if (d.retweet_count < 4) {
            return '70FFF1'
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
          if (d.retweet_count > 400){
            return d.retweet_count*0.25
          } else if (d.retweet_count > 200){
            return d.retweet_count*0.5
          } else {
            return (d.retweet_count*2)
          }
        })
        .on("mouseover", function(d) {
         div.transition()
           .duration(200)
           .style("opacity", .9);
         div.html("<strong>"+d.username+"</strong>" + "<br/>" + new Date(d.tweet_created_at).toLocaleString('en-US', options) + "<br/>" + d.content)
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY) + "px");
         })
       .on("mouseout", function(d) {
         div.transition()
           .duration(500)
           .style("opacity", 0);
         })

  }

  shouldComponentUpdate(nextProps){
    return this.props.tweets !== nextProps.tweets
  }

  componentDidMount(){
    this.createSvg()
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
    this.plot(d3.select(".display"), this.props.tweets)
  }


  render(){
    this.pendingRender()
        return (
          <div>
          </div>
        )
  }


}
