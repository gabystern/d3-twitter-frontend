import React from 'react'
import GraphsContainer from '../containers/GraphsContainer'
import { Route } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <Route path="/" component={GraphsContainer} />
    </div>
  )
}

export default Main;
