import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';

export const AddExpense = () => {
  const { users, addExpense } = useContext(GlobalContext);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payerId, setPayerId] = useState('');
  
  // NEW: State to track who is involved in the split
  const [involvedUserIds, setInvolvedUserIds] = useState([]);

  const handleCheckboxChange = (userId) => {
    // This is "Senior Engineer" logic:
    // If the ID is already in the list -> Remove it (filter)
    // If the ID is NOT in the list -> Add it (spread)
    if (involvedUserIds.includes(userId)) {
      setInvolvedUserIds(involvedUserIds.filter(id => id !== userId));
    } else {
      setInvolvedUserIds([...involvedUserIds, userId]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validation: Don't submit if data is missing
    if (!description || !amount || !payerId || involvedUserIds.length === 0) {
      alert("Please fill all fields and select at least one person to split with.");
      return;
    }

    const newExpense = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      payerId,
      involvedUserIds, // <--- Now we are saving the array of IDs!
      date: new Date().toLocaleDateString()
    };

    addExpense(newExpense);
    toast.success('Expense Added! 💸');
    
    // Reset Form
    setDescription('');
    setAmount('');
    setPayerId('');
    setInvolvedUserIds([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-t-4 border-blue-500">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Expense</h3>
      <form onSubmit={onSubmit}>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input 
            type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Pizza"
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
          <input 
            type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Who Paid?</label>
          <select 
            value={payerId} onChange={(e) => setPayerId(e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-white"
          >
            <option value="" disabled>Select a person</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {/* NEW: Checkboxes for Split */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Split Between:</label>
          <div className="flex flex-wrap gap-3">
            {users.map(user => (
              <label key={user.id} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded cursor-pointer">
                <input 
                  type="checkbox"
                  checked={involvedUserIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{user.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold">
          Add Expense
        </button>
      </form>
    </div>
  );
};