import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoUrl: this.props.getRepoUrl()
    }
  }

  render() {
    return (
      <form>
        <TextField
          defaultValue={this.state.repoUrl}
          label="Repository URL"
          onChange={(e, newValue) => {
            e.preventDefault();
            this.setState({
              repoUrl: newValue
            })
          }}
        />
        <br/>
        <Button variant="contained" color="primary" onClick={e => {
          e.preventDefault();
          this.props.setRepoUrl(this.state.repoUrl)
        }}>Confirm</Button>
        <br/>
        <Button variant="contained" color="secondary" onClick={e => {
          e.preventDefault();
          window.close()
        }}>Exit</Button>
      </form>
    )
  }
}

export default Settings
