import { renderHook, act } from '@testing-library/react';
import { useSelection } from './useSelection';
import { FileItem } from '../Features/FileDashboard/types';

describe('useSelection', () => {
  const files: FileItem[] = [
    {
        name: 'a', device: 'd', path: '/a', status: 'Available',
        id: '22333'
    },
    {
        name: 'b', device: 'e', path: '/b', status: 'Scheduled',
        id: '33342'
    }
  ];

  it('toggles selection of one file', () => {
    const { result } = renderHook(() => useSelection(files, (file: FileItem) => file.id));
    act(() => result.current.toggleRow('22333'));
    expect(result.current.selectedIds.has('22333')).toBe(true);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.selectedIds.has('22333')).toBe(false);
  });

  it('toggles all files', () => {
    const { result } = renderHook(() => useSelection(files, (file: FileItem) => file.id));
    act(() => result.current.toggleAll());
    expect(result.current.selectedIds.size).toBe(2);
    act(() => result.current.toggleAll());
    expect(result.current.selectedIds.size).toBe(0);
  });

it('selectedCount reflects the number of selected items', () => {
    const { result } = renderHook(() => useSelection(files, (file: FileItem) => file.id));
    expect(result.current.selectedCount).toBe(0);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.selectedCount).toBe(1);
    act(() => result.current.toggleRow('33342'));
    expect(result.current.selectedCount).toBe(2);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.selectedCount).toBe(1);
});

it('isAllSelected is true only when all items are selected', () => {
    const { result } = renderHook(() => useSelection(files, (file: FileItem) => file.id));
    expect(result.current.isAllSelected).toBe(false);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.isAllSelected).toBe(false);
    act(() => result.current.toggleRow('33342'));
    expect(result.current.isAllSelected).toBe(true);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.isAllSelected).toBe(false);
});

it('isIndeterminate is true when some but not all items are selected', () => {
    const { result } = renderHook(() => useSelection(files, (file: FileItem) => file.id));
    expect(result.current.isIndeterminate).toBe(false);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.isIndeterminate).toBe(true);
    act(() => result.current.toggleRow('33342'));
    expect(result.current.isIndeterminate).toBe(false);
    act(() => result.current.toggleRow('22333'));
    expect(result.current.isIndeterminate).toBe(true);
    act(() => result.current.toggleRow('33342'));
    expect(result.current.isIndeterminate).toBe(false);
});
});