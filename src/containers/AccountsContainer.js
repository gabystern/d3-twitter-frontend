import React, { Component } from 'react';
import WelcomePage from '../components/WelcomePage'
import ScatterPlot from '../components/ScatterPlot'
import StreamGraph from '../components/StreamGraph'
import SearchBar from '../components/SearchBar'
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'
import StreamCalculations from '../components/StreamCalculations'
import { Route, Switch } from 'react-router-dom'

const tweetsDevURL = 'https://localhost:3000/api/v1/tweets'
const tweetsProdURL = 'https://twending-api.herokuapp.com/api/v1/tweets'

const chartsDevURL = 'https://localhost:3000/api/v1/charts'
const chartsProdURL = 'https://twending-api.herokuapp.com/api/v1/charts'

class AccountsContainer extends Component {

  constructor(){
    super()
    this.state = {
      charts: [],
      tweets: [],
      searchTerm: "",
      loader: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    fetch(chartsProdURL)
    .then(resp => resp.json())
    .then(charts => { this.setState({ charts })})
  }

  handleChange(event){
    let searchTerm = event.target.value
    this.setState({
      searchTerm
    })
  }

  startLoader(){
    this.setState({
      loader: true
    })
  }

  handleClick() {
    this.startLoader()

    fetch(tweetsProdURL, {
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
            loader: false
          }))
  }


  render() {
    if (this.state.loader === true){
      return (
        <div id='nav-search'>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => < HomePage /> } />
            <Route exact path="/scatterplot" render={()=> <div className="test">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} /> < ScatterPlot tweets={this.state.tweets} loader={this.state.loader}/> </div>} />
            <Route exact path="/streamgraph" render={()=> <div className="test">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />< StreamGraph tweets={this.state.tweets} />  </div>} />
          </Switch>
            <img className="loader" src="../assets/Loader.gif" />
        </div>
      )
    } else {
      return (
        <div id="nav-search">
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => < HomePage /> } />
            <Route exact path="/scatterplot" render={()=> <div className="test">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} /> < ScatterPlot tweets={this.state.tweets} loader={this.state.loader}/> </div>} />
            <Route exact path="/streamgraph" render={()=> <div className="test">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />< StreamGraph tweets={this.state.tweets} /> < StreamCalculations tweets={this.state.tweets} /> </div>} />
          </Switch>
        </div>
      )
  }
}
}

export default AccountsContainer;
