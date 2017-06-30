import React, { Component } from 'react';
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
    // this.tooltip = d3.select("body").append("div").attr("class", "toolTip");
    this.pageX = function (d,d3) {
      return d3.event.pageX;
    }
    this.pageY = function (d,d3){
      return d3.event.pageY;
    }
    this.x = d3.scaleTime()
        .domain([new Date(new Date().setHours(0,0,0,0)), new Date(new Date().setHours(48,0,0,0))])
        .range([0, 1000]);
    this.margin = {
      top: 60,
      bottom: 80,
      left: 80,
      right: 80
    };
    this.width = this.w - this.margin.left - this.margin.right;
    this.w = 600;
    this.h = 500;
    this.height = this.h - this.margin.top - this.margin.bottom;
    this.createSvg = this.createSvg.bind(this)
    this.parseTime = function dateFromString(str) {
      var m = str.match(/(\d+)-(\d+)-(\d+)[\sT]+(\d+):(\d+):(\d+)[.+](\d+)/)
      return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6] * 100);
    }
    this.tweetCount = d3.nest()
      .key(function(d){
        console.log(d.tweet_created_at);
        debugger
      })
      .rollup(function(v) { return v.length; })
      .entries(this.data)
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

    var y = scaleLinear()
      .domain([1, 300])
      .range([this.height, 0]);

    svg.append("text")
      .attr("x", this.width / 2 )
      .attr("y",  this.height + this.margin.top + 20)
      .style("text-anchor", "middle")
      .text("Date");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin.left)
      .attr("x",0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Tweets");

    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    svg.append("g")
      .call(d3.axisLeft(y));
  }

  plot = (svg) => {
    svg.selectAll(".point")
      .data(this.props.tweets)
      .enter()
        .append("circle")
        .style("fill", "red")
        .on("mouseover",function(d,i){
              d3.select(this)
                  .style("fill","orange")
                  .style("opacity", 0.8)
              // this.tooltip.style("display", "inline");
          })
        // .on("mousemove", function(d,i){
        //   this.tooltip
        //     .text("hello")
        //     .style("left", (this.pageX) + "px")
        //     .style("top", (this.pageY) + "px");
        // })
        .on("mouseout",function(d,i){
              d3.select(this)
                  .transition()
                  .duration(300)
                  .style("fill","red");
              // this.tooltip.style("display", "none");
        })
        .classed("point", true)

    //update
    svg.selectAll(".point")
      .attr("r", function(d){
        this.tweetCount()
      })
      .attr("cx", function(d){
        let cxDate = d.tweet_created_at
        let parseTime = function dateFromString(str) {
          var m = str.match(/(\d+)-(\d+)-(\d+)[\sT]+(\d+):(\d+):(\d+)[.+](\d+)/)
          return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]);
        }
        let testX = d3.scaleTime()
            .domain([new Date(new Date().setHours(0,0,0,0)), new Date(new Date().setHours(48,0,0,0))])
            .range([0, 1000]);
        let parsedDate = testX(parseTime(cxDate)) - 50;
        return parsedDate
      })
      .attr("cy", this.props.tweets.length/2);



    //exit()
    svg.selectAll(".point")
      .exit()
      .remove();

  }

  componentDidMount(){
    this.createSvg()
  }

  render(){
    console.log(this.props.tweets)
    console.log(d3.select(".display"))
    this.plot(d3.select(".display"))

    return (
      <svg>
      </svg>
    )
  }


}
