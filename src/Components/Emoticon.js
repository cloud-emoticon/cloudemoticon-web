import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import {ListItem} from 'material-ui/List';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import NoFavoriteIcon from 'material-ui/svg-icons/action/favorite-border'

const Emoticon = (props) => {
  const data = props.data;
  const emoticon = data['emoticon']
  const description = data['description']
  const isInFavorite = props.isInFavorite(emoticon, description)
  return (
    <CopyToClipboard
      text={emoticon}
      onCopy={() => {
        props.snackbarOpen(`Copied ${emoticon}`)
      }}>
      <ListItem
        primaryText={emoticon}
        secondaryText={description}
        rightIcon={isInFavorite ?
          <FavoriteIcon
            onClick={e => {
              e.stopPropagation()
              props.removeFavorite(emoticon, description)
              props.snackbarOpen(`Removed ${emoticon} from favorites`)
            }}
          /> :
          <NoFavoriteIcon
            onClick={e => {
              e.stopPropagation()
              props.addFavorite(emoticon, description)
              props.snackbarOpen(`Added ${emoticon} to favorites`)
            }}
          />
        }
      />
    </CopyToClipboard>
  )
}

export default Emoticon
