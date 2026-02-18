import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { simplifyDebts } from '../utils/simplifyDebts';
import { ArrowRight } from 'lucide-react'; // Nice arrow icon

export const SettlementPlan = () => {
  const { users, expenses } = useContext(GlobalContext);
  const plan = simplifyDebts(users, expenses);

  const getUserName = (id) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 border-t-4 border-indigo-500">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Optimized Settlement Plan 🚀</h3>
      
      {plan.length === 0 ? (
        <p className="text-gray-500">All debts are settled!</p>
      ) : (
        <ul className="space-y-3">
          {plan.map((tx, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-indigo-50 rounded text-gray-700">
              <span className="font-bold text-red-500">{getUserName(tx.from)}</span>
              
              <div className="flex flex-col items-center px-4">
                <span className="text-xs text-gray-500">pays</span>
                <ArrowRight size={16} className="text-gray-400" />
              </div>

              <span className="font-bold text-green-600">{getUserName(tx.to)}</span>
              <span className="font-extrabold text-indigo-700 ml-auto">₹{tx.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};