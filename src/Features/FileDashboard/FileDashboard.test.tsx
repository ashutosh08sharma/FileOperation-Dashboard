import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileDashboard } from './FileDashboard';
import { FileItem } from './types';

const files: FileItem[] = [
  {
    name: 'smss.exe', device: 'Mario', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'Scheduled',
    id: 'id-123456789'
  },
  { name: 'netsh.exe', device: 'Luigi', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'Available', id: 'id-987654321' }
];
 
describe('FileDashboard', () => {
  it('renders file list and selection info', () => {
    render(<FileDashboard data={files} />);
    expect(screen.getByText('smss.exe')).toBeInTheDocument();
    expect(screen.getByText('netsh.exe')).toBeInTheDocument();
    expect(screen.getByText('None Selected')).toBeInTheDocument();
  });

  it('selects all files when select-all is clicked', () => {
    render(<FileDashboard data={files} />);
    const selectAll = screen.getByLabelText('Select all files');
    fireEvent.click(selectAll);
    expect(screen.getByText('Selected 2')).toBeInTheDocument();
  });

  it('disables download button when nothing is selected', () => {
    render(<FileDashboard data={files} />);
    const downloadBtn = screen.getByRole('button', { name: /download selected/i });
    expect(downloadBtn).toBeDisabled();
  });

  it('enables download button when an available file is selected', () => {
    render(<FileDashboard data={files} />);
    const checkbox = screen.getByLabelText('Select netsh.exe');
    fireEvent.click(checkbox);
    const downloadBtn = screen.getByRole('button', { name: /download selected/i });
    expect(downloadBtn).not.toBeDisabled();
  });

  it('shows report modal with correct message when downloading available files', () => {
    render(<FileDashboard data={files} />);
    const checkbox = screen.getByLabelText('Select netsh.exe');
    fireEvent.click(checkbox);
    const downloadBtn = screen.getByRole('button', { name: /download selected/i });
    fireEvent.click(downloadBtn);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('Total Files: 1, Downloaded: 1, Skipped: 0');
    expect(dialog).toHaveTextContent('Device: Luigi');
    expect(dialog).toHaveTextContent('Path: \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe');
    expect(dialog).toHaveTextContent('Status: Downloaded');
  });

  it('shows report modal when no available files are selected for download', () => {
    render(<FileDashboard data={files} />);
    const checkbox = screen.getByLabelText('Select smss.exe');
    fireEvent.click(checkbox);
    const downloadBtn = screen.getByRole('button', { name: /download selected/i });
    fireEvent.click(downloadBtn);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('Total Files: 1, Downloaded: 0, Skipped: 1');
    expect(dialog).toHaveTextContent('Status: Skipped');
  });

  it('shows report modal with skipped scheduled files when both available and scheduled are selected', () => {
    render(<FileDashboard data={files} />);
    const selectAll = screen.getByLabelText(/select all/i);
    fireEvent.click(selectAll);
    const downloadBtn = screen.getByRole('button', { name: /download selected/i });
    fireEvent.click(downloadBtn);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('Total Files: 2, Downloaded: 1, Skipped: 1');
    expect(dialog).toHaveTextContent('Device: Luigi');
    expect(dialog).toHaveTextContent('Path: \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe');
    expect(dialog).toHaveTextContent('Status: Downloaded');
  });
});
 