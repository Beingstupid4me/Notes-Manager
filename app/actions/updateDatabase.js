import React from 'react';
import { database } from "@/firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore";

const updateDatabase = (docId, newValue) => {
    const datRef = doc(database, "notes", docId);
    updateDoc(datRef, newValue)
    .then(() => {
        console.log("Document updated with ID: ", docId);
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
}

export default updateDatabase;
