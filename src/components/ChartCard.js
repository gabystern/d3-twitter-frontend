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
          <a href="https://twending-client.herokuapp.com/scatterplot" className="header">{props.name}</a>
        </div>
      </div>
    </div>
  )
}

export default ChartCard
