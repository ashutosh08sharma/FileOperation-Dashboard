import React from 'react';
import { FileItem } from './types';
import IndeterminateCheckbox from '../components/Checkbox/Checkbox';
import './FileDashboard.css';
import DownloadIcon from '../Icons/DownloadIcon';

export const FileDashboard = ({ data = [] }: { data?: FileItem[] }) => {

  if (!data || data.length === 0) {
    return (
      <div>
        <p> No Records found, Please try again later.</p>
      </div>
    );
  }
  return (
    <div>
      <div className="headerBar">
        <div className="selectionControls">
          <IndeterminateCheckbox
            checked={false}
            indeterminate={false}
            onChange={() => { }}
            aria-label="Select all files"
          />
          <span>
            None Selected
          </span>
        </div>

        <button
          className="downloadBtn"
          onClick={() => { }}
          disabled={false}
        >
          <DownloadIcon />
          Download Selected
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.id}>
              <td>
                <IndeterminateCheckbox
                  checked={false}
                  onChange={() => { }}
                  aria-label={`Select ${row.name}`}
                /></td>
              <td>{row.name}</td>
              <td>{row.device}</td>
              <td>{row.path}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};