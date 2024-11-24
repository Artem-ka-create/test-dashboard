import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';

const Profile = ({ testsList }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {testsList && testsList.length > 0 ? (
        testsList.map((test: any) => (
          <Card key={test._id} className="w-[300px]">
            <CardHeader>
              <CardTitle>{test.name || 'Unnamed Test'}</CardTitle>
              <CardDescription>{`#${test.projectName || 'No Project'}`}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2">
                {test.done ? (
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-lg"/>
                  <p>Completed</p>
                </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MdPending className="text-blue-500 text-lg" />
                    <p>Pending ...</p>
                  </div>
                )}
              </div>
              <div className="flex text-gray-400 items-center justify-between">
                <p>{new Date(test.date).toLocaleDateString() || 'No Date'}</p>
                <p>{new Date(test.date).toLocaleTimeString() || 'No Time'}</p>
              </div>
            </CardContent>
            <CardFooter>

                <Link href={`/profile/task/${test._id}`} passHref>
                Detailed Info
              </Link>

            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No tests found...</p>
      )}
    </div>
  );
};

export default Profile;
