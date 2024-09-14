import React from 'react';
import axiosInstance from '../config/axiosConfig';
import { formatDate } from '../utils/formater';  

const Task = ({ task, onEdit, onDelete, updateTasks }) => {

  const handleComplete = async () => {
    try {
      await axiosInstance.patch(`/tasks/${task.id}`, {
        is_completed: !task.is_completed,
      });
      updateTasks(); 
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return  (
    <li className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-3 mb-2">
      {/* Left Section: Title, Descriptiopn and Status*/}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
              task.is_completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.is_completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        {task.description && (
          <div className="mt-1 text-sm text-gray-600">
            <p className="whitespace-pre-wrap break-words max-w-xs">{task.description}</p>
          </div>
        )}
      </div>

  {/* Middle Section: Created and Updated */}
  <div className="flex flex-col items-center sm:items-start text-sm text-gray-500 space-y-2 sm:space-y-0">
    <p className="flex items-center">
      <span className="font-medium mr-1">Created:</span>
      <span>{formatDate(task.created_at)}</span>
    </p>
    <p className="flex items-center">
      <span className="font-medium mr-1">Updated:</span>
      <span>{formatDate(task.updated_at)}</span>
    </p>
  </div>

  {/* Right Section: Action Buttons */}
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
    <button
      type="button"
      onClick={() => onEdit(task.id)}
      className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold rounded-lg text-sm px-4 py-2 transition-transform transform hover:scale-100"
    >
      Edit
    </button>
    <button
      type="button"
      onClick={() => onDelete(task.id)}
      className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold rounded-lg text-sm px-4 py-2 transition-transform transform hover:scale-100"
    >
      Delete
    </button>
    <button
      type="button"
      onClick={handleComplete}
      className={`text-white ${!task.is_completed ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400'} focus:outline-none focus:ring-2 font-semibold rounded-lg text-sm px-4 py-2 transition-transform transform hover:scale-100`}
    >
      {task.is_completed ? "Pending" : "Complete"}
    </button>
  </div>
</li>
  );
};

export default Task;