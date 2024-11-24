"use client";

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile';

const MyProfile = () => {

  const { data: session } = useSession();
  const [tests, setTests] = useState();

  const fetchPosts = async () => {

    const response = await fetch("/api/test");
    console.log(response);

    const data = await response.json();

    setTests(data);

  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl"> Your Tests </h1>
        <div className="text-gray-600 mt-5 mb-3">{session?.user?.email}</div>
      </div>

      <Profile testsList={tests} />
    </>
  )
}

export default MyProfile