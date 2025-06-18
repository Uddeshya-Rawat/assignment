import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
    const { id } = useParams(); // Board ID from URL
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const statusOptions = ['todo', "in-progress", 'completed']
    const priorityOptions = ['low', 'medium', 'high'];

    // New task form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
    });

    // Fetch tasks for board
    const fetchBoardDetails = async () => {
        try {
            const res = await fetch(`http://localhost:3000/getTasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId: id }),
            });
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching board details:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleStatusChange = async (taskId, currentStatus) => {
        const nextStatus = statusOptions[(statusOptions.indexOf(currentStatus) + 1) % statusOptions.length];
        try {
            await fetch(`http://localhost:3000/updateTask/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus }),
            });
            fetchBoardDetails(); // Refresh task list
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handlePriorityChange = async (taskId, currentPriority) => {
        const nextPriority = priorityOptions[(priorityOptions.indexOf(currentPriority) + 1) % priorityOptions.length];
        try {
            await fetch(`http://localhost:3000/updateTask/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priority: nextPriority }),
            });
            fetchBoardDetails(); // Refresh task list
        } catch (err) {
            console.error('Failed to update priority:', err);
        }
    };


    useEffect(() => {
        fetchBoardDetails();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Create new task
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/createTask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, boardId: id }),
            });
            const newTask = await res.json();
            setTasks((prev) => [...prev, newTask]); // append new task
            setFormData({
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',

            });
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

    return (
        <div className="p-6 text-white">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
                ← Back
            </button>

            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="p-2 rounded bg-[#1e293b] text-white" />
                <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="p-2 rounded bg-[#1e293b] text-white" />
                <select name="status" value={formData.status} onChange={handleChange} className="p-2 rounded bg-[#1e293b] text-white">
                    <option>todo</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
                <select name="priority" value={formData.priority} onChange={handleChange} className="p-2 rounded bg-[#1e293b] text-white">
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>

                <button type="submit" className="md:col-span-2 bg-green-600 hover:bg-green-700 py-2 rounded">
                    Create Task
                </button>
            </form>

            <h3 className="text-2xl font-semibold mb-4">Tasks</h3>

            {loading ? (
                <p className="text-gray-300">Loading...</p>
            ) : tasks.length === 0 ? (
                <p className="text-gray-400">No tasks in this board.</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-[#1e293b] p-4 rounded-xl shadow-md">
                            <h4 className="text-xl font-semibold mb-1">{task.title}</h4>
                            <p className="text-gray-300 mb-2">{task.description}</p>
                            <div className="text-sm text-gray-400 mb-2">
                                <p>Status: {task.status}</p>
                                <p>Priority: {task.priority}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusChange(task._id, task.status)}
                                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded"
                                >
                                    Change Status
                                </button>
                                <button
                                    onClick={() => handlePriorityChange(task._id, task.priority)}
                                    className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 rounded"
                                >
                                    Change Priority
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoardDetail;

