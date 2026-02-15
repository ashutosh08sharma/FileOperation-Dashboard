import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportModal from './ReportModal';
import { FileStatus } from '../../Features/FileDashboard/types';

const reportData = {
  items: [
    {
      id: 'file-1',
      name: 'netsh.exe',
      device: 'Luigi',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
      status: 'Available' as FileStatus
    },
    {
      id: 'file-2',
      name: 'smss.exe',
      device: 'Mario',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'Scheduled' as FileStatus
    }
  ],
  downloadedCount: 1,
  skippedCount: 1
};

describe('ReportModal', () => {
  it('does not render when data is null', () => {
    render(<ReportModal data={null} onClose={jest.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Download Report')).not.toBeInTheDocument();
  });

  it('renders title and report content when data is provided', () => {
    render(<ReportModal data={reportData} onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Download Report')).toBeInTheDocument();
    expect(dialog).toHaveTextContent('Total Files: 2, Downloaded: 1, Skipped: 1');
    expect(dialog).toHaveTextContent('Device: Luigi');
    expect(dialog).toHaveTextContent('Path: \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe');
    expect(dialog).toHaveTextContent('Status: Downloaded');
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(<ReportModal data={reportData} onClose={onClose} />);

    fireEvent.click(screen.getByRole('presentation'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside modal content', () => {
    const onClose = jest.fn();
    render(<ReportModal data={reportData} onClose={onClose} />);

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<ReportModal data={reportData} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
