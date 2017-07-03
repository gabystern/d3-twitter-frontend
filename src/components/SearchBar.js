import React from 'react';

const SearchBar = (props) => {
  return(
    <div>
    <input
            type="text"
            value={props.searchTerm}
            onChange={props.handleChange}
            placeholder={"Enter a hashtag"}
          />
    <input type="button" onClick={props.handleClick} className="button" />
    </div>
  )
}

export default SearchBar;
