import { Fragment, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const ConfirmationDialog:React.FC<{title: string, description: string, onConfirm: () => void}> = (props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const openDialogHandler = () => {
    setDialogOpen(true);
  };
  const closeDialogHandler = () => {
    setDialogOpen(false);
  };
  const confirmDialogHandler = () => {
    props.onConfirm()
    setDialogOpen(false);
  }

  return (
    <Fragment>
      <span onClick={openDialogHandler}>{props.children}</span>
      <Dialog open={dialogOpen} onClose={closeDialogHandler}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler}>Zrušit</Button>
          <Button onClick={confirmDialogHandler}>Potvrdit</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ConfirmationDialog