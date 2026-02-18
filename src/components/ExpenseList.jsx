import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Trash2 } from 'lucide-react';
import { getCategoryIcon } from '../utils/getIcon'; // <--- Import logic

export const ExpenseList = () => {
  const { expenses, users, deleteTransaction } = useContext(GlobalContext);

  const getUserName = (id) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6 transition-colors duration-300">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Transaction History</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No expenses added yet.</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map(expense => (
            <li key={expense.id} className="group flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 border-l-4 border-green-500 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              
              {/* NEW: The Smart Icon */}
              <div className="text-3xl mr-3">
                {getCategoryIcon(expense.description)}
              </div>

              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white capitalize">{expense.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  Paid by <span className="font-semibold">{getUserName(expense.payerId)}</span> • {expense.date}
                </p>
              </div>
              
              <div className="text-right mr-4">
                <p className="text-lg font-bold text-green-700 dark:text-green-400">₹{expense.amount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Split among {expense.involvedUserIds.length}
                </p>
              </div>

              <button 
                onClick={() => deleteTransaction(expense.id)}
                className="text-red-400 hover:text-red-600 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};