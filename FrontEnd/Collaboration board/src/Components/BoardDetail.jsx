import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
  const { id } = useParams(); // Board ID from URL
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/getTask/${id}`);
        const data = await res.json();
        setBoard(data.board);
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching board details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardDetails();
  }, [id]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!board) return <p className="text-white p-6">Board not found.</p>;

  return (
    <div className="p-6 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-2">{board.name}</h2>
      <p className="text-gray-400 mb-6">
        Created on: {new Date(board.date).toLocaleDateString()}
      </p>

      <h3 className="text-2xl font-semibold mb-4">Tasks</h3>

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks in this board.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {tasks.map((task) => (
            <div key={task._id} className="bg-[#1e293b] p-4 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold mb-1">{task.title}</h4>
              <p className="text-gray-300 mb-2">{task.description}</p>
              <div className="text-sm text-gray-400">
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>Assigned To: {task.assignedTo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
