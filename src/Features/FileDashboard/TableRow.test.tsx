import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableRow from './TableRow';
import { FileItem } from './types';

jest.mock('../../components/Checkbox/IndeterminateCheckbox', () => (props: any) => (
    <input
        type="checkbox"
        data-testid="indeterminate-checkbox"
        checked={props.checked}
        onChange={props.onChange}
        aria-label={props['aria-label']}
    />
));

const mockItem: FileItem = {
    id: 'file1',
    name: 'file1.txt',
    device: 'DeviceA',
    path: '/path/to/file1.txt',
    status: 'Available',
};

describe('TableRow', () => {
    const onToggle = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders file item data correctly', () => {
        render(
            <table>
                <tbody>
                    <TableRow item={mockItem} isSelected={false} onToggle={onToggle} />
                </tbody>
            </table>
        );
        expect(screen.getByText('file1.txt')).toBeInTheDocument();
        expect(screen.getByText('DeviceA')).toBeInTheDocument();
        expect(screen.getByText('/path/to/file1.txt')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByLabelText('Select file1.txt')).toBeInTheDocument();
    });

    it('checkbox reflects isSelected prop', () => {
        const { rerender } = render(
            <table>
                <tbody>
                    <TableRow item={mockItem} isSelected={false} onToggle={onToggle} />
                </tbody>
            </table>
        );
        expect(screen.getByTestId('indeterminate-checkbox')).not.toBeChecked();

        rerender(
            <table>
                <tbody>
                    <TableRow item={mockItem} isSelected={true} onToggle={onToggle} />
                </tbody>
            </table>
        );
        expect(screen.getByTestId('indeterminate-checkbox')).toBeChecked();
    });

    it('calls onToggle when row is clicked', () => {
        render(
            <table>
                <tbody>
                    <TableRow item={mockItem} isSelected={false} onToggle={onToggle} />
                </tbody>
            </table>
        );
        fireEvent.click(screen.getByRole('row'));
        expect(onToggle).toHaveBeenCalledWith('file1.txt');
    });

    it('calls onToggle when checkbox is changed', () => {
        render(
            <table>
                <tbody>
                    <TableRow item={mockItem} isSelected={false} onToggle={onToggle} />
                </tbody>
            </table>
        );
        fireEvent.click(screen.getByTestId('indeterminate-checkbox'));
        expect(onToggle).toHaveBeenCalledWith('file1.txt');
    });
});