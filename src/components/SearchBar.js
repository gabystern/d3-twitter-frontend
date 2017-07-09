import React from 'react';

const SearchBar = (props) => {
  return(
    <div className="searchbar">
      <form className="ui form hashtag-search">
        <div className="six wide field center aligned">
          <input type="text" id="search" value={props.searchTerm} onChange={props.handleChange} placeholder="Enter a hashtag" />
        </div>
        <button className="ui left floated button" id="search" onClick={props.handleClick} type="button">Submit</button>
      </form>
    </div>
  )
}

export default SearchBar;
