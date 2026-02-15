export type FileStatus = 'Available' | 'Scheduled';

export interface FileItem {
  id: string; 
  name: string;
  device: string;
  path: string;
  status: FileStatus;
}