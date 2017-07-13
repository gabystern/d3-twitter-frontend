import React from 'react';
import WelcomeCarousel from './WelcomeCarousel'
import { Header, Segment, Button, Grid } from 'semantic-ui-react'

const HomePage = (props) => {

  return (
    <body id="welcome-body">
      <Grid container columns={1}>
        <Grid.Column>
          <Grid.Row>< WelcomeCarousel /></Grid.Row>
          <Grid.Row>
            <Header size='huge' textAlign='center' id="welcome-header">Twending</Header>
            <Segment basic size='huge' textAlign='center' id='welcome-text'>Visualize the #pulse of the world</Segment>
            <Button href="https://twending-client.herokuapp.com/home">
              Get Started
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </body>
  )
}

export default HomePage
