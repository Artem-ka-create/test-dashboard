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
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" version="1.1" viewBox="0 0 76.728 91.282">
          <g transform="matrix(.2857 0 0 .2857 71.408 28.262)" fill="#e20074">
            <path d="m-33.599 218.73v-22.192h-15.256c-26.315 0-38.393-15.643-38.393-38.665v-232.6h4.5246c49.283 0 80.582 32.707 80.582 80.797v4.3092h18.745v-107.3h-264.58v107.3h18.745v-4.3092c0-48.09 31.298-80.797 80.582-80.797h4.5246v232.6c0 23.022-12.078 38.665-38.393 38.665h-15.256v22.192z" />
            <path d="m16.603 111.43h-62.914v-63.129h62.914z" />
            <path d="m-185.07 111.43h-62.914v-63.129h62.914z" />
          </g>
        </svg>
        {/* <Image  src={"telekom.svg"} width={50} height={50} alt='Promptopia Logo' /> */}
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