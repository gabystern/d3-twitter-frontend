import React from 'react';

const NavBar = (props) => {
  return(
    <div>
      <div className="ui secondary pointing menu">
        <a href="http://localhost:3001/" className="active item">
          Home
        </a>
        <div className="right menu">
          <a className="ui item">
            Logout
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
