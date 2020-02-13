import React, {Component} from 'react'
import Button from '@material-ui/core/Button';

class Settings extends Component {
  render() {
    return (
      <Button variant="contained" color="secondary" onClick={e => {
        e.preventDefault();
        window.close()
      }}>Exit</Button>
    )
  }
}

export default Settings
