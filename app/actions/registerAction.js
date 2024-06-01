import {  createUserWithEmailAndPassword  } from "firebase/auth";
import { app, auth } from "@/firebaseConfig";


export async function registerAction(data) {
    console.log('registerAction');
    console.log(data);
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
        //    Signed in
        const user = userCredential.user;
        // console.log('----------------------------------');
        // console.log(user);
        // ...
        console.log('----------------------------------');
        console.log(auth);
        return { status: 200, userid: user.uid }; // Return the uid of the signed-in user
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('----------------------------------');
        console.log(errorCode, errorMessage);
        return { status: 400, message: errorMessage }; // Return an object with the status and message
        });
}