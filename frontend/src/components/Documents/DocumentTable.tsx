import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useContext, useState } from "react";
import { DocumentContext } from "../../store/document-context";
import DocumentRow from "./DocumentRow";
import DocumentsTableHead from "./DocumentsTableHead";

const signingUri = process.env.REACT_APP_DOCUMENT_SIGN_REDIRECT;

const DocumentsTable = () => {
  const documentContext = useContext(DocumentContext)
  const [bulkSelect, setBulkSelect] = useState<boolean>(false);

  const confirmBulkSignButtonActive = !documentContext.documents.reduce(
    (acc, item) => acc || item.selected,
    false
  );

  const toggleBulkSelectHandler = () => {
    setBulkSelect((prev) => !prev);
  };
  const requestBulkSignatureHandler = () => {
    setBulkSelect(false);
    documentContext.unselectAllDocuments();
    window.open(signingUri, "_blank");
  }
  const requestSignatureHandler = () => {
    window.open(signingUri, "_blank");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <DocumentsTableHead
          isBulkSelect={bulkSelect}
          confirmButtonActive={confirmBulkSignButtonActive}
          onBulkSelectToggle={toggleBulkSelectHandler}
          onBulkSignConfirm={requestBulkSignatureHandler}
        />
        <TableBody>
          {documentContext.documents.map((document) => (
            <DocumentRow
              key={document.id}
              document={document}
              isBulkSelect={bulkSelect}
              onSelect={documentContext.toggleDocumentSelection.bind(null, document.id)}
              onSign={requestSignatureHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentsTable;
