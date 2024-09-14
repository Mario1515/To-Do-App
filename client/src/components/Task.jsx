import React from 'react';
import axiosInstance from '../config/axiosConfig';

const Task = ({ task, onEdit, onDelete, updateTasks }) => {

  const handleComplete = () => {
    axiosInstance.patch(`/tasks/${task.id}`, {
      is_completed: !task.is_completed,
    })
      .then(() => {
        console.log("Successfully completed", task.id);
        updateTasks();
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  return (
    <li className="border-t border-gray-200 py-3 px-4 flex items-center justify-between space-x-4">
      <div className="flex-1">
        <h3 className="text-xl font-medium text-gray-900">{task.title}</h3>
        {task.description && (
          <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        )}

        {/* Task Properties */}
        <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
          <p className="flex items-center">
            Status:
            <span
              className={`font-semibold ml-1 ${
                task.is_completed ? "text-green-600" : "text-red-600"
              }`}
            >
              {task.is_completed ? "Completed" : "In Progress"}
            </span>
          </p>
          <p className="flex items-center">
            Created:
            <span className="font-medium ml-1">{task.created_at}</span>
          </p>
          <p className="flex items-center">
            Updated:
            <span className="font-medium ml-1">{task.updated_at}</span>
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          type="button"
          onClick={() => onEdit(task.id)}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 active:scale-100 transition-transform duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-0 active:scale-100 transition-transform duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleComplete}
          className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-0 active:scale-100 transition-transform duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            task.is_completed ? "bg-green-600" : "bg-green-400"
          }`}
        >
          {task.is_completed ? "In Progress" : "Complete"}
        </button>
      </div>
    </li>
  );
};

export default Task;