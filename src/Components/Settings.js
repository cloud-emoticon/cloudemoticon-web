import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { red400 } from 'material-ui/styles/colors';
const style = {
  margin: 12,
};

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repoUrl: this.props.getRepoUrl()
        }
    }

    render() {
        return (
            <div>
                <TextField
                    defaultValue={this.state.repoUrl}
                    floatingLabelText="Repository URL"
                    style={style}
                    onChange={(event, newValue) => {
                        this.setState({
                            repoUrl: newValue
                        })
                    }}
                />
                <RaisedButton
                    onClick={() => {
                        this.props.setRepoUrl(this.state.repoUrl)
                    }}
                    label="Confirm"
                    primary={true}
                    style={style}
                />
                <br/>
                <RaisedButton
                    onClick={() => {
                        window.close()
                    }}
                    label="Exit"
                    labelColor="white"
                    backgroundColor={red400}
                    style={style}
                />
            </div>
        )
    }
}

export default Settings