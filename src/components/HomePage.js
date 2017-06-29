import React from 'react'
import ChartCard from './ChartCard'
import { Route } from 'react-router-dom'

const HomePage = (props) => {

  return (
    <div>
      <div className="ui two column doubling stackable grid container">
        <div className="column">
          < ChartCard Link to="/scatterplot" />
        </div>
        <div className="column">
        </div>
      </div>
    </div>
  )

}

export default HomePage
