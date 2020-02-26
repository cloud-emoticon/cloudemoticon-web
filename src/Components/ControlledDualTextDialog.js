import React from "react"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button"

const ControlledDualTextDialog = props => {
  const {
    open,
    onClose,
    title,
    primaryLabel,
    secondaryLabel,
    onValidate,
    onConfirm,
    primaryText,
    onChangePrimaryText,
    secondaryText,
    onChangeSecondaryText,
    primaryError,
    onChangePrimaryError,
  } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={primaryLabel}
          fullWidth
          value={primaryText}
          onChange={e => {
            e.preventDefault();
            const newValue = e.target.value;
            onChangePrimaryText(newValue);
            onChangePrimaryError(false)
          }}
          error={primaryError}
          helperText={primaryError === false ? '' : primaryError}
        />
        <TextField
          margin="dense"
          label={secondaryLabel}
          fullWidth
          value={secondaryText}
          onChange={e => {
            e.preventDefault();
            const newValue = e.target.value;
            onChangeSecondaryText(newValue)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={e => {
          e.preventDefault();
          const error = onValidate(primaryText);
          if (error) {
            onChangePrimaryError(error)
          } else {
            onConfirm(primaryText, secondaryText);
            onChangePrimaryText('');
            onChangeSecondaryText('');
            onChangePrimaryError(false);
            onClose()
          }
        }}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
};

export default ControlledDualTextDialog
