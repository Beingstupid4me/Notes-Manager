import { database } from "@/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const getNotesByUserId = (userid, setData) => {
  const notesRef = collection(database, "notes");
  const q = query(notesRef, where("userid", "==", userid));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const docsdata = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      docsdata.push({ ...data, id: doc.id });
    });
    setData(docsdata); // update state with new data
  });

  // return the unsubscribe function for cleanup
  return unsubscribe;
}

export default getNotesByUserId;