import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateBoard from './CreateBoard';

const AllBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('http://localhost:3000/getBoards');
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="p-6">
        <CreateBoard/>
      <h2 className="text-3xl font-bold text-white mb-4"> All Boards</h2>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : boards.length === 0 ? (
        <p className="text-gray-400">No boards found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div
              key={board._id}
              className="bg-[#1e293b] text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              onClick={()=>navigate(`/board/${board._id}`)}
            >
              <h3 className="text-xl font-semibold mb-1">{board.name}</h3>
              <p className="text-sm text-gray-400">
                Created on: {new Date(board.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBoards;
