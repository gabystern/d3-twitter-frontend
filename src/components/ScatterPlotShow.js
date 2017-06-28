import React from 'react';
import ScatterPlot from './ScatterPlot'
import SearchBar from './SearchBar'

const ScatterPlotShow = (props) => {

  return(
    <div>
      < SearchBar />
      < ScatterPlot tweets={props.tweets} />
    </div>
  )
}

export default ScatterPlotShow
