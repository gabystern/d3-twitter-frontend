import React from 'react';

const NavBar = (props) => {
  return(
    <div className="ui inverted menu">
      <div className="header item">
        <a href="https://twending-client.herokuapp.com/"> Home </a>
      </div>
      <a className="item right align" href="https://twending-client.herokuapp.com/home">
        Log In
      </a>
    </div>
  )
}

export default NavBar;
