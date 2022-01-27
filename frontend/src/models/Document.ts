export type DocumentMetaData = {
  id: number;
  title: string;
  version: number;
  size: number;
  isSigned: boolean;
};

type Document = DocumentMetaData & {
  selected: boolean;
};

export default Document;
