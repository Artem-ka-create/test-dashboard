'use client';

import React, { ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode; // 'children' is a React node
  session?: any; // or you can specify the type if you know the shape of the session object
}

import { SessionProvider } from 'next-auth/react'
const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider