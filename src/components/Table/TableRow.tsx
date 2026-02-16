import React from 'react';
import { FileItem } from '../../Features/FileDashboard/types';
import IndeterminateCheckbox from '../Checkbox/IndeterminateCheckbox';

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
      onClick={() => onToggle(item.id)}
    >
      <td className="cell" onClick={(e) => e.stopPropagation()}>
        <IndeterminateCheckbox
          checked={isSelected}
          onChange={() => onToggle(item.id)}
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