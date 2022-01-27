import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Document from "../../models/Document";
import { Fragment, useState } from "react";

const DocumentRow: React.FC<{
  document: Document;
  isBulkSelect: boolean;
  onSelect: () => void;
  onSign: () => void;
}> = (props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const openDialogHandler = () => {
    setDialogOpen(true);
  };
  const closeDialogHandler = () => {
    setDialogOpen(false);
  };
  const signingConfirmationHandler = () => {
    setDialogOpen(false)
    props.onSign()
  } 

  let actionsContent = !props.document.isSigned ? (
    <IconButton onClick={openDialogHandler}>
      <EditIcon />
    </IconButton>
  ) : (
    ""
  );
  if (props.isBulkSelect) {
    actionsContent = (
      <Checkbox checked={props.document.selected} onChange={props.onSelect} />
    );
  }

  return (
    <Fragment>
      <Dialog open={dialogOpen} onClose={closeDialogHandler}>
        <DialogTitle>Opravdu Chcete Podepsat Dokument?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.document.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler}>Zrušit</Button>
          <Button onClick={signingConfirmationHandler}>Potvrdit</Button>
        </DialogActions>
      </Dialog>
      <TableRow>
        <TableCell>{props.document.title}</TableCell>
        <TableCell align="right">{props.document.version}</TableCell>
        <TableCell align="left">{props.document.size}MB</TableCell>
        <TableCell align="right">{actionsContent}</TableCell>
      </TableRow>
    </Fragment>
  );
};

export default DocumentRow;
