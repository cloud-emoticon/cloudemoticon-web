import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import formControlStyles from "../styles/formControl"

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

export default withStyles(formControlStyles)(Settings)
