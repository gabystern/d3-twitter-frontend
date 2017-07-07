import React from 'react';
var Carousel = require('nuka-carousel');

const HomePage = (props) => {
  mixins: [Carousel.ControllerMixin]

  return (
    <div className="welcome">
    <div className="ui grid container">
      <Carousel>
            <img src="../assets/ScatterPlot1.png"/>
            <img src="../assets/ScatterPlot2.png"/>
            <img src="../assets/StreamGraph1.png"/>
            <img src="../assets/ScatterPlot3.png"/>
            <img src="../assets/StreamGraph2.png"/>
      </Carousel>
      <button className="ui button" id="welcome">
        Sign Up
      </button>
      </div>
    </div>
  )

}
export default HomePage
