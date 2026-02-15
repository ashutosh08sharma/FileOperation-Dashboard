import React, { useCallback } from 'react';
import { FileItem } from './types';
import IndeterminateCheckbox from '../components/Checkbox/IndeterminateCheckbox';
import './FileDashboard.css';
import DownloadIcon from '../Icons/DownloadIcon';
import { useSelection } from '../hooks/useSelection';
import TableRow from './TableRow';

export const FileDashboard = ({ data = [] }: { data?: FileItem[] }): JSX.Element => {
  const {
    selectedIds,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    toggleRow,
    toggleAll
  } = useSelection(data, (item) => item.name);

  const handleDownload = useCallback((): void => {
    const selectedItems = data?.filter(item => selectedIds.has(item.name));

    if (selectedItems.length === 0) return;

    const report = selectedItems.map(item => {
      const downloadStatus = item.status === 'Available' ? 'Downloaded' : 'Skipped';
      return `Device: ${item.device}\nPath: ${item.path}\nStatus: ${item.status}\nDownload Status: ${downloadStatus}`;
    }).join('\n\n');

    alert(report);
  }, [data, selectedIds]);

  if (!data || data.length === 0) {
    return (
      <div className='error'>
        <p> No Records found, Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="headerBar">
        <div className="selectionControls">
          <IndeterminateCheckbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={toggleAll}
            aria-label="Select all files"
          />
          <span aria-live="polite">
            {selectedCount === 0 ? 'None Selected' : `Selected ${selectedCount}`}
          </span>
        </div>

        <button
          className="downloadBtn"
          onClick={handleDownload}
          disabled={selectedCount === 0}
        >
          <DownloadIcon />
          Download Selected
        </button>
      </div>

      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Device</th>
              <th>Path</th>
              <th>
                <div className="alignBox">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <TableRow
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.name)}
                onToggle={toggleRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};