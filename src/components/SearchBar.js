import React from 'react';

const SearchBar = (props) => {
  return(
    <form className="ui form">
      <div className="six wide field center aligned">
        <input type="text" value={props.searchTerm} onChange={props.handleChange} placeholder="Enter a hashtag" />
      </div>
      <button className="ui button" onClick={props.handleClick} type="button">Submit</button>
    </form>
  )
}

export default SearchBar;
