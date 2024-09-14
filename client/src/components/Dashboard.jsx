import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import Task from './Task';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteModal from './DeleteModal'; 
import NoTasks from './NoTasks'; // Import the new component
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify'; 
import { fetcher } from '../config/fetcher';

const Dashboard = () => {
  const [filter, setFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null); 

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
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${deletingTaskId}`);
      setDeletingTaskId(null); 
      setIsDeleteModalOpen(false); // Close modal
      toast.success('Task was deleted!'); 
      mutate(); 
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleteModalOpen(false); // Close modal 
      mutate();
    }
  };

  const confirmDelete = (id) => {
    setDeletingTaskId(id);
    setIsDeleteModalOpen(true);
  };

  const filteredTasks = tasks ? tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return !task.is_completed;
    if (filter === 'Completed') return task.is_completed;
    return true;
  }) : [];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-gray-50 rounded-lg shadow-lg relative">

      {/* Add Task Button and Filter Options */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Add Task Button */}
        <motion.button
          onClick={() => setIsAddModalOpen(true)}
          className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          initial={{ opacity: 0, scale: 0.95 }}   
          animate={{ opacity: 1, scale: 1 }}      
          transition={{ duration: 0.5 }}          
          whileHover={{ scale: 1.05 }}            
          whileTap={{ scale: 0.95 }}              
        >
          Add Task
        </motion.button>

        {/* Filter Options */}
        <div className="flex space-x-4">
          {['All', 'In Progress', 'Completed'].map((option) => (
            <motion.button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === option ? 'bg-blue-500 text-white' : 'bg-gray-200'} transition-all duration-300 ease-in-out ${option === 'All' ? 'ml-0 sm:ml-4' : ''}`}
              whileHover={{ scale: 1.02 }}  
              whileTap={{ scale: 0.98 }}    
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Task List */}
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <motion.ul
            className="bg-gray-50 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={confirmDelete} // Pass confirmDelete function
                updateTasks={mutate}
              />
            ))}
          </motion.ul>
        ) : (
          <NoTasks onAddTask={() => setIsAddModalOpen(true)} /> // Use the new component
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

      {/* Delete Task Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;