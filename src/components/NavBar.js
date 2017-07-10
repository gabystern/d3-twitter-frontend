import React from 'react';
import { Menu } from 'semantic-ui-react'

const NavBar = (props) => {
  return(
    <Menu inverted>
        <Menu.Item name='home' href="https://twending-client.herokuapp.com/home" />
        <Menu.Item position='right' name='login' href="https://twending-client.herokuapp.com/home" />
    </Menu>
  )
}

export default NavBar;
