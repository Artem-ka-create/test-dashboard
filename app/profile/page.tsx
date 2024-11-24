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
      <h1> Your Tests </h1>
      <div>{session?.user?.email}</div>
      <Profile testsList={tests}/>
    </>
  )
}

export default MyProfile