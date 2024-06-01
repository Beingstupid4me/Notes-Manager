import React from 'react'
import { database } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const addDatabase = async (data) => {
    const datRef = collection(database, "notes");
    try {
        const docRef = await addDoc(datRef, {
            userid : data.userid,
            title : data.title,
            message : data.message
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // return the id of the new document
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export default addDatabase;
