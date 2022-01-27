import {
  Button,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";

const DocumentsTableHead: React.FC<{
  isBulkSelect: boolean;
  confirmButtonActive: boolean;
  onBulkSelectToggle: () => void;
  onBulkSignConfirm: () => void;
}> = (props) => {
  let TableButtons = (
    <Button size="small" onClick={props.onBulkSelectToggle}>
      Vybrat více
    </Button>
  );
  if (props.isBulkSelect) {
    TableButtons = (
      <Fragment>
        <IconButton onClick={props.onBulkSelectToggle}>
          <CloseIcon />
        </IconButton>
        <IconButton
          disabled={props.confirmButtonActive}
          onClick={props.onBulkSignConfirm}
        >
          <DoneIcon />
        </IconButton>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <TableHead>
        <TableRow>
          <TableCell>Název</TableCell>
          <TableCell width={100} align="right">
            Verze
          </TableCell>
          <TableCell width={100} align="left">
            Velikost
          </TableCell>
          <TableCell width={100} align="right">
            {TableButtons}
          </TableCell>
        </TableRow>
      </TableHead>
    </Fragment>
  );
};

export default DocumentsTableHead;
