import React from 'react';

const NavBar = (props) => {
  return(
    <div className="ui inverted menu">
      <div className="header item">
        <a href="http://localhost:3001/"> Home </a>
      </div>
      <a className="item">
        About Us
      </a>
      <a className="item">
        Jobs
      </a>
      <a className="item">
        Locations
      </a>
    </div>
  )
}

export default NavBar;
