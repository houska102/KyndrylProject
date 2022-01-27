import {
  Backdrop,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { WebSocket } from "ws";
import Document from "../../models/Document";
import DocumentRow from "./DocumentRow";
import DocumentsTableHead from "./DocumentsTableHead";

async function connectToServer() {
  
  const ws = new WebSocket('ws://localhost:7071/ws', {
    
  });
  return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
          if(ws.readyState === 1) {
              clearInterval(timer)
              resolve(ws);
          }
      }, 10);
  });
}


const Documents = () => {
  const [bulkSelect, setBulkSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
  ]);

  useEffect(() => {
    //const ws = connectToServer();
  }, [])

  const toggleBulkSelectHandler = () => {
    setBulkSelect((prev) => !prev);
  };

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
  const documentBulkSignHandler = () => {
    setBulkSelect(false);
    setDocuments((prevDocuments) => {
      return prevDocuments.map((document) => {
        if (document.selected) {
          return {
            ...document,
            selected: false,
            isSigned: true,
          };
        }
        return document;
      });
    });
  };

  const confirmButtonActive = !documents.reduce(
    (acc, item) => acc || item.selected,
    false
  );

  return (
    <Fragment>
      <Backdrop sx={{ color: "#fff", zIndex: 2 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={"lg"}>
        <Box mt={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <DocumentsTableHead
                isBulkSelect={bulkSelect}
                confirmButtonActive={confirmButtonActive}
                onBulkSelectToggle={toggleBulkSelectHandler}
                onBulkSignConfirm={documentBulkSignHandler}
              />
              <TableBody>
                {documents.map((document) => (
                  <DocumentRow
                    key={document.id}
                    document={document}
                    isBulkSelect={bulkSelect}
                    onSelect={documentSelectionHandler.bind(null, document.id)}
                    onSign={documentSignHandler.bind(null, document.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Documents;
