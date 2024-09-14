import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import Task from './Task';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import axiosInstance from '../config/axiosConfig';
import Loader from './Loader';
import { fetcher } from '../config/fetcher';

const Dashboard = () => {
  const [filter, setFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetching all tasks
  const { data: tasks, error, mutate } = useSWR('/tasks', fetcher);

  // Edit Logic
  const handleEdit = (id) => {
    const task = tasks.find(t => t.id === id);
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
    mutate();
  };

  // Delete task Logic
  const handleDelete = async (id) => {
    try {
      mutate(async (currentTasks) => currentTasks.filter(task => task.id !== id), false);
      await axiosInstance.delete(`/tasks/${id}`);
      mutate(); 
    } catch (error) {
      console.error('Error deleting task:', error);
      mutate();
    }
  };

  const filteredTasks = tasks ? tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return !task.is_completed;
    if (filter === 'Completed') return task.is_completed;
    return true;
  }) : [];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-gray-50 rounded-lg shadow-lg relative">
      {/* Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Button and Filter Options */}
      <motion.div
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Add Task Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
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
      </motion.div>

      {/* Task List */}
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <motion.ul
            className="bg-gray-50 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                updateTasks={mutate}
              />
            ))}
          </motion.ul>
        ) : (
          <motion.div
            className="text-center text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>No tasks available, create one.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Create Task
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        updateTasks={mutate}
      />

      {editingTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={editingTask}
        />
      )}
    </div>
  );
};

export default Dashboard;