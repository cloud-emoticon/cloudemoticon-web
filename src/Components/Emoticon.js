import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

const Emoticon = (props) => {
  const data = props.data;
  const emoticon = data['emoticon']
  return (
    <CopyToClipboard
      text={emoticon}
      onCopy={() => {console.log(`Copied ${emoticon}`)}}>
      <div>
        <div>{data['emoticon']}</div>
        <div>{data['description']}</div>
      </div>
    </CopyToClipboard>
  )
}

export default Emoticon
