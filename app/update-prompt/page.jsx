'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const Editprompt = () => {

  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');



  useEffect(() => {
    const getprompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }
    if (promptId) getprompt();
  }, [promptId])



  const updateprompt = async (e) => {
    e.preventDefault();
    // console.log(e)
    setIsSubmitting(true);


    if(!promptId) return alert('Prompt ID not found');
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {

        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }

    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateprompt}
    />
  );
};





export default Editprompt
