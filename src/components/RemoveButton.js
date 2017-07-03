import React from 'react';

const RemoveButton = (props) => {

  return(
    <button className="ui button" onClick={props.onClick}>
      Remove
    </button>
  )
}

export default RemoveButton;
