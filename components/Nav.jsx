"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
  // const isUserLoggedIn = true;
  const {data:session } = useSession();

  const [providers, setProviders] = useState(null);

  // toggle for mobile devices
  const [toggle, setToggel] = useState(false);
  

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);



  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.svg" alt="profile" width={30} height={30}
          className='object-contain'
        />
        <p className='logo_text'>
          Protompia
        </p>
      </Link>

      {/* desktop navigation */}
      <div className='hidden sm:flex '>
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href="/create-post" className='black_btn'>
                  Create Post
                </Link>

                <button type='button' onClick={signOut} className='black_btn'>
                  Sign Out
                </button>

                <Link href="/profile">
                  
                  <Image 
                      src={session?.user.image} alt="profile" width={37} 
                      height={37}
                      className='rounded-full'
                  />
                </Link>
            </div>
          ):(
            <>
              {
                providers && (
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn" 
                    >
                      Sign In
                    </button>
                  ))
                )
              }
            </>
          )
        }

      </div>

      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>     
              {/* jika toggle di klik maka jalankan state */}
              <Image 
                      src={session?.user.image} 
                      alt="profile" width={37} 
                      height={37}
                      className='rounded-full cursor-pointer'
                      onClick={()=> setToggel((prev) => !prev )}
              />

              {/* ketika di klik maka akan jalankan script berikut di ambil dari state togglle */}
              {
                toggle && (
                  <div className='dropdown'>
                    <Link href='/profile' className='dropdown_link' 
                      onClick={()=> setToggel(false)}>
                      My Profile
                    </Link>

                    <Link href='/create-post' className='dropdown_link' 
                    onClick={()=> setToggel(false)}>
                      Create Post
                    </Link>

                    <button type='button' onClick={() => {
                      setToggel(false);
                      signOut();
                    }} className='mt-5 w-full black_btn'>
                      Sign Out
                    </button>
                  </div>
                )
              }
          </div>
          ): (
            <>
              {
                  providers && (
                      Object.values(providers).map((provider) => (
                        <button
                          type="button"
                          key={provider.name}
                          onClick={() => signIn(provider.id)}
                          className="black_btn" 
                        >
                          Sign In
                        </button>
                      ))
                    )
                  }
          </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
