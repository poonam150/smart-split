export const simplifyDebts = (users, expenses) => {
  // 1. Calculate Net Balance for everyone
  // (Positive = You are owed money, Negative = You owe money)
  const balances = {};
  users.forEach(user => balances[user.id] = 0);

  expenses.forEach(expense => {
    const { amount, payerId, involvedUserIds } = expense;
    const splitAmount = amount / involvedUserIds.length;

    // Credit the payer
    if (balances[payerId] !== undefined) balances[payerId] += amount;

    // Debit the consumers
    involvedUserIds.forEach(userId => {
      if (balances[userId] !== undefined) balances[userId] -= splitAmount;
    });
  });

  // 2. Separate into two lists: People who OWE (Debtors) and People to be PAID (Creditors)
  let debtors = [];
  let creditors = [];

  for (const [userId, amount] of Object.entries(balances)) {
    if (amount < -0.01) debtors.push({ id: userId, amount: amount }); // Negative
    if (amount > 0.01) creditors.push({ id: userId, amount: amount });  // Positive
  }

  // Sort them to match biggest debts with biggest credits first (Greedy Algorithm)
  debtors.sort((a, b) => a.amount - b.amount); // Ascending (-100, -50)
  creditors.sort((a, b) => b.amount - a.amount); // Descending (100, 50)

  // 3. Match them up!
  const transactions = [];
  let i = 0; // Iterator for debtors
  let j = 0; // Iterator for creditors

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    // The amount to settle is the minimum of what Debtor owes vs what Creditor needs
    // Math.abs() turns -50 into 50
    const amount = Math.min(Math.abs(debtor.amount), creditor.amount);

    // Record the transaction
    transactions.push({
      from: debtor.id,
      to: creditor.id,
      amount: amount.toFixed(2)
    });

    // Adjust remaining balances
    debtor.amount += amount;
    creditor.amount -= amount;

    // If settled, move to next person
    if (Math.abs(debtor.amount) < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return transactions;
};