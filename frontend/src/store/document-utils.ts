import Document, { DocumentMetaData } from "../models/Document";

const documentUtils = {
  transformDocuments: (documents: DocumentMetaData[]): Document[] => {
    return documents.map((item) => {
      return {
        ...item,
        selected: false,
      };
    });
  },
};

export default documentUtils;
