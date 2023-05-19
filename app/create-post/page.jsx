
'use client';

import React from 'react';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from "axios";

import Form from '@components/Form';

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();


    const [submit,setSubmit] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });


    const createPost = async (ev) => {
        ev.preventDefault();
        setSubmit(true);

        try{
          const response = await fetch('/api/prompt/new',{
              method: 'POST',
              body: JSON.stringify({
                userId: session?.user.id,
                prompt: post.prompt,
                tag: post.tag,
              }),
          })
          console.log('bbb');

          if(response.ok){
            router.push('/')
          }

        }catch(erorr){
          console.log('aaa');
          console.log(erorr);
        }finally{
          setSubmit(false);
        }
    }

    return (
      <Form 
          type="Create"
          post={post}
          setPost={setPost}
          submit={submit}
          handleSubmit={createPost}
      />
    )
}

export default CreatePost
