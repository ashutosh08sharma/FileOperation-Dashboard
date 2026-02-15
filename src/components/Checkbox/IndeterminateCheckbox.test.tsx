import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './IndeterminateCheckbox';

describe('Checkbox', () => {
    it('renders a checkbox input', () => {
        const { getByRole } = render(<Checkbox />);
        const checkbox = getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('applies indeterminate state when indeterminate prop is true', () => {
        const { getByRole } = render(<Checkbox indeterminate />);
        const checkbox = getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.indeterminate).toBe(true);
    });

    it('removes indeterminate state when indeterminate prop is false', () => {
        const { getByRole, rerender } = render(<Checkbox indeterminate />);
        const checkbox = getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.indeterminate).toBe(true);

        rerender(<Checkbox indeterminate={false} />);
        expect(checkbox.indeterminate).toBe(false);
    });

    it('passes other props to the input element', () => {
        const { getByRole } = render(<Checkbox checked={true} disabled={true} />);
        const checkbox = getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
        expect(checkbox.disabled).toBe(true);
    });

    it('calls onChange handler when clicked', () => {
        const handleChange = jest.fn();
        const { getByRole } = render(<Checkbox onChange={handleChange} />);
        const checkbox = getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });
});