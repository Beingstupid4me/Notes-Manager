"use client";
import { Container, Button, TextField, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
import MyEditor from './components/editor';
import { app, auth } from '@/firebaseConfig';


export let list_of_notes = [];

const Page = () => {
  const router = useRouter();

  const [currentDoc, setcurrentdoc] = useState({
    "title": "Title goes here ...",
    "message": "And, the message goes here ...",
    "id": "-1",
    "userid": null
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("User of main-page :", user);
      console.log("Auth of page :", auth);
      if (user) {
        setcurrentdoc(prevDoc => ({ ...prevDoc, userid: user.uid }));
      } else {
        setcurrentdoc(prevDoc => ({ ...prevDoc, userid: null }));
        router.push('/authentication/login');
      }
    });
    return () => unsubscribe();
  }, []); 

  return (
    <Container className=' flex flex-row px-0 w-full ' style={{"marginLeft": "0"}}>
      <Container className='w-1/4 h-screen overflow-y-auto px-0'>
        <Sidebar data={{currentDoc,setcurrentdoc}} />
      </Container>
      <Container className='w-3/4' >
        <MyEditor className="w-full h-1/2" data={{currentDoc,setcurrentdoc}} />
      </Container>
    </Container>
  )
}

export default Page;
