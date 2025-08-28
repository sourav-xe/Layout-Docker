import React, { useState, useEffect, useReducer } from "react";
import { X, Clock, AlertTriangle, TrendingUp, Edit2, Trash2 } from "lucide-react";
import DashboardCard from "./DashboardCard";
import EditTaskModal from "./EditTaskModal";

// Initial data for tasks
const initialTasks = [
  {
    customerName: "AVF",
    customerCode: "VBN-1234",
    taskId: "TS-6465",
    title: "Onboarding Kickoff Call",
    status: "Pending",
    priority: "Medium",
    type: "Customer Success",
    description: "Schedule kickoff call and share the agenda with stakeholders.",
    dueDate: "2025-08-30",
    owner: "Shashank",
    events: [
      { id: "e1", user: "Shashank", action: "changed status", details: "from inprogress to canceled", timestamp: "Aug 7, 2025, 12:20 PM" },
      { id: "e2", user: "Tariq", action: "changed status", details: "from pending to onhold", timestamp: "Jul 23, 2025, 5:44 PM" },
    ],
    tickets: [
      { id: "t1", title: "Addsuite - UAT feedbacks", ticketId: "ADDX781377", status: "unassigned", priority: "Medium", created: "18/07/2025, 17:43:12", cc: "tariq@dexxkor.com" },
      { id: "t2", title: "Test ticket.", ticketId: "ADDK20201929", status: "unassigned", priority: "Medium", created: "19/07/2025, 18:38:11", cc: "tariq@dexxkor.com" },
    ],
    notes: [
      { id: "n1", user: "Shashank", content: "Drafted email copy and shared with the team.", timestamp: "2025-08-28T10:00:00Z" },
    ],
  },
  { customerName: "Northwind", customerCode: "NW-0091", taskId: "TS-9100", title: "Contract Signature", status: "Completed", priority: "Low", type: "Legal", description: "MSA and DPA executed via DocuSign.", dueDate: "2025-08-25", owner: "Tariq", events: [], tickets: [], notes: [] },
  { customerName: "Acme Corp", customerCode: "AC-7712", taskId: "TS-7712", title: "Payment API Integration", status: "In Progress", priority: "High", type: "Development", description: "Integrate Stripe webhooks for refund and dispute events.", dueDate: "2025-09-10", owner: "Shashank", events: [], tickets: [], notes: [] },
  { customerName: "Globex", customerCode: "GBX-4420", taskId: "TS-4420", title: "Data Migration to Aurora", status: "Pending", priority: "High", type: "DevOps", description: "Migrate production DB and run smoke tests post cutover.", dueDate: "2025-09-01", owner: "Shashank", events: [], tickets: [], notes: [] },
  { customerName: "Umbrella", customerCode: "UMB-2044", taskId: "TS-2044", title: "NPS Campaign Q3", status: "Pending", priority: "Medium", type: "Marketing", description: "Draft email copy and segment users for survey rollout.", dueDate: "2025-09-15", owner: "Tariq", events: [], tickets: [], notes: [] },
  { customerName: "Stark Industries", customerCode: "STK-5801", taskId: "TS-5801", title: "Renewal Opportunity", status: "Pending", priority: "High", type: "Sales", description: "Prepare renewal proposal due in 45 days.", dueDate: "2025-10-10", owner: "Shashank", events: [], tickets: [], notes: [] },
  { customerName: "Wayne Enterprises", customerCode: "WN-3310", taskId: "TS-3310", title: "Prod Incident RCA", status: "Completed", priority: "Medium", type: "SRE", description: "Publish postmortem for 2025-08-20 outage.", dueDate: "2025-08-20", owner: "Tariq", events: [], tickets: [], notes: [] },
  { customerName: "Soylent", customerCode: "SYL-0920", taskId: "TS-0920", title: "GDPR Data Request", status: "Canceled", priority: "Low", type: "Compliance", description: "Request withdrawn by customer, no action required.", dueDate: "2025-08-28", owner: "Shashank", events: [], tickets: [], notes: [] },
];

const STATUS_STYLES = {
  Pending: "text-amber-700 border-amber-500",
  "In Progress": "text-blue-700 border-blue-500",
  Completed: "text-emerald-700 border-emerald-500",
  Canceled: "text-rose-700 border-rose-500",
  unassigned: "text-gray-800 border-gray-500",
};

const PRIORITY_STYLES = {
  Low: "text-teal-700 border-teal-500",
  Medium: "text-orange-700 border-orange-500",
  High: "text-pink-700 border-pink-500",
  Critical: "text-slate-800 border-slate-500",
};

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Canceled"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "update_task": {
      const { taskId, field, value } = action;
      return tasks.map(task =>
        task.taskId === taskId ? { ...task, [field]: value } : task
      );
    }
    case "update_task_full": {
      const { updatedTask } = action;
      return tasks.map(task =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      );
    }
    case "add_event": {
      const { taskId, event } = action;
      return tasks.map(task =>
        task.taskId === taskId
          ? { ...task, events: [...(task.events || []), event] }
          : task
      );
    }
    case "add_ticket": {
      const { taskId, ticket } = action;
      return tasks.map(task =>
        task.taskId === taskId
          ? { ...task, tickets: [...(task.tickets || []), ticket] }
          : task
      );
    }
    case "delete_ticket": {
      const { taskId, ticketId } = action;
      return tasks.map(task =>
        task.taskId === taskId
          ? { ...task, tickets: task.tickets.filter(t => t.id !== ticketId) }
          : task
      );
    }
    case "add_note": {
      const { taskId, note } = action;
      return tasks.map(task =>
        task.taskId === taskId
          ? { ...task, notes: [...(task.notes || []), note] }
          : task
      );
    }
    case "delete_note": {
      const { taskId, noteId } = action;
      return tasks.map(task =>
        task.taskId === taskId
          ? { ...task, notes: task.notes.filter(n => n.id !== noteId) }
          : task
      );
    }
    case "add_task": {
      const { newTask } = action;
      return [newTask, ...tasks];
    }
    case "delete_task": {
      return tasks.filter(task => task.taskId !== action.taskId);
    }
    case "initial_load": {
      return action.data;
    }
    default:
      return tasks;
  }
}

export default function MainContent({ activeNavItem }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [newTask, setNewTask] = useState({
    customerName: "",
    customerCode: "",
    taskId: "",
    title: "",
    status: "Pending",
    priority: "Medium",
    type: "Customer Success",
    description: "",
    dueDate: "",
    owner: "",
    events: [],
    tickets: [],
    notes: [],
  });

  useEffect(() => {
    try {
      const localData = localStorage.getItem("tasksData");
      if (localData) {
        dispatch({ type: "initial_load", data: JSON.parse(localData) });
      }
    } catch (e) {
      console.error("Failed to load tasks from local storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tasksData", JSON.stringify(tasks));
      if (selectedTask) {
        const latestTask = tasks.find(t => t.taskId === selectedTask.taskId);
        setSelectedTask(latestTask || null);
      }
    } catch (e) {
      console.error("Failed to save tasks to local storage", e);
    }
  }, [tasks, selectedTask]);

  const handleStatusChange = (taskId, newStatus) => {
    dispatch({ type: "update_task", taskId, field: "status", value: newStatus });
    dispatch({
      type: "add_event",
      taskId,
      event: {
        id: `e${Date.now()}`,
        user: "Current User",
        action: "changed status",
        details: `to ${newStatus}`,
        timestamp: new Date().toLocaleString(),
      },
    });
  };

  const handlePriorityChange = (taskId, newPriority) => {
    dispatch({ type: "update_task", taskId, field: "priority", value: newPriority });
  };

  const handleAddNote = () => {
    if (!selectedTask || !noteContent.trim()) return;
    const newNote = {
      id: `n${Date.now()}`,
      user: "Shashank",
      content: noteContent.trim(),
      timestamp: new Date().toISOString(),
      isBold,
      isItalic,
      isUnderlined,
      isStrikethrough,
    };
    dispatch({ type: "add_note", taskId: selectedTask.taskId, note: newNote });
    setNoteContent("");
    setIsBold(false);
    setIsItalic(false);
    setIsUnderlined(false);
    setIsStrikethrough(false);
  };

  const handleDeleteNote = (noteId) => {
    if (!selectedTask) return;
    dispatch({ type: "delete_note", taskId: selectedTask.taskId, noteId });
  };

  const handleCreateTicket = () => {
    if (!selectedTask || !ticketTitle.trim()) return;
    const newTicket = {
      id: `t${Date.now()}`,
      title: ticketTitle.trim(),
      ticketId: `TSK${Math.floor(Math.random() * 900000) + 100000}`,
      status: "unassigned",
      priority: "Medium",
      created: new Date().toLocaleString(),
      cc: "user@email.com",
    };
    dispatch({ type: "add_ticket", taskId: selectedTask.taskId, ticket: newTicket });
    setTicketTitle("");
  };

  const handleDeleteTicket = (ticketId) => {
    if (!selectedTask) return;
    dispatch({ type: "delete_ticket", taskId: selectedTask.taskId, ticketId });
  };

  const handleScheduleMeeting = () => {
    if (!selectedTask || !meetingTitle.trim()) return;
    const newMeeting = {
      id: `m${Date.now()}`,
      user: "Current User",
      action: "scheduled a meeting",
      details: `for "${meetingTitle.trim()}"`,
      timestamp: new Date().toLocaleString(),
    };
    dispatch({ type: "add_event", taskId: selectedTask.taskId, event: newMeeting });
    setMeetingTitle("");
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...newTask,
      customerCode: `CC-${Math.floor(Math.random() * 9000) + 1000}`,
      taskId: `TS-${Math.floor(Math.random() * 9000) + 1000}`,
      notes: [],
      events: [],
      tickets: [],
      dueDate: new Date().toISOString().split('T')[0],
    };
    dispatch({ type: "add_task", newTask: taskData });
    setIsAddTaskModalOpen(false);
    setNewTask({
      customerName: "",
      customerCode: "",
      taskId: "",
      title: "",
      status: "Pending",
      priority: "Medium",
      type: "Customer Success",
      description: "",
      dueDate: "",
      owner: "",
      events: [],
      tickets: [],
      notes: [],
    });
  };

  const handleDeleteTask = (taskId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "delete_task", taskId });
      if (selectedTask && selectedTask.taskId === taskId) {
        setSelectedTask(null);
      }
    }
  };

  const handleOpenEditModal = (task, e) => {
    e.stopPropagation();
    setTaskToEdit(task);
  };

  const handleCloseEditModal = () => {
    setTaskToEdit(null);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch({ type: "update_task_full", updatedTask });
    setTaskToEdit(null);
  };

  const filteredTasks = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="flex w-full overflow-hidden relative font-sans">
      <div className={`flex-1 transition-all duration-300 ease-in-out ${selectedTask ? "pr-96" : "pr-0"}`}>
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Pending Tasks"
              value={tasks.filter(t => t.status === "Pending").length}
              type="pending"
            />
            <DashboardCard
              title="Overdue Tasks"
              value={tasks.filter(t => t.status === "Overdue").length}
              type="overdue"
            />
            <DashboardCard
              title="Due For Today"
              value={tasks.filter(t => t.status === "Due Today").length}
              type="dueToday"
            />
            <DashboardCard
              title="Approaching Breach Tasks"
              value={tasks.filter(t => t.status === "Breach").length}
              type="breach"
            />
          </div>
        </div>

        {activeNavItem === "My Task" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Task List
            </h2>
            <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 p-4 rounded-xl shadow-inner">
              <div className="flex gap-3">
                {["All", "Pending", "In Progress", "Completed", "Canceled"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${filter === f ? "bg-blue-600 text-white shadow-md" : "bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-200 hover:bg-slate-400 dark:hover:bg-slate-500"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                + Add Task
              </button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-700">
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="p-3 text-left">Customer Name</th>
                      <th className="p-3 text-left">Customer Code</th>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Priority</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {filteredTasks.map(task => (
                      <tr
                        key={task.taskId}
                        className={`transition ${task.taskId % 2 === 0 ? "bg-slate-50 dark:bg-slate-700" : "bg-white dark:bg-slate-800"} hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <td className="p-3 text-slate-900 dark:text-slate-100">{task.customerName}</td>
                        <td className="p-3 text-blue-600 dark:text-blue-400 underline">{task.customerCode}</td>
                        <td className="p-3 text-slate-800 dark:text-slate-100">{task.title}</td>
                        <td className="p-3">
                          <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.taskId, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 border ${STATUS_STYLES[task.status]} focus:ring-2 focus:ring-blue-400`}
                          >
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="p-3">
                          <select
                            value={task.priority}
                            onChange={(e) => handlePriorityChange(task.taskId, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 border ${PRIORITY_STYLES[task.priority]} focus:ring-2 focus:ring-blue-400`}
                          >
                            {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </td>
                        <td className="p-3 text-slate-700 dark:text-slate-300">{task.type || "-"}</td>
                        <td className="p-3 text-slate-800 dark:text-slate-100">{task.description}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => handleOpenEditModal(task, e)}
                              className="p-1 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 transition"
                              title="Edit Task"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={(e) => handleDeleteTask(task.taskId, e)}
                              className="p-1 rounded-full text-red-500 hover:bg-red-200 dark:hover:bg-red-700 dark:hover:text-red-300 transition"
                              title="Delete Task"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`fixed top-0 right-0 h-full w-96 bg-white dark:bg-slate-800 shadow-xl border-l border-slate-200 dark:border-slate-700 transition-transform duration-300 ease-in-out z-40 ${selectedTask ? "translate-x-0" : "translate-x-full"}`}>
        {selectedTask && (
          <div className="flex flex-col h-full">
            <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">
                    {selectedTask.customerName.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{selectedTask.customerName} - {selectedTask.taskId}</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-slate-500 dark:text-slate-400 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z"/></svg></button>
                  <button onClick={() => setSelectedTask(null)} className="text-slate-600 dark:text-slate-300 hover:text-red-500"><X size={24} /></button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center"><span className="font-bold mr-1">Task name:</span> {selectedTask.title}</div>
                </div>
                <div className="flex flex-wrap justify-between text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex flex-col mb-2"><span className="font-bold mr-1">Due date:</span> {selectedTask.dueDate}</div>
                  <div className="flex flex-col mb-2"><span className="font-bold mr-1">Created date:</span> {new Date().toLocaleDateString("en-US", { day: "numeric", month: "numeric", year: "numeric" })}</div>
                  <div className="flex flex-col mb-2"><span className="font-bold mr-1">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[selectedTask.status]}`}>{selectedTask.status}</span></div>
                </div>
                <div className="flex flex-wrap justify-between text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex flex-col mb-2"><span className="font-bold mr-1">Priority:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_STYLES[selectedTask.priority]}`}>{selectedTask.priority}</span></div>
                  <div className="flex flex-col mb-2"><span className="font-bold mr-1">Owner:</span> <span className="font-semibold">{selectedTask.owner}</span></div>
                </div>
              </div>
            </div>

            <div className="flex border-b border-slate-200 dark:border-slate-700">
              {["Description", "Notes", "Events", "Tickets"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-4 text-sm font-medium ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === "Description" && (
                <p className="text-slate-600 dark:text-slate-300">{selectedTask.description}</p>
              )}
              {activeTab === "Notes" && (
                <div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100">Notes</h3>
                  {selectedTask.notes && selectedTask.notes.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {selectedTask.notes.map(note => (
                        <div key={note.id} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg flex justify-between items-start">
                          <p
                            className="text-sm text-slate-600 dark:text-slate-300 mb-1"
                            style={{ fontWeight: note.isBold ? "bold" : "normal", fontStyle: note.isItalic ? "italic" : "normal", textDecoration: `${note.isUnderlined ? "underline" : ""}${note.isStrikethrough ? " line-through" : ""}` }}
                          >
                            {note.content}
                          </p>
                          <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:text-red-700 ml-4">&times;</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg mb-4 text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-300">No notes yet. Be the first to add a note!</p>
                    </div>
                  )}
                  <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-2">
                    <div className="flex space-x-2 mb-2">
                      <button onClick={() => setIsBold(!isBold)} className={`font-bold px-2 py-1 rounded ${isBold ? "bg-slate-300 dark:bg-slate-600" : "bg-white dark:bg-slate-800"} text-slate-800 dark:text-slate-100`}>B</button>
                      <button onClick={() => setIsItalic(!isItalic)} className={`italic px-2 py-1 rounded ${isItalic ? "bg-slate-300 dark:bg-slate-600" : "bg-white dark:bg-slate-800"} text-slate-800 dark:text-slate-100`}>I</button>
                      <button onClick={() => setIsUnderlined(!isUnderlined)} className={`underline px-2 py-1 rounded ${isUnderlined ? "bg-slate-300 dark:bg-slate-600" : "bg-white dark:bg-slate-800"} text-slate-800 dark:text-slate-100`}>U</button>
                      <button onClick={() => setIsStrikethrough(!isStrikethrough)} className={`line-through px-2 py-1 rounded ${isStrikethrough ? "bg-slate-300 dark:bg-slate-600" : "bg-white dark:bg-slate-800"} text-slate-800 dark:text-slate-100`}>S</button>
                    </div>
                    <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="w-full h-24 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none" placeholder="Add a new note..." style={{ fontWeight: isBold ? "bold" : "normal", fontStyle: isItalic ? "italic" : "normal", textDecoration: `${isUnderlined ? "underline" : ""}${isStrikethrough ? " line-through" : ""}` }}/>
                    <div className="flex justify-end mt-2">
                      <button onClick={handleAddNote} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Publish</button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "Events" && (
                <div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100">Events</h3>
                  {selectedTask.events && selectedTask.events.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {selectedTask.events.map(event => (
                        <div key={event.id} className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">{event.user.charAt(0)}</div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-800 dark:text-slate-100"><span className="font-bold">{event.user}</span> {event.action} <span className="font-normal text-blue-600 dark:text-blue-400">{event.details}</span></p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">on {event.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg mb-4 text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-300">No events have been logged for this task yet.</p>
                    </div>
                  )}
                  <h4 className="font-medium text-sm text-slate-800 dark:text-slate-100 mb-2">Schedule a Meeting</h4>
                  <div className="space-y-2">
                    <input type="text" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} placeholder="Meeting Title" className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100" />
                    <button onClick={handleScheduleMeeting} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Schedule Meeting</button>
                  </div>
                </div>
              )}
              {activeTab === "Tickets" && (
                <div>
                  <div className="flex justify-end gap-2 mb-4">
                    <button className="bg-blue-200 text-blue-800 hover:bg-blue-300 px-4 py-2 rounded-lg text-sm font-medium">Link Ticket</button>
                    <button onClick={handleCreateTicket} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Create Ticket</button>
                  </div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100">Linked Tickets</h3>
                  {selectedTask.tickets && selectedTask.tickets.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {selectedTask.tickets.map(ticket => (
                        <div key={ticket.id} className="border border-slate-300 dark:border-slate-600 rounded-lg p-4 relative">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-slate-800 dark:text-slate-100">{ticket.title}</h4>
                            <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center space-x-2">
                              <a href="#" className="hover:underline">View</a>
                              <span className="text-slate-400">|</span>
                              <a href="#" className="hover:underline">Merge</a>
                              <button onClick={() => handleDeleteTicket(ticket.id)} className="text-red-500 hover:text-red-700 ml-4">&times;</button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2"><span className="font-bold">{ticket.ticketId}</span></p>
                          <div className="flex flex-wrap items-center text-xs text-slate-600 dark:text-slate-400 gap-4">
                            <span><span className="font-bold">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium border bg-white dark:bg-slate-800 ${STATUS_STYLES[ticket.status]}`}>{ticket.status}</span></span>
                            <span><span className="font-bold">Priority:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium border bg-white dark:bg-slate-800 ${PRIORITY_STYLES[ticket.priority]}`}>{ticket.priority}</span></span>
                            <span><span className="font-bold">Created at:</span> {ticket.created}</span>
                            <span><span className="font-bold">CC:</span> {ticket.cc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg mb-4 text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-300">No linked tickets.</p>
                    </div>
                  )}
                  <h4 className="font-medium text-sm text-slate-800 dark:text-slate-100 mb-2">Create New Ticket</h4>
                  <div className="space-y-2">
                    <input type="text" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} placeholder="Ticket Title" className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100" />
                    <button onClick={handleCreateTicket} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Create</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isAddTaskModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-xl space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Add New Task</h2>
            <form onSubmit={handleAddTaskSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Customer Name</label>
                  <input type="text" required value={newTask.customerName} onChange={(e) => setNewTask({ ...newTask, customerName: e.target.value })} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
                  <input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea required value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} rows="3" className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select required value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                    {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select required value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                    {PRIORITY_OPTIONS.map(priority => <option key={priority} value={priority}>{priority}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Owner</label>
                <input type="text" required value={newTask.owner} onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })} className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsAddTaskModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onClose={handleCloseEditModal}
          onSave={handleUpdateTask}
          STATUS_OPTIONS={STATUS_OPTIONS}
          PRIORITY_OPTIONS={PRIORITY_OPTIONS}
        />
      )}
    </div>
  );
}