import React from 'react';
import ScatterPlot from './ScatterPlot'

const ScatterPlotShow = (props) => {

  return(
    <div>
      < ScatterPlot tweets={props.tweets} />
    </div>
  )
}

export default ScatterPlotShow
