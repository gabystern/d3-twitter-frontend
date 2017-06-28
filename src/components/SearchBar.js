import React from 'react';

const SearchBar = (props) => {
  return(
    <div>
      <div className="ui search">
        <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search a hashtag" />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    </div>
  )
}

export default SearchBar;
