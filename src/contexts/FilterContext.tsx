import { createContext } from 'react';

export type FilterTypeContextType = {
  filterType: number;
  setFilterType: (filterType: number) => void;
}

export const FilterTypeContext = createContext<FilterTypeContextType>({
  filterType: 3,
  setFilterType: () => {}
}); 