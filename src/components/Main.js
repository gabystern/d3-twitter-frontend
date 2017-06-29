import React from 'react'
import AccountsContainer from '../containers/AccountsContainer'
import { Route } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <Route path="/" component={AccountsContainer} />
    </div>
  )
}

export default Main;
