import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Lightbulb, AlertTriangle, TrendingUp, Wallet } from 'lucide-react';

export const SmartAssistant = () => {
  const { expenses, users } = useContext(GlobalContext);

  // 1. Calculate Total Group Spending
  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);

  // 2. Find the "Top Spender" (Who paid the most?)
  const spendingByUser = {};
  expenses.forEach(expense => {
    spendingByUser[expense.payerId] = (spendingByUser[expense.payerId] || 0) + expense.amount;
  });
  
  // Sort to find the highest number
  const topSpenderId = Object.keys(spendingByUser).sort((a, b) => spendingByUser[b] - spendingByUser[a])[0];
  const topSpenderName = users.find(u => u.id === topSpenderId)?.name || "Someone";
  const topSpenderAmount = spendingByUser[topSpenderId] || 0;

  // 3. Check for "Food" spending
  const foodSpent = expenses
    .filter(e => e.description.toLowerCase().includes('pizza') || e.description.toLowerCase().includes('food') || e.description.toLowerCase().includes('burger'))
    .reduce((acc, i) => acc + i.amount, 0);

  if (expenses.length === 0) return null; // Don't show if empty

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-lg shadow-xl text-white mb-8 border border-indigo-400/30">
      <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
        <Lightbulb className="text-yellow-300 fill-yellow-300" size={24} />
        <h3 className="text-xl font-bold tracking-wide">Smart Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Total Volume */}
        <div className="bg-white/10 p-3 rounded backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-green-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Total Spent</span>
          </div>
          <p className="text-2xl font-bold">₹{totalSpent}</p>
        </div>

        {/* Card 2: Top Spender */}
        <div className="bg-white/10 p-3 rounded backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Wallet size={16} className="text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Top Spender</span>
          </div>
          <p className="text-sm">
            <span className="font-bold text-yellow-300 text-lg">{topSpenderName}</span>
          </p>
          <p className="text-xs text-indigo-200">Paid ₹{topSpenderAmount}</p>
        </div>

        {/* Card 3: Warnings */}
        <div className="bg-white/10 p-3 rounded backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-orange-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Spending Alert</span>
          </div>
          {foodSpent > 0 ? (
            <p className="text-sm">
              You spent <span className="font-bold text-red-200">₹{foodSpent}</span> on Food! 🍔
            </p>
          ) : (
            <p className="text-sm text-green-200">No crazy spending yet. ✅</p>
          )}
        </div>

      </div>
    </div>
  );
};
export default SmartAssistant;