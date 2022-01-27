import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import Document from "../../models/Document";
import DocumentRow from "./DocumentRow";

const Documents = () => {
  const [bulkSelect, setBulkSelect] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: Math.random(),
      title: "Document 1",
      size: 100,
      version: 1.0,
      isSigned: false,
      selected: false,
    },
    {
      id: Math.random(),
      title: "Document 2",
      size: 186,
      version: 1.1,
      isSigned: false,
      selected: false,
    },
    {
      id: Math.random(),
      title: "Document 3",
      size: 46,
      version: 1.2,
      isSigned: false,
      selected: false,
    },
  ]);
  const toggleBulkSelect = () => {
    setBulkSelect(prev => !prev)
  }

  const documentSelectionHandler = (id: number) => {
    setDocuments((prevDocuments) => {
      return prevDocuments.map((document) => {
        if (document.id === id) {
          return {
            ...document,
            selected: !document.selected,
          };
        }
        return document;
      });
    });
  };
  const documentSignHandler = (id: number) => {
    setDocuments((prevDocuments) => {
      return prevDocuments.map((document) => {
        if (document.id === id) {
          return {
            ...document,
            isSigned: true,
          };
        }
        return document;
      });
    });
  };

  let TableButtons = <Button size="small" onClick={toggleBulkSelect}>Vybrat více</Button>
  if(bulkSelect) {
    const confirmButtonActive = !documents.reduce((acc, item) => acc || item.selected, false)
    TableButtons = (
      <Fragment>
        <IconButton onClick={toggleBulkSelect}><CloseIcon /></IconButton>
        <IconButton disabled={confirmButtonActive}><DoneIcon /></IconButton>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: 2 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={"lg"}>
        <Box mt={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              <TableBody>
                {documents.map((document) => {
                  return (
                    <DocumentRow
                      key={document.id}
                      document={document}
                      isBulkSelect={bulkSelect}
                      onSelect={documentSelectionHandler.bind(null, document.id)}
                      onSign={documentSignHandler.bind(null, document.id)}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Documents;
