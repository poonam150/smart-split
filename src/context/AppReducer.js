// This file acts like a "Traffic Cop" for our data.
// It decides how to change the state based on the "action" we send it.

export default (state, action) => {
  switch (action.type) {
    // We will add cases here later, like "ADD_EXPENSE" or "DELETE_USER"
    default:
      return state;
  }
};