import { useCallback, useState } from 'react';
import { FileItem } from './types';
import IndeterminateCheckbox from '../../components/Checkbox/IndeterminateCheckbox';
import DownloadIcon from '../../Icons/DownloadIcon';
import TableRow from './TableRow';
import ReportModal from '../../components/Modal/ReportModal';
import { useSelection } from '../../hooks/useSelection';
import './FileDashboard.css';

/**
 * FileDashboard component that displays a list of files in a table with selection and download functionality.
 * It uses the useSelection hook to manage selection state and displays a report modal after downloading.
 * If no data is provided, it shows an error message.
 */
export const FileDashboard = ({ data = [] }: { data?: FileItem[] }): JSX.Element => {
  const {
    selectedIds,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    toggleRow,
    toggleAll
  } = useSelection(data, (item) => item.name);
  const [reportData, setReportData] = useState<{ downloadedCount: number; skippedCount: number; items: FileItem[] } | null>(null);

  const handleDownload = useCallback(() => {
    const selectedItems = data.filter(d => selectedIds.has(d.name));
    if (selectedItems.length === 0) return;

    const availableItems = selectedItems.filter(i => i.status?.toLowerCase() === 'available');
    const downloadedCount = availableItems.length;
    const skippedCount = selectedItems.length - downloadedCount;

    setReportData({
      items: selectedItems,
      downloadedCount,
      skippedCount
    });
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
      {reportData && (
        <ReportModal
          data={reportData}
          onClose={() => setReportData(null)}
        />
      )}
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
                  <div className="ghostSpacer" aria-hidden="true" />
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