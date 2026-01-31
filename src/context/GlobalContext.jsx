import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  users: [],
  expenses: [] // This is where our bills will live
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Existing Action
  function addUser(user) {
    dispatch({
      type: 'ADD_USER',
      payload: user
    });
  }

  // NEW ACTION
  function addExpense(expense) {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense
    });
  }

  return (
    <GlobalContext.Provider value={{
      users: state.users,
      expenses: state.expenses,
      addUser,
      addExpense // <--- Don't forget to expose this!
    }}>
      {children}
    </GlobalContext.Provider>
  );
};