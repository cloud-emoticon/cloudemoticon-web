import React from "react"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button"

class DualTextDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryText: '',
      secondaryText: '',
      primaryError: false,
    }
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={this.props.primaryLabel}
            fullWidth
            value={this.state.primaryText}
            onChange={e => {
              e.preventDefault();
              const newValue = e.target.value;
              this.setState({
                primaryText: newValue,
                primaryError: false,
              })
            }}
            error={this.state.primaryError}
            helperText={this.state.primaryError === false ? '' : this.state.primaryError}
          />
          <TextField
            margin="dense"
            label={this.props.secondaryLabel}
            fullWidth
            value={this.state.secondaryText}
            onChange={e => {
              e.preventDefault();
              const newValue = e.target.value;
              this.setState({
                secondaryText: newValue
              })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => {
            e.preventDefault();
            const primaryText = this.state.primaryText;
            const secondaryText = this.state.secondaryText;
            const error = this.props.onValidate(primaryText);
            if (error) {
              this.setState({
                primaryError: error,
              })
            } else {
              this.props.onConfirm(primaryText, secondaryText);
              this.setState({
                primaryText: '',
                secondaryText: '',
                primaryError: false,
              });
              this.props.onClose()
            }
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DualTextDialog
