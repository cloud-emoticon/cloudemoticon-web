import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import formControlStyles from "../styles/formControl"
import Container from "@material-ui/core/Container";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoUrl: this.props.getRepoUrl()
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <FormGroup row={true}>
          <FormControl className={classes.formControl}>
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
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button variant="contained" color="primary" onClick={e => {
              e.preventDefault();
              this.props.setRepoUrl(this.state.repoUrl)
            }}>Confirm</Button>
          </FormControl>
        </FormGroup>
        <FormControl>
          <Button variant="contained" color="secondary" onClick={e => {
            e.preventDefault();
            window.close()
          }}>Exit</Button>
        </FormControl>
      </Container>
    )
  }
}

export default withStyles(formControlStyles)(Settings)
