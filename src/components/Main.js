import React from 'react'
import AccountsContainer from '../containers/AccountsContainer'
import { Route } from 'react-router-dom'

export default function Main() {
  return (
    <div>
      <Route path="/" component={AccountsContainer} />
    </div>
  )
}
