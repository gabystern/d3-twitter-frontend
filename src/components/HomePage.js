import React from 'react'
import { Route } from 'react-router-dom'
import { Grid, Segment, Image, Header } from 'semantic-ui-react'

const HomePage = (props) => {

  return (
    <body id="home">
      <Grid centered columns={1} width={16}>
        <Grid.Row>
          <Grid.Column>
            <Header size='huge' textAlign='center' className="graphs-header">Create A Graph</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid centered columns={2} width={8} padded divided>
        <Grid.Row className="graph-cards">
          <div className="columns">
            <a href="https://twending-client.herokuapp.com/twitterplot"><Grid.Column className="graph-section">
              <Header size='large' textAlign='center'>TwitterPlot</Header>
              <Segment basic size='large'>
                See when people have tweeted about a certain event or topic as well as the most retweeted tweets.
              </Segment>
              <Image
                src='../assets/scatter.png'
                as='a' size='big'
                href='https://twending-client.herokuapp.com/twitterplot'
              />
            </Grid.Column></a>
            </div>
          <div className="columns">
            <a href="https://twending-client.herokuapp.com/sentiment"><Grid.Column className="graph-section">
              <Header size='large' textAlign='center'>Sentiment Analyzer</Header>
              <Segment basic size='large'>
                See how people are feeling about a topic or event by visualizing the sentiment analysis of tweets.
              </Segment>
              <Image
                src='../assets/sentiment1.png'
                as='a' size='big'
                href='https://twending-client.herokuapp.com/sentiment'
              />
            </Grid.Column></a>
          </div>
        </Grid.Row>
      </Grid>
    </body>
  )

}

export default HomePage
