import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// 1. Load from LocalStorage (The "Memory")
// We try to find saved data. If none exists, we default to empty arrays.
const initialState = JSON.parse(localStorage.getItem('smartsplit_state')) || {
  users: [],
  expenses: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // 2. Save to LocalStorage whenever state changes
  // This "useEffect" runs every time 'state' updates (like adding a user)
  useEffect(() => {
    localStorage.setItem('smartsplit_state', JSON.stringify(state));
  }, [state]);

  // Actions
  function addUser(user) {
    dispatch({
      type: 'ADD_USER',
      payload: user
    });
  }

  function addExpense(expense) {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense
    });
  }
  
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function deleteUser(id) {
    dispatch({
      type: 'DELETE_USER',
      payload: id
    });
  }

  return (
    <GlobalContext.Provider value={{
      users: state.users,
      expenses: state.expenses,
      addUser,
      deleteUser,
      addExpense,
      deleteTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};