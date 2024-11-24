"use client";


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';



const Nav = () => {

  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);


  useEffect(() => {

    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className=' flex justify-between w-full mb-16 pt-3 p-10'>
      <Link href="/" className="flex gap-5 items-center">
        <Image  src={"telekom.svg"} width={50} height={50} alt='Promptopia Logo' />
        <h1>PenTester</h1>
      </Link>

      {/* Mobile nav */}
      <div>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">

            <div className="flex">

              <DropdownMenu>
                <DropdownMenuTrigger>

                  <Image
                    src={session?.user?.image as string}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="profile icon"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-10'>
                  <DropdownMenuItem>

                    <Link href={"/profile"}
                      className="dropdown_link">
                      My Tests
                    </Link>

                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={"run-test"}
                      className="dropdown_link">
                      Run New Test
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Sign-out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>

          </div>
        ) : (
          <div>
            {providers && Object.values(providers).map((provider) => (
              <Button type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                SignIn
              </Button>
            ))}

          </div>
        )
        }
      </div>
    </nav>

  )
}

export default Nav