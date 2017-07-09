import React from 'react'
import { Route } from 'react-router-dom'

const HomePage = (props) => {

  return (
    <body id="home">
      <div className="ui centered very relaxed grid">
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui center aligned huge header">Create A Graph</div>
        </div>
      </div>
      <div className="row content">
        <div className="six wide column">
          <div className="ui sizer vertical segment">
            <div className="box">
            <div className="ui center aligned large header">Scatter Plot</div>
              <div className="ui basic segment">
                <p>See when people have tweeted about a certain event or topic as well as the most retweeted tweets.</p>
                <div className="ui fluid image">
                  <img className="image" src="../assets/ScatterPlot2.png"/>
                  <div className="middle">
                    <a href="https://twending-client.herokuapp.com/scatterplot" className="text">Create a Graph</a>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
        <div className="ui vertical divider"></div>
        <div className="six wide column">
          <div className="ui sizer vertical segment">
            <div className="ui center aligned large header">Sentiment Analyzer</div>
              <div className="ui basic segment">
                <p>See how people are feeling about a topic or event by visualizing the sentiment analysis of tweets.</p>
                <div className="ui fluid image">
                  <img className="image" src="../assets/StreamGraph1.png"/>
                  <div className="middle">
                    <a href="https://twending-client.herokuapp.com/streamgraph" className="text">Create a Graph</a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  )

}

export default HomePage
