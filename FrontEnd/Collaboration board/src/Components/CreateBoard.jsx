import React, { useState } from 'react';

const CreateBoard = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateBoard = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage('Board name is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/createBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Board created successfully!');
        setName('');
      } else {
        setMessage(data.error || ' Failed to create board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
      setMessage(' Server error');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto  bg-[#111111]">
      <h2 className="text-2xl font-bold text-white mb-4"> Create Board</h2>

      <form onSubmit={handleCreateBoard} className="space-y-4">
        <input
          type="text"
          placeholder="Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Create
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-yellow-300">{message}</p>
      )}
    </div>
  );
};


export default CreateBoard