export const calculateBalances = (users, expenses) => {
  // 1. Create a "Ledger" for every user (start at 0)
  // Format: { "user_id_1": 0, "user_id_2": 0 }
  const balances = {};
  users.forEach(user => {
    balances[user.id] = 0;
  });

  // 2. Loop through every single expense
  expenses.forEach(expense => {
    const { amount, payerId, involvedUserIds } = expense;
    
    // How much should each person pay?
    const splitAmount = amount / involvedUserIds.length;

    // 3. CREDIT the Payer (They paid the full amount)
    // We add the FULL amount now, and subtract their share later.
    if (balances[payerId] !== undefined) {
        balances[payerId] += amount;
    }

    // 4. DEBIT the Consumers (Subtract their share)
    involvedUserIds.forEach(userId => {
      if (balances[userId] !== undefined) {
        balances[userId] -= splitAmount;
      }
    });
  });

  return balances;
};