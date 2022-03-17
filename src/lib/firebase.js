import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import env from "react-dotenv";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);

export async function createPost(values) {
  const docRef = await addDoc(collection(db, "pins"), {
    latitude: values.latitude,
    longitude: values.longitude,
    shape: values.shape,
    name: values.name,
    altname: values.altname,
    altitude: values.altitude,
    keystoneone: values.keystoneone,
    keystonetwo: values.keystonetwo,
    notes: values.notes,
  });
  console.log(docRef);
}

export async function getPosts() {
  // Initialize an empty array to retrieve results
  const result = [];
  try {
    // Query to retrieve posts where isOnline is true && order by most recent dates
    const q = query(collection(db, "pins"));

    const querySnapshots = await getDocs(q);
    querySnapshots.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
  return result;
}

export async function deletePost(pinId) {
  await deleteDoc(doc(db, `pins/${pinId}`));
}
