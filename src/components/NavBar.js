import React from 'react';

const NavBar = (props) => {
  return(
    <div className="ui inverted menu">
      <div className="header item">
        <a href="http://localhost:3001/"> Home </a>
      </div>
      <a className="item right align" href="http://localhost:3001/home">
        Log In
      </a>
    </div>
  )
}

export default NavBar;
