import React from 'react';

const ChartCard = (props) => {

  return(
    <div className="ui special cards">
      <div className="card">
        <div className="blurring dimmable image">
          <div className="ui inverted dimmer">
            <div className="content">
              <div className="center">
                <div className="ui primary button">Add Friend</div>
              </div>
            </div>
          </div><img src="http://www.brain-map.org/api/examples/examples/images/scatter.png"/></div>
        <div className="content">
          <a href="http://localhost:3001/scatterplot" className="header">Scatter Plot</a>
        </div>
      </div>
    </div>
  )
}

export default ChartCard
