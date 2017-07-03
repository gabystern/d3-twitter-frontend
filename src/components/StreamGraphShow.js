import React from 'react';
import StreamGraph from './StreamGraph'
import SearchBar from './SearchBar'

const ScatterPlotShow = (props) => {

  return(
    <div>
      < SearchBar searchTerm={props.searchTerm} handleClick={props.handleClick} handleChange={props.handleChange} />
      < StreamGraph tweets={props.tweets} />
    </div>
  )
}

export default ScatterPlotShow
