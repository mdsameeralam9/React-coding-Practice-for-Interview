import React, { useState, useMemo, useDeferredValue } from 'react';
import userData from './userData.json';
import useDebounce from './useDebounce';
import useTrottle from './useTrottle';
import './style.css';

export default function App() {
  const [query, setQuery] = useState('');
  const debounceValue = useDeferredValue(query);
  // const debounceValue = useTrottle(query);

  const filterData = useMemo(() => {
    console.log('filterData called');
    let copy = userData.slice();
    if (!query) return copy;

    return copy.filter((usr) => {
      const filterKeys = ['name', 'email', 'mobile', 'roleType'];

      return filterKeys.some((k) => {
        return usr?.[k]?.toLowerCase()?.includes(query?.toLowerCase());
      });
      //return usr.name?.includes(query?.toLowerCase());
    });
  }, [debounceValue]);
  return (
    <div className="wrapper">
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        className="searchInput"
        value={query}
      />

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Hello</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((tdata) => (
            <tr key={tdata.id}>
              <td>{tdata.id}</td>
              <td>{tdata.name}</td>
              <td>{tdata.email}</td>
              <td>{tdata.mobile}</td>
              <td>{tdata.roleType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//activeGrd



{/**
    
    
 import { useState, useEffect } from 'react';

const useDebounce = (key) => {
  const [debounced, setDebounced] = useState(key);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(key);
    }, 1000);

    return () => clearTimeout(id);
  }, [key]);

  return debounced;
};

export default useDebounce;
   
    
    
    
    
    
    
    
*/}


{/**
    
    
    
    
 import { useState, useEffect, useRef } from 'react';

const useTrottle = (key, delay = 1000) => {
  const [debounced, setDebounced] = useState(key);
  const timeRef = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - timeRef.current >= delay) {
      setDebounced(key);
      timeRef.current = now;
    }
  }, [key, delay]);

  return debounced;
};

export default useTrottle;
   
    
    
    
    
    
    
*/}