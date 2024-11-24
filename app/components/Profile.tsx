import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';

const Profile = ({ testsList }) => {
  return (

    <>
      <div className="w-[50%] m-auto">

        <Input style={{ borderColor: '#e20074' }} className="mb-5" type="text" placeholder="Search" />

        <div className="mb-5 flex items-center justify-between">
          <Button variant={'outline'}>Filter</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View Configuration</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                Sort By Name
              </DropdownMenuItem>
              <DropdownMenuItem>
                Sort By Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                Sort By Status
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <hr className="mb-5" />

      <div className="flex flex-wrap justify-center gap-4">
        {testsList && testsList.length > 0 ? (
          testsList.map((test: any) => (
            <Card style={{ borderColor: '#e20074' }} key={test._id} className="w-[300px]">
              <CardHeader>
                <CardTitle>{test.name || 'Unnamed Test'}</CardTitle>
                <CardDescription>{`#${test.projectName || 'No Project'}`}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  {test.done ? (
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-lg" />
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

                <Link
                  href={`/profile/task/${test._id}`}
                  passHref
                  className=" w-full text-center inline-block px-6 py-2 text-sm font-medium border rounded-lg border-[#e20074] text-[#e20074] transition-all duration-300 hover:bg-[#e20074] hover:text-white"
                >
                  Detailed Info
                </Link>

              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No tests found...</p>
        )}
      </div>
    </>

  );
};

export default Profile;
