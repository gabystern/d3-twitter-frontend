import React, { Component } from 'react';
import ScatterPlotShow from '../components/ScatterPlotShow'
import StreamGraph from '../components/StreamGraph'
import SearchBar from '../components/SearchBar'
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'
import { Route, Switch } from 'react-router-dom'

class AccountsContainer extends Component {

  constructor(){
    super()
    this.state = {
      charts: [],
      tweets: [],
      searchTerm: ""
    }
    this.forceUpdate = this.forceUpdate.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/charts')
    .then(resp => resp.json())
    .then(charts => { this.setState({ charts })})
  }

  handleChange(event){
    let searchTerm = event.target.value
    this.setState({
      searchTerm
    })
  }

  handleClick() {
    fetch('http://localhost:3000/api/v1/tweets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
          search_term: this.state.searchTerm
      })
    })
    .then(resp => resp.json() )
    .then(tweets => this.setState({
            tweets: tweets
          }))
  }

  handleRemoveClick(){
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        < NavBar />
        <Switch>
          <Route exact path ='/home' render={() => < HomePage /> } />
          <Route exact path="/scatterplot" render={()=> <div>< ScatterPlotShow tweets={this.state.tweets} searchTerm={this.state.searchTerm} handleClick={this.handleClick.bind(this)} handleChange={(event) => this.handleChange(event)} handleRemoveClick={this.handleRemoveClick.bind(this)}/> </div>} />
          <Route exact path="/streamgraph" render={()=> < StreamGraph tweets={this.state.tweets} />} />
        </Switch>
      </div>
    )
  }


}

export default AccountsContainer;
