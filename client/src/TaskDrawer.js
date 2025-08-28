// import React from "react";
// import { X } from "lucide-react";

// function TaskDrawer({ task, onClose }) {
//   if (!task) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex justify-end">
//       {/* Background overlay */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
//       ></div>

//       {/* Drawer */}
//       <div className="relative w-[450px] bg-gray-100 dark:bg-[#2c2c2c] shadow-xl h-full overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between bg-blue-900 text-white px-4 py-3">
//           <h2 className="text-lg font-semibold">
//             {task.customer} - {task.code}
//           </h2>
//           <button onClick={onClose}>
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Task Info */}
//         <div className="p-4 space-y-4">
//           <div>
//             <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Task Name</h3>
//             <p className="text-gray-700 dark:text-gray-300">{task.title}</p>
//           </div>

//           <div className="flex flex-wrap gap-3 text-sm">
//             <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full">
//               {task.status}
//             </span>
//             <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
//               {task.priority}
//             </span>
//             <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded-full">
//               Owner: {task.owner}
//             </span>
//           </div>

//           {/* Tabs */}
//           <div className="border-b border-gray-300 dark:border-gray-600 flex space-x-6">
//             <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
//               Description
//             </button>
//             <button className="pb-2 text-gray-600 dark:text-gray-300">Notes</button>
//             <button className="pb-2 text-gray-600 dark:text-gray-300">Events</button>
//             <button className="pb-2 text-gray-600 dark:text-gray-300">Tickets</button>
//           </div>

//           {/* Description */}
//           <div>
//             <p className="text-gray-700 dark:text-gray-300">
//               {task.description || "No description available."}
//             </p>
//           </div>

//           {/* Comments */}
//           <div className="mt-4">
//             <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
//               Comments
//             </h4>
//             <div className="border rounded-lg p-3 text-center text-gray-500 dark:text-gray-400">
//               No comments yet. <br /> Be the first to add a comment.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskDrawer;
