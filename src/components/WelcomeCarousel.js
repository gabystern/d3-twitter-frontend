import React, { Component } from 'react';
import Slider from 'react-slick';


class WelcomeCarousel extends Component {
  render (){
    var settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 2500,
    }
    return (
      <Slider {...settings}>
        <div><img src="../assets/scatterplot_test.png"/></div>
        <div><img src="../assets/sentiment1.png"/></div>
        <div><img src="../assets/scatterplot2.png"/></div>
        <div><img src="../assets/sentiment2.png"/></div>
        <div><img src="../assets/scatterplot3.png"/></div>
      </Slider>
    );
  }
}

export default WelcomeCarousel;
