import React from 'react';
import WelcomeCarousel from './WelcomeCarousel'
import { Header, Segment, Button } from 'semantic-ui-react'

const HomePage = (props) => {

  return (
    <body id="welcome-body">
      < WelcomeCarousel />
      <Header size='huge' textAlign='center' id="welcome-header">Twending</Header>
      <Segment basic size='huge' textAlign='center' id='welcome-text'>Visualize the #pulse of the world</Segment>
      <Button href="https://twending-client.herokuapp.com/home">
        Get Started
      </Button>
    </body>
  )
}

export default HomePage
