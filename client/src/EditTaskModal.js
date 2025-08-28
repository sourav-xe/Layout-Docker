import React, { useState } from "react";

const EditTaskModal = ({ task, onClose, onSave, STATUS_OPTIONS, PRIORITY_OPTIONS }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Edit Task: {task.taskId}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Customer Name</label>
              <input type="text" name="customerName" value={editedTask.customerName} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
              <input type="text" name="title" value={editedTask.title} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea name="description" value={editedTask.description} onChange={handleChange} rows="3" className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <select name="status" value={editedTask.status} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select name="priority" value={editedTask.priority} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                {PRIORITY_OPTIONS.map(priority => <option key={priority} value={priority}>{priority}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;