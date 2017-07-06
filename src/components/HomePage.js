import React from 'react'
import { Route } from 'react-router-dom'

const HomePage = (props) => {

  return (
    <div className="ui centered very relaxed grid">
    <div className="row">
      <div className="sixteen wide column">
        <div className="content">
          Learn More
        </div>
      </div>
    </div>
    <div className="row">
      <div className="six wide column">
        <div className="ui sizer vertical segment">
          <div className="ui center aligned huge header">Scatter Plot</div>
          <p></p>
        </div>
      </div>
      <div className="ui vertical divider">OR</div>
      <div className="six wide column">
        <div className="ui sizer vertical segment">
          <div className="ui center aligned huge header">Sentiment Analyzer</div>
          <p></p>
        </div>
      </div>
    </div>
  </div>
  )

}

export default HomePage
