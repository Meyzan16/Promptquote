'use client';

import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const {data:session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied,setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };


  return (
      <div className='flex-1 mt-12 bg-clip-padding rounded-lg border
       border-gray-300 bg-white/20 py-4 px-6 md:px-4 backdrop-blur-lg backdrop-filter '>
        
        <div className='flex justify-between items-start gap-5'>
          <div className='flex justify-start items-center  cursor-pointer gap-4 md:gap-2'>
              <Image 
                src={post.creator.image}
                alt="user_image"
                width={40}
                height={40}
                className='rounded-full object-contain'
              />

              <div className='flex flex-col'>
                <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
                <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
              </div>

              <div className='copy_btn' onClick={handleCopy}>
                <Image 
                  src={
                    copied === post.prompt
                      ? "/assets/icons/tick.svg"
                      : "/assets/icons/copy.svg"
                  }
                  width={12}
                  alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                  height={12}
                />
              </div>
          </div>
        </div>

        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p className='font-inter text-sm blue_gradient cursor-pointer'
              onClick={() => handleTagClick && handleTagClick(post.tag)} >
              #{post.tag}
        </p>

        {
          session?.user.id === post.creator._id && pathName === '/profile' &&
          (
            <div className='mt-5 flex gap-2 justify-center border-t border-gray-300 pt-3'>
                <p className='font-inter text-sm green_gradient cursor-pointer'
                  onClick={handleEdit}>
                  Edit
                </p>
                <p className='font-inter text-sm orange_gradient cursor-pointer'
                  onClick={handleDelete}>
                  Delete
                </p>
            </div>
          )
        }

      </div>


  )
}

export default PromptCard
