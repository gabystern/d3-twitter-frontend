import React from 'react';
import { Button, Form } from 'semantic-ui-react'

const SearchBar = (props) => {
  return(
    <Form className="searchbar">
      <Form.Field>
        <input id="search" value={props.searchTerm} onChange={props.handleChange} placeholder='Enter a hashtag' />
      </Form.Field>
      <Button type='submit' floated='left' id="search" onClick={props.handleClick}>Submit</Button>
    </Form>
  )
}

export default SearchBar;
