import { Card, List, Container, ListItem } from '@mui/material'
import React, { useEffect, useState, Suspense } from 'react'
import getNotesByUserId from '@/app/actions/readDatabase'
import { list_of_notes } from '@/app/homepage/page';
import { app, auth } from '@/firebaseConfig'

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const MyCard = React.lazy(() => import('./carding'));

const Sidebar = (proping) => {

 
  const handleNoteClick = (note) => () => {
    proping.data.setcurrentdoc({...note, userid: proping.data.currentDoc.userid});
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    let unsubscribe;
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        delay(3000);
        unsubscribe = getNotesByUserId(user.uid, setData);
        list_of_notes.length = 0;
        list_of_notes.push(...data);
      } else {
        // Handle user being signed out
      }
    });
  
    // Cleanup function
    return () => {
      unsubscribeAuth();
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  

  return (
    <Container className='  w-full px-0' style={{ backgroundColor: 'rgb(243, 202, 82)' }}>
        <List>
          <Suspense fallback={<div>Loading...</div>}>
            {data.map((item) => {
                return (
                    <ListItem key={item.id} id={item.id} onClick={handleNoteClick(item)} >
                        <MyCard imageSrc={"vercel.svg"} title={item.title} description={item.message} className='transform transition duration-500 ease-in-out hover:scale-105 active:scale-95  hover:shadow-lg w-full backface-visibility-hidden'/>
                    </ListItem>
                )
            })}
            <ListItem>
              <MyCard imageSrc={"vercel.svg"} title='Title1' description='Description' />
            </ListItem>
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>
            <ListItem>
              <MyCard title='Title3' description='Description' />
            </ListItem>
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>            
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>            
            <ListItem>
              <MyCard title='Title2' description='Description' />
            </ListItem>
          </Suspense>
        </List>
    </Container>
  )
}

export default Sidebar
