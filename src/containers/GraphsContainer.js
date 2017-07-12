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
import { Grid, Segment } from 'semantic-ui-react'

const tweetsDevURL = 'https://localhost:3000/api/v1/tweets'
const tweetsProdURL = 'https://twending-api.herokuapp.com/api/v1/tweets'

class GraphsContainer extends Component {

  constructor(){
    super()
    this.state = {
      tweets: [],
      searchTerm: "",
      loader: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.removeGraph = this.removeGraph.bind(this)
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

  removeGraph(){
    if (this.state.tweets.length !== 0){
      let root = document.getElementById('root')
      let chart = document.getElementById('chart')
      chart.parentNode.removeChild(chart)
    }
  }

  handleClick(event) {

    this.startLoader()
    this.removeGraph()
    TweetsAdapter.fetchTweets(this.state.searchTerm)
    .then(tweets => this.setState({
            tweets: tweets,
            loader: false
    }))
    }

  handleClickDownload(){
    let element = document.getElementById('chart')
    saveSvgAsPng(element, "graph.png", {width: 1400});
  }


  render() {
    if (this.state.loader === true){
      return (
        <div>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => <div>< HomePage /></div> } />
            <Route exact path="/twitterplot" render={()=>
              <Grid container centered columns={1} className="graph-search">
                < SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />
                < ScatterPlot tweets={this.state.tweets} />
             </Grid>} />
            <Route exact path="/sentiment" render={()=>
              <Grid container centered columns={1} className="graph-search">
                < SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />
                < StreamGraph tweets={this.state.tweets} />
              </Grid>} />
          </Switch>
          < img className="loader" src="../assets/LoaderSmall.gif" />
        </div>
      )
    } else if (this.state.tweets.length === 0) {
      return (
        <div>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => <div>< HomePage /></div> } />
            <Route exact path="/twitterplot" render={()=>
              < Grid container centered columns={1} className="graph-search">
                < SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />
                < ScatterPlot tweets={this.state.tweets} />
              </Grid>} />
            <Route exact path="/sentiment" render={()=>
              <Grid container centered columns={1} className="graph-search">
                < SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />
                < StreamGraph tweets={this.state.tweets} />
                <Grid.Row centered columns={1}><Grid.Column>< StreamCalculations tweets={this.state.tweets}/></Grid.Column></Grid.Row>
              </Grid>} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div className='graph-top'>
          < NavBar />
          <Switch>
            <Route exact path ='/' render={() => < WelcomePage /> } />
            <Route exact path ='/home' render={() => <div>< HomePage /></div> } />
            <Route exact path="/twitterplot" render={()=>
              <Grid container centered columns={1} className="graph-search">
                < SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />
                < ScatterPlot tweets={this.state.tweets} />
                <Grid.Row centered columns={1}><Grid.Column>< Segment basic size='large' className="scatter-info">Hover over each bubble to check out the tweets.</Segment>< DownloadButton handleClick={this.handleClickDownload} /></Grid.Column></Grid.Row>
                </Grid>} />
            <Route exact path="/sentiment" render={()=>
              <Grid container centered columns={1} className="graph-search">
              <SearchBar searchTerm={this.state.searchTerm} handleClick={this.handleClick} handleChange={(event) => this.handleChange(event)} />
              < StreamGraph tweets={this.state.tweets} />
              <Grid.Row centered columns={1} className="calc-column"><Grid.Column>< StreamCalculations tweets={this.state.tweets}/>< DownloadButton handleClick={this.handleClickDownload} /> </Grid.Column></Grid.Row>
              </Grid>} />
          </Switch>
        </div>
      )
  }
}
}

export default GraphsContainer;
