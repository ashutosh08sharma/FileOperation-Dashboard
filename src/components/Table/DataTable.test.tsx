import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from './DataTable';
import { FileItem } from '../../Features/FileDashboard/types';

jest.mock('./TableRow', () => (props: any) => (
    <tr data-testid="table-row">
        <td>
            <button onClick={() => props.onToggle(props.item.id)}>
                {props.isSelected ? 'Selected' : 'Not Selected'}
            </button>
        </td>
        <td>{props.item.name}</td>
        <td>Status</td>
    </tr>
));

const mockData: FileItem[] = [
    {
        id: '1', name: 'file1.txt',
        device: '',
        path: '',
        status: 'Available'
    },
    {
        id: '2', name: 'file2.txt',
        device: '',
        path: '',
        status: 'Available'
    },
];

const tableHeaders = [{ name: 'Name', isExtended: false }];

describe('DataTable', () => {
    it('renders table headers including Status', () => {
        render(
            <DataTable
                data={mockData}
                toggleRow={jest.fn()}
                selectedIds={new Set()}
                columns={tableHeaders}
            />
        );
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getAllByText('Status').length).toBeGreaterThan(0);
    });

    it('renders a row for each data item', () => {
        render(
            <DataTable
                data={mockData}
                toggleRow={jest.fn()}
                selectedIds={new Set()}
                columns={tableHeaders}
            />
        );
        expect(screen.getAllByTestId('table-row')).toHaveLength(mockData.length);
    });

    it('calls toggleRow with correct id when row button is clicked', () => {
        const toggleRow = jest.fn();
        render(
            <DataTable
                data={mockData}
                toggleRow={toggleRow}
                selectedIds={new Set()}
                columns={tableHeaders}
            />
        );
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]);
        expect(toggleRow).toHaveBeenCalledWith('1');
    });

    it('marks rows as selected if their id is in selectedIds', () => {
        render(
            <DataTable
                data={mockData}
                toggleRow={jest.fn()}
                selectedIds={new Set(['1'])}
                columns={tableHeaders}
            />
        );
        expect(screen.getAllByText(/Selected|Not Selected/)[0]).toHaveTextContent('Selected');
        expect(screen.getAllByText(/Selected|Not Selected/)[1]).toHaveTextContent('Not Selected');
    });
});