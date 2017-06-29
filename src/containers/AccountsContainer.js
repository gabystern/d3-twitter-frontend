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
    this.handleChange = this.handleChange.bind(this)
    this.setSearch = this.setSearch.bind(this)
  }

  componentDidMount(){
    // fetch('http://localhost:3000/api/v1/tweets')
    // .then(resp => resp.json())
    // .then(tweets => { this.setState({ tweets }) })
    fetch('http://localhost:3000/api/v1/charts')
    .then(resp => resp.json())
    .then(charts => { this.setState({ charts })})
  }

  handleChange(event) {
    event.preventDefault() //check this

    let searchTerm = event.target.value
    this.setState({
      searchTerm
    }, this.setSearch(searchTerm))
  }

  setSearch(searchTerm){
    fetch('http://localhost:3000/api/v1/tweets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
          search_term: searchTerm
      })
    })
    .then(resp => resp.json() )
    .then(tweets => this.setState({
            tweets: tweets
          }))
    }
      // this.props.history.push("/");

  render() {
    return (
      <div>
        < NavBar />
        <Switch>
          <Route exact path ='/home' render={() => < HomePage /> } />
          <Route exact path="/scatterplot" render={()=> <div>< ScatterPlotShow tweets={this.state.tweets} /> < SearchBar searchTerm={this.state.searchTerm} handleChange={(event) => this.handleChange(event)} /></div>} />
          <Route exact path="/streamgraph" render={()=> < StreamGraph tweets={this.state.tweets} />} />
        </Switch>
      </div>
    )
  }


}

export default AccountsContainer;
