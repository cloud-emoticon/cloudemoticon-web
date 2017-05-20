import React from 'react'
import Emoticon from './Emoticon'

const Category = (props) => {
  const data = props.data;
  const emoticonItems = data['entries'].map((entry, i) => {
    return (
      <li key={i}>
        <Emoticon data={entry}/>
      </li>
    )
  })
  return (
    <div>
      <div>{data['name']}</div>
      <ul>{emoticonItems}</ul>
    </div>
  )
}

export default Category
