import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TaskIcon from "@mui/icons-material/Task";
import Document from "../../models/Document";
import ConfirmationDialog from "../UI/ConfirmationDialog";

const DocumentRow: React.FC<{
  document: Document;
  isBulkSelect: boolean;
  onSelect: () => void;
  onSign: () => void;
}> = (props) => {
  const signingConfirmationHandler = () => {
    props.onSign();
  };

  let actionsContent = !props.isBulkSelect ? (
    <ConfirmationDialog
      title="Opravdu Chcete Podepsat Dokument?"
      description={props.document.title}
      onConfirm={signingConfirmationHandler}
    >
      <IconButton>
        <EditIcon />
      </IconButton>
    </ConfirmationDialog>
  ) : (
    <Checkbox checked={props.document.selected} onChange={props.onSelect} />
  );
  if (props.document.isSigned) {
    actionsContent = <TaskIcon color="success" sx={{ marginRight: "4px", paddingTop: '5px', fontSize: "30px" }} />;
  }

  return (
    <TableRow>
      <TableCell>{props.document.title}</TableCell>
      <TableCell align="right">{props.document.version}</TableCell>
      <TableCell align="left">{props.document.size}MB</TableCell>
      <TableCell align="right">{actionsContent}</TableCell>
    </TableRow>
  );
};

export default DocumentRow;
