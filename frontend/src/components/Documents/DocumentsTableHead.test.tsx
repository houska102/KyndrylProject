import {render, screen, fireEvent} from '@testing-library/react'
import DocumentsTableHead from "./DocumentsTableHead";

describe('DocumentsTableHead component', () => {
    const onBulkSelectToggleMock = jest.fn()
    const onBulkSignConfirmMock = jest.fn()
    const renderTableHead = (bulkSelect: boolean, confirmButtonDisabled: boolean) => {
        render(<DocumentsTableHead isBulkSelect={bulkSelect} confirmButtonDisabled={confirmButtonDisabled} onBulkSelectToggle={onBulkSelectToggleMock} onBulkSignConfirm={onBulkSignConfirmMock} />)
    }
    afterEach(() => {
        onBulkSelectToggleMock.mockClear()
        onBulkSignConfirmMock.mockClear()
    })

    it('renders a bulk Select button when bulkSelect is false', () => {
        renderTableHead(false, false)
        expect(screen.getByText('Vybrat více')).toBeInTheDocument()
    })
    it('does not render the cancel and confirm icon buttons when bulkSelect is false', () => {
        renderTableHead(false, false)
        expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument()
        expect(screen.queryByTestId('DoneIcon')).not.toBeInTheDocument()
    })

    it('does not render a bulk Select button when bulkSelect is true', () => {
        renderTableHead(true, false)
        expect(screen.queryByText('Vybrat více')).not.toBeInTheDocument()
    })
    it('renders the cancel and confirm icon buttons when bulkSelect is true', () => {
        renderTableHead(true, false)
        expect(screen.getByTestId('CloseIcon')).toBeInTheDocument()
        expect(screen.getByTestId('DoneIcon')).toBeInTheDocument()
    })

    it('runs the onSelectToggle method when bulk select button is clicked', ()=> {
        renderTableHead(false, false)
        fireEvent.click(screen.getByText('Vybrat více'))
        expect(onBulkSelectToggleMock).toBeCalledTimes(1)
    })
    it('runs the onSelectToggle method when cancel bulk select icon button is clicked', ()=> {
        renderTableHead(true, false)
        fireEvent.click(screen.getByTestId('CloseIcon'))
        expect(onBulkSelectToggleMock).toBeCalledTimes(1)
    })


    it('does not runs the onBulkSignConfirm method when disabled confirm bulk select icon button is clicked', ()=> {
        renderTableHead(true, true)
        fireEvent.click(screen.getByTestId('DoneIcon'))
        expect(onBulkSignConfirmMock).not.toBeCalled()
    })
    it('runs the onBulkSignConfirm method when enabled confirm bulk select icon button is clicked', ()=> {
        renderTableHead(true, false)
        fireEvent.click(screen.getByTestId('DoneIcon'))
        expect(onBulkSignConfirmMock).toBeCalledTimes(1)
    })
})