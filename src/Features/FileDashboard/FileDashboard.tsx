import { useCallback, useState } from 'react';
import { FileItem } from './types';
import IndeterminateCheckbox from '../../components/Checkbox/IndeterminateCheckbox';
import DownloadIcon from '../../Icons/DownloadIcon';
import ReportModal from '../../components/Modal/ReportModal';
import { useSelection } from '../../hooks/useSelection';
import './FileDashboard.css';
import DataTable from '../../components/Table/DataTable';

/**
 * FileDashboard component that displays a list of files in a table with selection and download functionality.
 * It uses the useSelection hook to manage selection state and displays a report modal after downloading.
 * If no data is provided, it shows an error message.
 */

const columns: { name: string; isExtended: boolean }[] = [
  { name: 'Name', isExtended: false },
  { name: 'Device', isExtended: false },
  { name: 'Path', isExtended: false },
  { name: 'Status', isExtended: true }
];

export const FileDashboard = ({ data = [] }: { data?: FileItem[] }): JSX.Element => {
  const {
    selectedIds,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    toggleRow,
    toggleAll
  } = useSelection(data, (item) => item.id);
  const [reportData, setReportData] = useState<{ downloadedCount: number; skippedCount: number; items: FileItem[] } | null>(null);

  const handleDownload = useCallback((): void => {
    const selectedItems = data.filter(d => selectedIds.has(d.id));
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
      {/* Eventually this header can be extracted to a separate component if needed */}
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
      <DataTable
        data={data}
        toggleRow={toggleRow}
        selectedIds={selectedIds}
        columns={columns}
      />
    </div>
  );
};