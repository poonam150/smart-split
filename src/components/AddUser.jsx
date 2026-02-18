import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid'; // Generates unique IDs
import { toast } from 'react-hot-toast';

export const AddUser = () => {
  const [name, setName] = useState('');
  const { addUser } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    if (name.trim() === "") return; // Don't add empty names

    const newUser = {
      id: uuidv4(),
      name: name
    };

    addUser(newUser); // Sends data to the Context
    toast.success('Member Added! 🚀');
    setName(''); // Clears the input box
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Person</h3>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name (e.g. Rahul)"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold">
          Add
        </button>
      </form>
    </div>
  );
};