import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog component", () => {
  const onConfirmMock = jest.fn();
  const dialogFadeOutDuration = 200;
  beforeEach(() => {
    render(
      <ConfirmationDialog
        title="Confirmation dialog"
        description="Action Description"
        onConfirm={onConfirmMock}
      >
        <button>Dialog Button</button>
      </ConfirmationDialog>
    );
  });
  afterEach(() => {
    onConfirmMock.mockClear();
  });

  it("initially renders the dialog button", () => {
    const dialogButton = screen.getByText("Dialog Button");
    expect(dialogButton).toBeInTheDocument();
  });
  it("initially does not render the dialog", () => {
    const dialogContainer = screen.queryByRole("dialog");
    expect(dialogContainer).not.toBeInTheDocument();
  });

  it("renders a dialog after the dialog button is clicked", () => {
    const dialogButton = screen.getByText("Dialog Button");
    fireEvent.click(dialogButton);
    const dialogContainer = screen.queryByRole("dialog");
    expect(dialogContainer).toBeInTheDocument();
  });
  it("displays a title when the dialog is visible", () => {
    fireEvent.click(screen.getByText("Dialog Button"));
    expect(screen.getByText("Confirmation dialog")).toBeInTheDocument();
  });
  it("displays a description when the dialog is visible", () => {
    fireEvent.click(screen.getByText("Dialog Button"));
    expect(screen.getByText("Action Description")).toBeInTheDocument();
  });
  it("runs the onConfirm function when the confirm(potvrdit) button is clicked", () => {
    fireEvent.click(screen.getByText("Dialog Button"));
    fireEvent.click(screen.getByText("Potvrdit"));
    expect(onConfirmMock).toBeCalled();
  });
  it("closes the dialog when the confirm(potvrdit) button is clicked", (done) => {
    fireEvent.click(screen.getByText("Dialog Button"));
    fireEvent.click(screen.getByText("Potvrdit"));
    setTimeout(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      done();
    }, dialogFadeOutDuration);
  });
  it("closes the dialog when the cancel(Zrušit) button is clicked", (done) => {
    fireEvent.click(screen.getByText("Dialog Button"));
    expect(screen.getByText("Zrušit"));
    fireEvent.click(screen.getByText("Zrušit"));
    setTimeout(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      done();
    }, dialogFadeOutDuration);
  });
});
