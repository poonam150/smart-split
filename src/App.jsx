import React, { useState, useEffect, useContext } from 'react';
import { GlobalProvider, GlobalContext } from './context/GlobalContext';
import { AddUser } from './components/AddUser';
import { AddExpense } from './components/AddExpense';
import { ExpenseList } from './components/ExpenseList';
import { BalanceSummary } from './components/BalanceSummary';
import { SettlementPlan } from './components/SettlementPlan';
import { SmartAssistant } from './components/SmartAssistant';
import { SpendingChart } from './components/SpendingChart'; // <--- NEW CHART
import { Trash2, Moon, Sun, Users } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast'; // <--- NEW TOASTS

// --- USER LIST COMPONENT ---
const UserList = () => {
  const { users, deleteUser } = useContext(GlobalContext);

  const handleDelete = (id, name) => {
    deleteUser(id);
    toast.success(`Removed ${name}`);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg mt-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Group Members</h3>
      </div>
      
      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">No members yet. Add your friends!</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <img 
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full bg-indigo-50 shadow-sm"
                />
                <span className="font-bold text-gray-700 dark:text-gray-200 capitalize">{user.name}</span>
              </div>
              <button 
                onClick={() => handleDelete(user.id, user.name)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all active:scale-90"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <GlobalProvider>
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} py-10 px-4 font-sans`}>
        
        {/* --- NOTIFICATIONS (TOASTER) --- */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* --- BACKGROUND BLOBS --- */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
           <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* --- TOGGLE BUTTON (Fixed) --- */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-2xl hover:scale-110 active:scale-90 transition-all z-50 border-2 border-indigo-100 dark:border-indigo-900"
        >
          {darkMode ? 
            <Sun className="text-yellow-400 w-6 h-6 animate-spin-slow" /> : 
            <Moon className="text-indigo-600 w-6 h-6" />
          }
        </button>

        {/* Content Container */}
        <div className="max-w-2xl mx-auto relative z-10 pt-8 pb-20">
          <h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-8 tracking-tighter drop-shadow-sm py-2 animate-pulse">
            SmartSplit 🚀
          </h1>
          
          <SmartAssistant />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="hover:scale-[1.02] transition-transform duration-300"><AddUser /></div>
            <div className="hover:scale-[1.02] transition-transform duration-300"><BalanceSummary /></div>
          </div>

          <AddExpense />
          
          {/* NEW CHART SECTION */}
          <SpendingChart />

          <SettlementPlan />
          <ExpenseList />
          <UserList />
          
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;