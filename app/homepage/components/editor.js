import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, Alert, Container, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import addDatabase from '@/app/actions/addDatabase';
import updateDatabase from '@/app/actions/updateDatabase';
import { app, auth } from '@/firebaseConfig';


const MyEditor = (proping) => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        reset,
        control,
        setValue, 
        formState: { errors , isSubmitting },
    } = useForm();

    const prevoiusDoc = useRef(proping.data.currentDoc);

    const newNotePressed = useRef(false);

    const currentDoc = proping.data.currentDoc;

    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        setValue("title", currentDoc.title);
        setValue("message", currentDoc.message);
        currentDoc.id === "-1" ? reset() : reset(currentDoc);
        console.log("the editor is rendering again ", currentDoc.id, currentDoc.title, currentDoc.message)
    }, [currentDoc.id]);

    const onsubmit = async (data) => {
        const user = auth.currentUser;
        await new Promise(resolve => setTimeout(resolve, 3000));
        if (currentDoc.id !== "-1") {
          if (data.title !== currentDoc.title || data.message !== currentDoc.message) {
            updateDatabase(data.id, {"userid" : user.uid , "title" : data.title , "message" : data.message} );
          }
          else {
            // console.log("No changes detected");
          }
        }
        else if (currentDoc.id === "-1" && newNotePressed.current){
          const res = await addDatabase({"userid" : user.uid , "title" : data.title , "message" : data.message});
          console.log(res);
          newNotePressed.current = false;
          proping.data.setcurrentdoc({"id": res, "userid" : user.uid , "title" : data.title , "message" : data.message});
        }
    }

    const handleReadOnly = () => {
        setReadOnly(!readOnly);
    };

    const handleNewNote = () => {
      reset({ title: '', message: '' });
      newNotePressed.current = true;
      proping.data.setcurrentdoc({"id": "-1", "title": "Title goes here ...", "message": "And, the message goes here ...", "userid": currentDoc.userid});
  };

  const handleCancel = () => {
    reset(prevoiusDoc.current);
    newNotePressed.current = false;
    proping.data.setcurrentdoc(prevoiusDoc.current);
  }
  

  return (
    <Box sx={{ m: 2 }} className=" w-full" >
      <Container className='flex justify-between py-2'>
        <Button variant="outlined" startIcon={readOnly ?  <LockIcon/>: <LockOpenIcon/>} onClick={handleReadOnly}>
          {readOnly ?  'Read-only' : 'Editable'}
        </Button>
        <Button variant="contained" endIcon={<AddIcon/>} onClick={handleNewNote}>
          New Note
        </Button>
      </Container> 
        <form onSubmit={handleSubmit(onsubmit)} >
            <Controller
                name="title"
                control={control}
                defaultValue="Title goes here ..."
                render={({ field }) => 
                    <TextField
                        {...field}
                        id="title"
                        type="text"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          readOnly: readOnly,
                        }}
                    />
                }
            />
            {errors.title && <Alert severity="error">This field cant be empty.</Alert>}
            {/* <Divider variant="middle" className=' py-2'/> */}
            <Divider variant="middle" className=' my-2'/>
            <Controller
                name="message"
                control={control}
                defaultValue="And, the message goes here ..."
                render={({ field }) => 
                    <TextField
                        {...field}
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          readOnly: readOnly,
                        }}
                    />
                }
            />
            {errors.message && <Alert severity="error">This field cant be empty.</Alert>}
            <Container className='flex mr-0 w-full justify-end py-4'>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || readOnly} >
                  Save
              </Button>
              {newNotePressed.current && <Button variant="outlined" color="secondary" type="reset" onClick={handleCancel}> Cancel </Button>}
            </Container>
        </form>
    </Box>
  );
};

export default MyEditor;
