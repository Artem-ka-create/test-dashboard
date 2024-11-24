'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Histogram from '@/app/components/Histgram';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaCheckCircle } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import DoughnutChart from '@/app/components/DoughnutChart';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
const attackList = ['SQL', 'BriteForce Atack', 'XSS', 'SiteMappping', 'DDOS']
const attackNumbers = [10, 40, 10, 53, 3]


const attackData = [
  {
    attackName: 'SQL Injection',
    count: 23, // Total tests
    subAttacks: [
      { attackName: 'Blind SQL', count: 10, status: true }, // Passed
      { attackName: 'Classic', count: 5, status: false }, // Failed
      { attackName: 'Dumping DB', count: 8, status: true }, // Passed
    ],
  },
  {
    attackName: 'BruteForce Attack',
    count: 18,
    subAttacks: [
      { attackName: 'Auth', count: 8, status: true },
      { attackName: 'Cryptography', count: 5, status: false },
      { attackName: 'Dictionary Attack', count: 5, status: false },
    ],
  },
  {
    attackName: 'XSS',
    count: 30,
    subAttacks: [
      { attackName: 'DOM', count: 10, status: true },
      { attackName: 'Reflected', count: 10, status: false },
      { attackName: 'API', count: 10, status: false },
    ],
  },
  {
    attackName: 'Site Mapping',
    count: 15,
    status: true, // Overall status if there are no sub-attacks
    subAttacks: [], // No sub-attacks
  },
  {
    attackName: 'DDOS',
    count: 40,
    status: false, // Overall status if there are no sub-attacks
    subAttacks: [], // No sub-attacks
  },
];


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

      <Card style={{ borderColor: '#e20074'}} className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{task.name}</CardTitle>
          <CardDescription>#{task.projectName}</CardDescription>
        </CardHeader>
        <CardContent>

        <div className="flex items-center gap-4 mb-4">
            {task.done ? (
              <>
                <FaCheckCircle className="text-green-500 text-2xl" />
                <span className="text-green-600 font-semibold text-lg">Completed</span>
              </>
            ) : (
              <>
                <MdPending className="text-blue-500 text-2xl" />
                <span className="text-blue-600 font-semibold text-lg">Pending</span>
              </>
            )}
          </div>
          <div className="text-gray-400 flex items-center justify-between">
            <p className="text-lg mb-2">
              {new Date(task.date).toLocaleDateString()}
            </p>
            <p className="text-lg mb-4">
              {new Date(task.date).toLocaleTimeString()}
            </p>
          </div>

          {task.url && (
            <p className="mb-6">
              <strong>URL:</strong>{' '}
              <a href={task.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {task.url}
              </a>
            </p>
          )}
        </CardContent>


      </Card>


      <h1 className="text-lg font-bold flex justify-center m-6">Provided Exploits</h1>


      <Accordion type="single" collapsible className="w-full">
        {attackData.map((attack, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex justify-between items-center w-full">
                <span>
                  {attack.attackName} (Count: {attack.count})
                </span>
                <div className="flex items-center gap-2">
                  {attack.status ? (
                    <>
                      <FaCheckCircle className="text-green-500 text-lg" />
                      <p className="text-sm text-green-600">Completed</p>
                    </>
                  ) : (
                    <>
                      <MdPending className="text-blue-500 text-lg" />
                      <p className="text-sm text-blue-600">Pending</p>
                    </>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {attack.subAttacks.length > 0 ? (
                <>
                  <ul className="ml-4 list-disc mb-4">
                    {attack.subAttacks.map((subAttack, subIndex) => (
                      <li key={subIndex} className="mb-2 flex justify-between items-center">
                        <span>
                          {subAttack.attackName} (Count: {subAttack.count})
                        </span>
                        <div className="flex items-center gap-2">
                          {subAttack.status ? (
                            <>
                              <FaCheckCircle className="text-green-500 text-lg" />
                              <p className="text-sm text-green-600">Completed</p>
                            </>
                          ) : (
                            <>
                              <MdPending className="text-blue-500 text-lg" />
                              <p className="text-sm text-blue-600">Pending</p>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* Histogram for sub-attacks */}
                  <h3 className="text-md font-semibold mb-2">Sub-Attack Statistics</h3>
                  <Histogram
                    labels={attack.subAttacks.map((sub) => sub.attackName)}
                    data={attack.subAttacks.map((sub) => sub.count)}
                    title={`${attack.attackName} Sub-Attacks`}
                  />
                </>
              ) : (
                <p>No sub-attacks available.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>



      <h1 className="text-lg font-bold flex justify-center m-6">General Statistic</h1>

      <Histogram labels={attackList} data={attackNumbers} title="Passed exploits number" />

      <h1 className="text-lg font-bold flex justify-center m-6">Attack Overview</h1>
      <DoughnutChart attackData={attackData} />

      <Button className=" mt-10 w-full flex justify-center">
        Download Report
      </Button>
    </div>
  );
};

export default TaskDetail;
