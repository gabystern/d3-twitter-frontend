import React from 'react';
import { Menu } from 'semantic-ui-react'

const NavBar = (props) => {
  return(
    <Menu inverted>
        <Menu.Item name='home' href="https://twending-client.herokuapp.com/" />
        <Menu.Item name='graphs' position='right' href="https://twending-client.herokuapp.com/home" />
    </Menu>
  )
}

export default NavBar;
