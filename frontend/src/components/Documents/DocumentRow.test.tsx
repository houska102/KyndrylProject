import { render, screen, fireEvent } from "@testing-library/react";
import DocumentRow from "./DocumentRow";

describe("DocumentRow component", () => {
  const onSelectMock = jest.fn();
  const onSignMock = jest.fn();
  const renderRow = (bulkSelect: boolean, isSigned: boolean) => {
    const mockDocument = {
      id: 1,
      title: "Document 1",
      size: 3.4,
      version: 3,
      isSigned: isSigned,
      selected: false,
    };
    render(
      <DocumentRow
        document={mockDocument}
        isBulkSelect={bulkSelect}
        onSelect={onSelectMock}
        onSign={onSignMock}
      />
    );
  };
  afterEach(() => {
    onSelectMock.mockClear();
    onSignMock.mockClear();
  });

  it("renders document title", () => {
    renderRow(false, false);
    expect(screen.getByText("Document 1")).toBeInTheDocument();
  });
  it("renders document version", () => {
    renderRow(false, false);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
  it("renders document size", () => {
    renderRow(false, false);
    expect(screen.getByText("3.4 MB")).toBeInTheDocument();
  });

  it("renders a sign document button when bulkSelect is false", () => {
    renderRow(false, false);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("does not render a sign document checkbox when bulkSelect is false", () => {
    renderRow(false, false);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
  it("renders a sign document checkbox when bulkSelect is true", () => {
    renderRow(true, false);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
  it("does not render a sign document button when bulkSelect is true", () => {
    renderRow(true, false);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not render a sign document button when isSigned is true", () => {
    renderRow(false, true);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("does not render a sign document checkbox when isSigned is true", () => {
    renderRow(false, true);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
  it("does not render a sign document checkbox when isSigned is true and bulk select is true", () => {
    renderRow(true, true);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
  it("renders a success icon when isSigned is true", () => {
    renderRow(true, true);
    expect(screen.getByTestId("TaskIcon")).toBeInTheDocument();
  });
  it("does not render a success icon when isSigned is false", () => {
    renderRow(false, false);
    expect(screen.queryByTestId("TaskIcon")).not.toBeInTheDocument();
  });
  it("does not render a success icon when isSigned is false and bulkSelect is true", () => {
    renderRow(true, false);
    expect(screen.queryByTestId("TaskIcon")).not.toBeInTheDocument();
  });

  it("runs the onSelect method when bulk select checkbox is clicked", () => {
    renderRow(true, false);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onSelectMock).toBeCalledTimes(1);
  });
});
