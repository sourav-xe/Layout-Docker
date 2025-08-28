import React from "react";
import { AlertCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";

const typeConfig = {
  pending: {
    bg: "bg-blue-500/10 dark:bg-blue-900/40",
    text: "text-blue-600 dark:text-blue-300",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  overdue: {
    bg: "bg-red-500/10 dark:bg-red-900/40",
    text: "text-red-600 dark:text-red-300",
    icon: <AlertCircle className="w-6 h-6" />,
  },
  dueToday: {
    bg: "bg-yellow-500/10 dark:bg-yellow-900/40",
    text: "text-yellow-600 dark:text-yellow-300",
    icon: <Clock className="w-6 h-6" />,
  },
  breach: {
    bg: "bg-purple-500/10 dark:bg-purple-900/40",
    text: "text-purple-600 dark:text-purple-300",
    icon: <TrendingUp className="w-6 h-6" />,
  },
};

export default function DashboardCard({ title, value, type }) {
  const config = typeConfig[type];

  return (
    <div className="p-4 rounded-lg shadow-lg bg-gradient-to-br from-white to-neutralLight dark:from-slate-700 dark:to-slate-800 transition transform hover:scale-105 duration-200 cursor-pointer border border-gray-200 dark:border-slate-700">
      <div
        className={`flex items-center justify-between p-4 rounded-xl ${config.bg}`}
      >
        <div>
          <p className={`text-sm font-medium ${config.text}`}>{title}</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {value}
          </h2>
        </div>
        <div className={`${config.text}`}>{config.icon}</div>
      </div>
    </div>
  );
}