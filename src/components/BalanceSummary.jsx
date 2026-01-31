import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { calculateBalances } from '../utils/balanceLogic'; // <--- Importing our logic

export const BalanceSummary = () => {
  const { users, expenses } = useContext(GlobalContext);

  // Run the math function
  const balances = calculateBalances(users, expenses);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Balances</h3>
      
      {users.length === 0 ? (
        <p className="text-gray-500">Add members to see balances.</p>
      ) : (
        <ul className="space-y-3">
          {users.map(user => {
            const balance = balances[user.id] || 0;
            // Formatting: Is it positive (Green) or negative (Red)?
            const isPositive = balance > 0;
            const colorClass = isPositive ? "text-green-600" : (balance < 0 ? "text-red-600" : "text-gray-500");
            
            return (
              <li key={user.id} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">{user.name}</span>
                <span className={`font-bold ${colorClass}`}>
                  {balance === 0 ? "Settled" : 
                    `${isPositive ? "+" : ""}₹${balance.toFixed(2)}`
                  }
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};