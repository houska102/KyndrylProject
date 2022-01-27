import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import Document, { DocumentMetaData } from "../../models/Document";
import DocumentRow from "./DocumentRow";
import DocumentsTableHead from "./DocumentsTableHead";
import createClient from "../../middleware/ws-client";
import { useCallback } from "react";

const signingUri = "http://localhost:4040/sign-document";

const Documents = () => {
  const [bulkSelect, setBulkSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  const toggleBulkSelectHandler = () => {
    setBulkSelect((prev) => !prev);
  };

  const initializeDocuments = useCallback((documents: DocumentMetaData[]) => {
    const transformedDocuments = documents.map((item) => {
      return {
        ...item,
        selected: false,
      };
    });
    setDocuments(transformedDocuments);
    setLoading(false);
  }, []);
  const documentSignHandler = useCallback((id: number) => {
    setDocuments((prevDocuments) => {
      return prevDocuments.map((document) => {
        console.log(document)
        if (document.id === id) {
          return {
            ...document,
            isSigned: true,
          };
        }
        return document;
      });
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    createClient(initializeDocuments, documentSignHandler)
  }, [initializeDocuments, documentSignHandler]);

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
  const requestSignatureHandler = () => {
    window.open(signingUri, "_blank");
  };

  const requestBulkSignatureHandler = () => {
    setBulkSelect(false);
    setDocuments((prevDocuments) => {
      return prevDocuments.map((document) => {
        if (document.selected) {
          return {
            ...document,
            selected: false,
          };
        }
        return document;
      });
    });
    window.open(signingUri, "_blank");
  };

  const confirmBulkSignButtonActive = !documents.reduce(
    (acc, item) => acc || item.selected,
    false
  );
  const allDocumentsSigned = !documents.reduce(
    (acc, item) => acc && item.isSigned,
    true
  );

  const documentsContent = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <DocumentsTableHead
          isBulkSelect={bulkSelect}
          confirmButtonActive={confirmBulkSignButtonActive}
          onBulkSelectToggle={toggleBulkSelectHandler}
          onBulkSignConfirm={requestBulkSignatureHandler}
        />
        <TableBody>
          {documents.map((document) => (
            <DocumentRow
              key={document.id}
              document={document}
              isBulkSelect={bulkSelect}
              onSelect={documentSelectionHandler.bind(null, document.id)}
              onSign={requestSignatureHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const content = allDocumentsSigned ? (
    documentsContent
  ) : (
    <Paper sx={{ padding: "10px", textAlign: "center" }}>
      Dokumentace byla úspěšně podepsána
    </Paper>
  )

  return (
    <Fragment>
      <Container maxWidth={"lg"}>
        <Box mt={1}>
          {loading && (
            <Paper sx={{ padding: "10px", textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Paper>
          )}
          {!loading && content}
        </Box>
      </Container>
    </Fragment>
  );
};

export default Documents;
