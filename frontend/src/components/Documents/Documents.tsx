import {
  Alert,
  CircularProgress,
  Collapse,
  Container,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useContext } from "react";
import DocumentsTable from "./DocumentTable";
import { DocumentContext } from "../../store/document-context";

const Documents = () => {
  const documentContext = useContext(DocumentContext)

  return (
    <Fragment>
      <Container maxWidth={"lg"}>
        <Box mt={1}>
          {documentContext.loading && (
            <Paper sx={{ padding: "10px", textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Paper>
          )}
          {!documentContext.loading && (
            <Fragment>
              <Collapse in={documentContext.allDocumentsSigned}>
                <Alert severity="success">Dokumentace byla úspěšně podepsána</Alert>
              </Collapse>
              <DocumentsTable/>
            </Fragment>
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

export default Documents;
