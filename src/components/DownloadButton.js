import React from 'react';

const DownloadButton = (props) => (
  <button className="ui right floated button" id="download" onClick={props.handleClick}>
    Download as PNG
  </button>
)

export default DownloadButton;
