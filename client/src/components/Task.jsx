import React from 'react';

const Task = ({ task, onEdit, onDelete, onComplete }) => {
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
            <span className={`font-semibold ml-1 ${task.is_completed ? 'text-green-600' : 'text-red-600'}`}>
              {task.is_completed ? 'Completed' : 'Incomplete'}
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

      {/* Button  */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => onEdit(task.id)}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Delete
        </button>
        <button
          onClick={() => onComplete(task.id)}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {task.is_completed ? 'Undo' : 'Complete'}
        </button>
      </div>
    </li>
  );
};

export default Task;