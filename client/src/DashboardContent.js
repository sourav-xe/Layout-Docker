import React from 'react';
import DashboardCard from './DashboardCard';
import TasksTable from './TasksTable'; // Import the TasksTable component

function DashboardContent() {
  const cardsData = [
    { title: 'Pending Tasks', value: 60, type: 'pending' },
    { title: 'Overdue Tasks', value: 56, type: 'overdue' },
    { title: 'Due For Today', value: 0, type: 'dueToday' },
    { title: 'Approaching Breach Tasks', value: 1, type: 'breach' },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
    Task List Overview
  </h2>
  <TasksTable />
</div>

    </div>
  );
}

export default DashboardContent;
