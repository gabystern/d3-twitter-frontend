import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { stack } from 'd3'
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
    console.log('hi')
    let stack = d3.stack()
      .offset("silhouette")
      .values(function(d) { return d.values })
      .x(function(d) { return d.date_created_at })
      .y(function(d) { return d.sentiment_score });

    let nest = d3.nest()
    .key(function(d) { return d.key; });

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
