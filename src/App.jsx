import React, { useContext } from 'react';
import { GlobalProvider, GlobalContext } from './context/GlobalContext';
import { AddUser } from './components/AddUser';
import { AddExpense } from './components/AddExpense';
import { ExpenseList } from './components/ExpenseList';
import { BalanceSummary } from './components/BalanceSummary';

// Simple list to show users
function UserList() {
  const { users } = useContext(GlobalContext);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Group Members</h3>
      {users.length === 0 ? (
        <p className="text-gray-500">No members yet. Add someone!</p>
      ) : (
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">{user.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">SmartSplit 💸</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AddUser />
            </div>
            <div>
              <BalanceSummary />
            </div>
          </div>
          <AddExpense />
          <ExpenseList />
          <UserList />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;