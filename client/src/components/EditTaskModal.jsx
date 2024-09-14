import React, { useState, useEffect } from "react";
import axiosInstance from '../../config/axiosConfig';

const EditTaskModal = ({ isOpen, onClose, task }) => {

  //Local state managing for input data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Progress");

  //populating the form
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status || "In Progress");
    }
  }, [task]);

  //Update Handler
  const handleSubmit = (e) => {
    
    const isCompleted = status === "Completed" ? 1 : 0;

    console.log(task);

    e.preventDefault();
    // PUT request to update the task
    axiosInstance.put(`http://localhost:3000/tasks/${task.id}`, {
      title: title,
      description: description,
      is_completed: isCompleted,
    })
      .then(() => {
        console.log("Task updated successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return isOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Task
            </h3>

            {/* Form for editing the task */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

               {/* Task Status field */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Button to Cancel or Submit */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditTaskModal;
