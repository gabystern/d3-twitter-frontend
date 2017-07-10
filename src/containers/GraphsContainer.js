import React, { Component } from 'react';
import {TweetsAdapter} from '../adapters'
import WelcomePage from '../components/WelcomePage'
import ScatterPlot from '../components/ScatterPlot'
import StreamGraph from '../components/StreamGraph'
import SearchBar from '../components/SearchBar'
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'
import DownloadButton from '../components/DownloadButton'
import StreamCalculations from '../components/StreamCalculations'
import { Route, Switch } from 'react-router-dom'
import { saveSvgAsPng } from 'save-svg-as-png'

const tweetsDevURL = 'https://localhost:3000/api/v1/tweets'
const tweetsProdURL = 'https://twending-api.herokuapp.com/api/v1/tweets'

const chartsDevURL = 'https://localhost:3000/api/v1/charts'
const chartsProdURL = 'https://twending-api.herokuapp.com/api/v1/charts'

class GraphsContainer extends Component {

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

    TweetsAdapter.fetchTweets(this.state.searchTerm)
    .then(tweets => this.setState({
            tweets: tweets,
            loader: false
          }))
    }

  handleClickDownload(){
    let element = document.getElementById('chart')
    saveSvgAsPng(element, "graph.png", {width: 1430});
  }


  render() {
    if (this.state.loader === true){
      return (
        <div>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => <div>< HomePage /></div> } />
            <Route exact path="/twitterplot" render={()=> <div className="graph-header">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} /> < ScatterPlot tweets={this.state.tweets} loader={this.state.loader}/> </div>} />
            <Route exact path="/sentiment" render={()=> <div className="graph-header">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />< StreamGraph tweets={this.state.tweets} />  </div>} />
          </Switch>
          <img className="loader" src="../assets/LoaderSmall.gif" />
        </div>
      )
    } else if (this.state.tweets.length === 0) {
      return (
        <div>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => <div>< HomePage /></div> } />
            <Route exact path="/twitterplot" render={()=> <div className="graph-header">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} /> < ScatterPlot tweets={this.state.tweets} loader={this.state.loader}/> </div>} />
            <Route exact path="/sentiment" render={()=> <div className="graph-header">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />< StreamGraph tweets={this.state.tweets} /> < StreamCalculations tweets={this.state.tweets} /> </div>} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => <div>< HomePage /></div> } />
            <Route exact path="/twitterplot" render={()=> <div className="graph-header">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} /> < ScatterPlot tweets={this.state.tweets} loader={this.state.loader}/><br/>< DownloadButton handleClick={this.handleClickDownload} /> </div>} />
            <Route exact path="/sentiment" render={()=> <div className="graph-header">< SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />< StreamGraph tweets={this.state.tweets} /> < StreamCalculations tweets={this.state.tweets} /><br/> < DownloadButton handleClick={this.handleClickDownload} /> </div>} />
          </Switch>
        </div>
      )
  }
}
}

export default GraphsContainer;
