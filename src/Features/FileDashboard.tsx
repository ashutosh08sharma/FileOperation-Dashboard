import React from 'react';
import { FileItem } from './types';

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
      <div>
        Header Controls
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
              <td>[ ]</td>
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