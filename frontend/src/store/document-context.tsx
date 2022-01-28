import React, { useCallback, useEffect, useState } from "react";
import createClient from "../middleware/ws-client";
import Document, { DocumentMetaData } from "../models/Document";

type contextType = {
  documents: Document[];
  loading: boolean;
  allDocumentsSigned: boolean,
  unselectAllDocuments: () => void;
  toggleDocumentSelection: (id: number) => void
};

export const DocumentContext = React.createContext<contextType>({
  documents: [],
  loading: false,
  allDocumentsSigned: false,
  unselectAllDocuments: () => {},
  toggleDocumentSelection: () => {}
});

const DocumentContextProvider: React.FC = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Document[]>([]);

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
        console.log(document);
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
    createClient(initializeDocuments, documentSignHandler);
  }, [initializeDocuments, documentSignHandler]);


  const toggleDocumentSelect = (id: number) => {
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
  const unselectAllDocuments = () => {
    setDocuments((prevDocuments) => {
      return prevDocuments.map((document) => {
        return { ...document, selected: false };
      });
    });
  };
  const allDocumentsSigned = documents.reduce(
    (acc, item) => acc && item.isSigned,
    true
  );

  const contextValue = {
    documents: documents,
    loading: loading,
    allDocumentsSigned: allDocumentsSigned,
    unselectAllDocuments: unselectAllDocuments,
    toggleDocumentSelection: toggleDocumentSelect
  }

  return (
    <DocumentContext.Provider value={contextValue}>
      {props.children}
    </DocumentContext.Provider>
  );
};

export default DocumentContextProvider;
