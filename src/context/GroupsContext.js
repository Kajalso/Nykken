import React, { createContext, useReducer, useEffect } from 'react';
import { groupReducer } from './groupReducer';

export const GroupsContext = createContext();

const GroupsContextProvider = (props) => {
  const [groups, dispatch] = useReducer(groupReducer, [], () => {
    const localData = localStorage.getItem('Groups');
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem('Groups', JSON.stringify(groups));
  }, [groups]);
  return (
    <GroupsContext.Provider value={{ groups, dispatch }}>
      {props.children}
    </GroupsContext.Provider>
  );
}
 
export default GroupsContextProvider;