import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Make sure this import is correct
import DashboardCard from "./DashboardCard";
import TasksTable from "./TasksTable";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("My Task");
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode from local storage, default to false
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save dark mode preference to local storage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-neutralLight dark:bg-neutralDark text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass darkMode and toggleDarkMode as props to Header */}
        <Header activeNavItem={activeNavItem} darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> 
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Cards and Task Table content */}
          <div className="space-y-6 mb-6">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Pending Tasks" value={60} type="pending" />
              <DashboardCard title="Overdue Tasks" value={56} type="overdue" />
              <DashboardCard title="Due For Today" value={0} type="dueToday" />
              <DashboardCard title="Approaching Breach Tasks" value={1} type="breach" />
            </div>
          </div>
          
          {activeNavItem === "My Task" && (
            <>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                Task List
              </h2>
              <TasksTable />
            </>
          )}

          {activeNavItem !== "My Task" && (
            <div className="text-center p-10">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Welcome to {activeNavItem}!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Content for {activeNavItem} will appear here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}