import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';
import axiosInstance from '../../config/axiosConfig';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching all tasks...
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit task', id);
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      console.log('Task deleted:', id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleComplete = (id) => {
    console.log('Complete task', id);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return task.status === 'Active' || task.status === 'Pending';
    if (filter === 'Completed') return task.status === 'Completed';
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-gray-50 rounded-lg shadow-lg">
      {/* Add Task Button and Filter Options */}
      <div className="flex justify-between items-center mb-4">
        {/* Add Task Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Task
        </button>

        {/* Filter Options */}
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('In Progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('Completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md space-y-4">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p>No tasks available, create one.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create Task
          </button>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;