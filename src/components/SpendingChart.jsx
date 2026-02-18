import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const SpendingChart = () => {
  const { expenses, users } = useContext(GlobalContext);

  // 1. Calculate spending per user
  const data = users.map(user => {
    const amount = expenses
      .filter(e => e.payerId === user.id)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { name: user.name, value: amount };
  }).filter(item => item.value > 0); // Hide users with 0 spending

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  if (data.length === 0) return null;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg mt-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Spending Breakdown 📊</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};