import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import {ListItem} from 'material-ui/List';

const Emoticon = (props) => {
  const data = props.data;
  const emoticon = data['emoticon']
  const description = data['description']
  return (
    <CopyToClipboard text={emoticon}>
      <ListItem
        primaryText={emoticon}
        secondaryText={description}
      />
    </CopyToClipboard>
  )
}

export default Emoticon
