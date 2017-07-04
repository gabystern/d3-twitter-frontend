import React, { Component } from 'react';
import ScatterPlot from '../components/ScatterPlot'
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
      searchTerm: "",
      loader: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
            tweets: tweets,
            loader: true
          }))
  }


  render() {
    return (
      <div>
        < NavBar />
        <Switch>
          <Route exact path ='/home' render={() => < HomePage /> } />
          <Route exact path="/scatterplot" render={()=> <div>< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} /> < ScatterPlot tweets={this.state.tweets} loader={this.state.loader}/> </div>} />
          <Route exact path="/streamgraph" render={()=> <div>< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />< StreamGraph tweets={this.state.tweets} /> </div>} />
        </Switch>
      </div>
    )
  }


}

export default AccountsContainer;
