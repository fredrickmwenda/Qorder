import { initializeApp } from 'firebase/app';
import { getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import firebaseConfig from './config';
import { getFirestore, collection, query} from 'firebase/firestore';
import {  where, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { toast } from  'react-hot-toast'

const firebaseConfig = {
  apiKey: "AIzaSyDzfiRUWVodpDseABjr_a2F0UO4hxFUV8s",
  authDomain: "tap4menu-30b19.firebaseapp.com",
  databaseURL: "https://tap4menu-30b19.firebaseio.com",
  projectId: "tap4menu-30b19",
  storageBucket: "tap4menu-30b19.appspot.com",
  messagingSenderId: "893849768512",
  appId: "1:893849768512:web:ea218c4fd046f6cd3005a5",
  measurementId: "G-DTVZPXZ6VS"
};

  
const app = initializeApp(firebaseConfig, 'qorder');
const auth = getAuth(app);
const db = getFirestore(app);
const collections = collection;




// Function to locate the hotel based on hoteluniqueid


export const registerUser = async (email, password, displayName) => {
  try {
    //console.log(name);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: displayName
    });


    // Check if the users collection exists
    const usersRef = collection(db, 'users');

    const querySnapshot = await getDocs(usersRef);
    if (querySnapshot.size === 0) {
      console.log('no user');
      // await setDoc(usersRef.doc('dummy'), {dummy: true});
      await addDoc(usersRef, {dummy: true});
      console.log('Users collection created');
    }

    // Check if the user already exists in the users collection
    const userQuery = query(usersRef, where('userId', '==', user.uid));
    const existingUsers = await getDocs(userQuery);

    if (existingUsers.empty) {
      console.log(displayName);
      console.log(user.uid);
      const userData = {
        userId: user.uid,
        displayName: displayName,
        email: user.email,
        photoURL: user.photoURL || null,
      };
      
      await setDoc(doc(usersRef), userData);
    } else {
      // User already exists in users collection, do nothing
      // console.log('User already exists in users collection');
      toast.error('You already exist in the database')
    }



  } catch (error) {
    console.error(error);
  }
}

export const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}


// Listen for changes to the user authentication state
export const onAuthStateChanged = (callback) => {
    return auth.onAuthStateChanged(callback);
}

// Sign out the current user
export const signOutUser = () => {
  return signOut(auth);
}

//get current logged in user
export const getCurrentUser = () => {
  return auth.currentUser;
}

export { db };
export { collections };






