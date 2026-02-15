import { FileItem } from "./Features/FileDashboard/types";

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

export const sampleData: FileItem[] = [
  {
    id: generateId(),
    name: 'smss.exe',
    device: 'Mario',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'Scheduled'
  },
  {
    id: generateId(),
    name: 'netsh.exe',
    device: 'Luigi',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
    status: 'Available'
  },
  {
    id: generateId(),
    name: 'uxtheme.dll',
    device: 'Peach',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
    status: 'Available'
  },
  {
    id: generateId(),
    name: 'aries.sys',
    device: 'Daisy',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
    status: 'Scheduled'
  },
  {
    id: generateId(),
    name: 'cryptbase.dll',
    device: 'Yoshi',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
    status: 'Scheduled'
  },
  {
    id: crypto.randomUUID(),
    name: 'cryptdex.dll',
    device: 'Bob',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptdex.dll',
    status: 'Scheduled'
  },
  {
    id: crypto.randomUUID(),
    name: 'datasync.dll',
    device: 'Charlie',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\datasync.dll',
    status: 'Available'
  },
  {
    id: crypto.randomUUID(),
    name: 'wsh.dll',
    device: 'Toad',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\wsh.dll',
    status: 'Scheduled'
  }
];