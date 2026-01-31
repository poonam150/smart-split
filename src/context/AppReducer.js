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
    // NEW CODE ENDS HERE

    default:
      return state;
  }
};