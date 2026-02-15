import React, { useMemo } from 'react';
import './ReportModal.css';
import { FileItem } from '../../Features/FileDashboard/types';

interface ReportData {
  items: FileItem[];
  downloadedCount: number;
  skippedCount: number;
}

interface ReportModalProps {
  data: ReportData | null;
  onClose: () => void;
}

// Modal component to display the download report
const ReportModal = React.memo(({ data, onClose }: ReportModalProps): JSX.Element | null => {
  if (!data) return null;

  const reportText = useMemo(() => {
    if (!data) return '';

    const summary = `Total Files: ${data.items.length}, Downloaded: ${data.downloadedCount}, Skipped: ${data.skippedCount}`;

    const details = data.items.map(item => {
      const isAvailable = item.status?.toLowerCase() === 'available';
      const statusLabel = isAvailable ? 'Downloaded' : 'Skipped';
      return `Device: ${item.device}\nPath: ${item.path}\nStatus: ${statusLabel}`;
    }).join('\n\n');

    return `${summary}\n\n${details}`;
  }, [data]);

  return (
    <div className={'modalOverlay'} role="presentation" onClick={onClose}>
      <div
        className={'modalContent'}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className={'modalHeader'}>
          <h2 id="modal-title">Download Report</h2>
          <button onClick={onClose} aria-label="Close modal" className={'closeBtn'}>×</button>
        </div>
        <div className={'modalBody'}>
          <p>{reportText}</p>
        </div>
        <div className={'modalFooter'}>
          <button onClick={onClose} className={'primaryBtn'}>Close</button>
        </div>
      </div>
    </div>
  );
});

export default ReportModal;