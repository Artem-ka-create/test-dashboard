'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Task {
  _id: string;
  name: string;
  projectName: string;
  done: boolean;
  date: string;
  csvData: string;
  url?: string;
}

const TaskDetail = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); // Extract the dynamic segment (id)

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        const response = await fetch(`/api/test/${id}`);
        const data = await response.json();
        console.log(data);
        setTask(data);
      };

      fetchTaskDetails();
    }
  }, [id]);

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  // Sample chart data (replace with real data if applicable)
  const chartData = {
    labels: ['Task Progress'],
    datasets: [
      {
        label: 'Completion Status',
        data: [task.done ? 100 : 0],
        backgroundColor: task.done ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)',
        borderColor: task.done ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const handleDownloadReport = () => {
    const blob = new Blob([task.csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${task.name}_report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
      <p className="text-lg text-gray-600 mb-2">
        <strong>Project:</strong> {task.projectName}
      </p>
      <p className="text-lg mb-2">
        <strong>Status:</strong>{' '}
        <span className={`font-semibold ${task.done ? 'text-green-600' : 'text-red-600'}`}>
          {task.done ? 'Completed' : 'Pending'}
        </span>
      </p>
      <p className="text-lg mb-2">
        <strong>Date:</strong> {new Date(task.date).toLocaleDateString()}
      </p>
      <p className="text-lg mb-4">
        <strong>Time:</strong> {new Date(task.date).toLocaleTimeString()}
      </p>
      {task.url && (
        <p className="mb-6">
          <strong>URL:</strong>{' '}
          <a href={task.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {task.url}
          </a>
        </p>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Progress</h2>
        <div className="w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <button
        onClick={handleDownloadReport}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Download Report
      </button>
    </div>
  );
};

export default TaskDetail;
