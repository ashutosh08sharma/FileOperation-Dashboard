import React from 'react';
import { FileItem } from './types';
import IndeterminateCheckbox from '../../components/Checkbox/IndeterminateCheckbox';

interface TableRowProps {
  item: FileItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

// Memoized row component for rendering file items in the table
const TableRow = React.memo(({
  item,
  isSelected,
  onToggle
}: TableRowProps): JSX.Element => {
  return (
    <tr
      className="row"
      aria-selected={isSelected}
      onClick={() => onToggle(item.name)}
    >
      <td className="cell" onClick={(e) => e.stopPropagation()}>
        <IndeterminateCheckbox
          checked={isSelected}
          onChange={() => onToggle(item.name)}
          aria-label={`Select ${item.name}`}
        />
      </td>
      <td className="cell">{item.name}</td>
      <td className="cell">{item.device}</td>
      <td className="cell">{item.path}</td>
      <td className="cell">
        <div className="alignBox">
          <span className={`statusDot ${item.status === 'Available' ? 'available' : 'scheduled'}`} />
          <span className="capitalized">{item.status}</span>
        </div>
      </td>
    </tr>
  );
});

export default TableRow;