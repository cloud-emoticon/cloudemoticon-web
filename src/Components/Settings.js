import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};

const Settings = (props) => {
    return (
        <div>
            <RaisedButton
                onClick={() => {
                    window.close()
                }}
                label="Exit"
                style={style}
            />
        </div>
    )
}

export default Settings