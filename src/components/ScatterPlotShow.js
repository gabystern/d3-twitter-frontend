import React from 'react';
import ScatterPlot from './ScatterPlot'
import SearchBar from './SearchBar'

const ScatterPlotShow = (props) => {

  return(
    <div>
      < SearchBar searchTerm={props.searchTerm} handleClick={props.handleClick} handleChange={props.handleChange} />
      < ScatterPlot tweets={props.tweets} />
    </div>
  )
}

export default ScatterPlotShow
