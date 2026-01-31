import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export const ExpenseList = () => {
  const { expenses, users } = useContext(GlobalContext);

  // Helper function to find a name by ID
  const getUserName = (id) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Transaction History</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses added yet.</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map(expense => (
            <li key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 border-l-4 border-green-500 rounded shadow-sm">
              <div>
                <p className="font-bold text-gray-800">{expense.description}</p>
                <p className="text-xs text-gray-500">
                  Paid by <span className="font-semibold">{getUserName(expense.payerId)}</span> • {expense.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-700">₹{expense.amount}</p>
                <p className="text-xs text-gray-500">
                  Split among {expense.involvedUserIds.length} people
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};