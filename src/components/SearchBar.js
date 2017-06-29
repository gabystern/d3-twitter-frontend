import React from 'react';

const SearchBar = (props) => {
  console.log(props)
  return(
    <div>
    <input
            type="text"
            value={props.searchTerm}
            onChange={props.handleChange}
            placeholder={"Enter a hashtag"}
          />
    <input type="button" onClick={props.handleClick} />
    </div>
  )
}

export default SearchBar;
