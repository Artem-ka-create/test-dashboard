"use client";

import { useSession } from 'next-auth/react';
import React from 'react'

const MyProfile = () => {

    const {data: session} = useSession();

  return (
    <div>{session?.user?.email}</div>
  )
}

export default MyProfile