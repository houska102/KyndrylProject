import { FamilyRestroomTwoTone } from "@mui/icons-material";
import documentUtils from "./document-utils";

describe("documentUtils transformDocuments", () => {
  const mockDocuments = [
    {
      id: 1,
      title: "Document 1",
      size: 3.4,
      version: 3,
      isSigned: false,
    },
    {
      id: 2,
      title: "Document 1",
      size: 3.4,
      version: 3,
      isSigned: false,
    },
    {
      id: 3,
      title: "Document 1",
      size: 3.4,
      version: 3,
      isSigned: false,
    },
  ];

  it("adds selected parameter to all document objects in array", () => {
    const transformedDocuments =
      documentUtils.transformDocuments(mockDocuments);
    expect(transformedDocuments[0]).toHaveProperty("selected");
    expect(transformedDocuments[1]).toHaveProperty("selected");
    expect(transformedDocuments[2]).toHaveProperty("selected");
  });

  it("sets all selected properties to false", () => {
    const transformedDocuments =
      documentUtils.transformDocuments(mockDocuments);
    expect(transformedDocuments[0].selected).toBe(false);
    expect(transformedDocuments[1].selected).toBe(false);
    expect(transformedDocuments[2].selected).toBe(false);
  });
});
