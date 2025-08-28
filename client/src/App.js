import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
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

  // Apply dark mode class to html element and save to local storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-y-auto p-6">
          <TasksTable activeNavItem={activeNavItem} />
        </main>
      </div>
    </div>
  );
}