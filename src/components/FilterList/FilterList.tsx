import React from 'react';
import { useContext } from "react";
import { FilterTypeContext } from '../../contexts/FilterContext';
import './FilterList.css';

const FilterList: React.FC = () => {
  const { filterType, setFilterType } = useContext(FilterTypeContext);

  const filterTypes = [
    { value: 3, id: 'all', name: 'すべて' },
    { value: 0, id: 'not-yet', name: '未着手' },
    { value: 1, id: 'working', name: '作業中' },
    { value: 2, id: 'completed', name: '完了' }
  ];

  const handleChangeFilterType = (e: any) => {
    setFilterType(parseInt(e.target.value, 10));
  };

  return (
    <div className="filter-area">
      <ul>
        {filterTypes.map((ft) => {
          return (
            <li key={ft.id}>
              <label htmlFor={ft.id}>{ft.name}</label>
              <input
                type="radio"
                name="filter"
                id={ft.id}
                value={ft.value}
                onChange={handleChangeFilterType}
                checked={ft.value === filterType}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterList;
