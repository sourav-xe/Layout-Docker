import React from "react";
import {
  LayoutDashboard,
  Mail,
  BarChart2,
  Home,
  CreditCard,
  FileText,
  Handshake,
  Users,
  Heart,
  Star,
  Ticket,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "My Task", icon: LayoutDashboard },
  { name: "My Inbox", icon: Mail },
  { name: "Insight360", icon: BarChart2 },
  { name: "Dashboard", icon: Home }, // Changed to Home for general dashboard overview
  { name: "Payment", icon: CreditCard },
  { name: "Contract", icon: FileText },
  { name: "Opportunity", icon: Handshake },
  { name: "Customers", icon: Users },
  { name: "Health", icon: Heart },
  { name: "NPS", icon: Star },
  { name: "Tickets", icon: Ticket },
];

const views = [
  { name: "All Records", icon: List },
  { name: "Today's Work", icon: List },
  { name: "Team Progress", icon: List },
];

function SidebarItem({ item, collapsed, activeNavItem, setActiveNavItem }) {
  const Icon = item.icon;
  const isActive = activeNavItem === item.name;

  return (
    <li>
      <button
        onClick={() => setActiveNavItem(item.name)}
        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-200 w-full text-left
          ${
            isActive
              ? "bg-primary text-white font-semibold shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20"
          }`}
        aria-label={item.name}
      >
        <Icon size={18} />
        {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
      </button>
    </li>
  );
}

export default function Sidebar({ collapsed, setCollapsed, activeNavItem, setActiveNavItem }) {
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-neutralLight dark:bg-neutralDark shadow-md flex flex-col transition-all duration-300 h-screen z-50`}
    >
      {/* Logo + Collapse button */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-white/10">
        {!collapsed && (
          <span className="text-xl font-bold text-primary dark:text-white">
            DEXKOR
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition text-primary dark:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-2" aria-label="Main Navigation">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              collapsed={collapsed}
              activeNavItem={activeNavItem}
              setActiveNavItem={setActiveNavItem}
            />
          ))}
        </ul>
      </nav>

      {/* Views Section */}
      <div className="mt-auto border-t border-gray-200 dark:border-white/10 pt-4 px-2 pb-4">
        {!collapsed && (
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Views
          </h3>
        )}
        <ul className="space-y-1">
          {views.map((view, index) => {
            const Icon = view.icon;
            return (
              <li key={index}>
                <button
                  onClick={() => setActiveNavItem(view.name)}
                  className={`flex items-center gap-2 py-1.5 px-2 rounded-lg w-full text-left
                    text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200 text-sm
                    ${activeNavItem === view.name ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400" : ""}`}
                  aria-label={view.name}
                >
                  <Icon size={14} />
                  {!collapsed && <span className="whitespace-nowrap">{view.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}