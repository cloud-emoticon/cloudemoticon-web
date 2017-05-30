import React from 'react'
import Emoticon from './Emoticon'
import {List} from 'material-ui/List';

const Favorites = (props) => {
    const items = props.getFavorites().map((item, i) => {
        return (
            <Emoticon
                ket={i}
                emoticon={item['emoticon']}
                description={item['description']}
            />
        )
    })
    return <List>{items}</List>
}

export default Favorites