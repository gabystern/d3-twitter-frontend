import React from 'react';
import { Button } from 'semantic-ui-react'

const DownloadButton = (props) => (
  <Button floated='right' id="download"onClick={props.handleClick} >
    Download as PNG
  </Button>
)

export default DownloadButton;
