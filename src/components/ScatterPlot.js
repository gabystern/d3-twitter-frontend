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
  }

  render(){
    let data = this.props.tweets

    var w = 600;
    var h = 500;
    var margin = {
    	top: 60,
    	bottom: 80,
    	left: 80,
    	right: 80
    };
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%m/%d/%Y");

    var svg = select("#root")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var chart = svg.append("g")
  		.classed("display", true)
  		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d){
        let date = parseTime(d.tweet_created_at)
      return date
      }))
      .range([-2, width]);
    var y = scaleLinear()
      .domain([1, data.length])
      .range([height, 0]);

    svg.append("text")
      .attr("x", width / 2 )
      .attr("y",  height + margin.top + 20)
      .style("text-anchor", "middle")
      .text("Date");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Tweets");

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var tweetCount = d3.nest()
      .key(function(d) { return d.tweet_created_at; })
      .rollup(function(v) { return v.length; })
      .entries(data)

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    var pageX = function (d,d3) {
      return d3.event.pageX;
    }
    var pageY = function (d,d3){
      return d3.event.pageY;
    }

    function plot(params){
    	//enter()
    	this.selectAll(".point")
    		.data(params.data)
    		.enter()
    			.append("circle")
          .style("fill", "paleturquoise")
          .style("opacity",0.1)
          .on("mouseover",function(d,i){
                d3.select(this)
                    .style("fill","darkturquoise")
                    .style("opacity", 1)
                tooltip.style("display", "inline");
            })
          .on("mousemove", function(d,i){
            tooltip
              .text("hello")
              .style("left", (pageX) + "px")
              .style("top", (pageY) + "px");
          })
          .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(300)
                    .style("fill","paleturquoise");
                tooltip.style("display", "none");
          })
    			.classed("point", true)

    	//update
    	this.selectAll(".point")
    		.attr("r", function(d){
          for (var i=0; i<tweetCount.length; i++){
            if (d.tweet_created_at === tweetCount[i].key){
              return tweetCount[i].value
            }
          }
        })
    		.attr("cx", function(d){
          let date = d.tweet_created_at.substr(0,20)+ d.tweet_created_at.substr(26, 30)
    			let parsedDate = x(parseTime(date)) - 75;
          return parsedDate
    		})
    		.attr("cy", data.length/2);


    	//exit()
    	this.selectAll(".point")
    		.data(params.data)
    		.exit()
    		.remove();
    }

    plot.call(chart, {
    	data: data
    })

    return (
      <div>
      </div>
    )
  }


}
