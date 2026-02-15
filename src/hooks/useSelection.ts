import { useState, useMemo, useCallback } from 'react';

export function useSelection<T>(
  data: T[] = [],
  getItemId: (item: T) => string
) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const safeData = useMemo((): T[] => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const selectedCount = selectedIds.size;
  const totalCount = safeData.length;
  
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  const toggleRow = useCallback((id: string): void => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleAll = useCallback((): void => {
    setSelectedIds(prev => {
      const isCurrentlyAllSelected = safeData.length > 0 && prev.size === safeData.length;
      
      if (isCurrentlyAllSelected) {
        return new Set();
      } else {
        const allIds = safeData.map(getItemId);
        return new Set(allIds);
      }
    });
  }, [safeData, getItemId]);

  return {
    selectedIds,
    selectedCount,
    totalCount,
    isAllSelected,
    isIndeterminate,
    toggleRow,
    toggleAll
  };
}