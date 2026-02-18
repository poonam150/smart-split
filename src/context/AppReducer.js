export default (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users]
      };

    // NEW CODE STARTS HERE
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
      // NEW CODE STARTS HERE
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };

    default:
      return state;
  }
};