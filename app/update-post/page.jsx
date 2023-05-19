
'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');


    const [submit,setSubmit] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    useEffect(()=>{
        const getPromptDetail = async () => {
            const response = await fetch (`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if(promptId) getPromptDetail();
    }, [promptId])


    const updatePrompt = async (ev) => {
        ev.preventDefault();
        setSubmit(true);

        if(!promptId) return alert('Prompt ID not found')

        try{
          const response = await fetch(`/api/prompt/${promptId}`,{
              method: 'PATCH',
              body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
              }),
          })
          console.log('update');

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
          type="Edit"
          post={post}
          setPost={setPost}
          submit={submit}
          handleSubmit={updatePrompt}
      />
    )
}

export default UpdatePost
