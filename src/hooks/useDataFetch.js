import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const useDataFetch = () => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "pins"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDoc(documents);
    });

    return () => unsubscribe();
  }, [collection]);

  return { doc };
};

export default useDataFetch;
