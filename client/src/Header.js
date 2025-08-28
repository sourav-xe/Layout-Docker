import React from "react";
import { Bell, Settings, ChevronDown, Search, Moon, Sun } from "lucide-react";

export default function Header({ activeNavItem, darkMode, toggleDarkMode }) {
  return (
    <header className="flex items-center justify-between px-6 bg-neutralLight dark:bg-neutralDark shadow-md h-16 transition duration-300 sticky top-0 z-40">
      {/* Left: Title + Search */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-primary dark:text-white">
          {activeNavItem}
        </h1>
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-72 pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-neutralDark text-gray-800 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-5">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative p-2 rounded-full text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-danger border border-white dark:border-neutralDark"></span>
        </button>

        <button className="p-2 rounded-full text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition" aria-label="Settings">
          <Settings size={20} />
        </button>

        <div className="flex items-center space-x-2 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition">
          <img
            src="https://placehold.co/32x32/2563EB/ffffff?text=U"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-primary dark:border-white"
          />
          <span className="text-sm font-medium text-primary dark:text-white">
            Shashank
          </span>
          <ChevronDown size={14} className="text-primary dark:text-white" />
        </div>
      </div>
    </header>
  );
}