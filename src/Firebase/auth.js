import { initializeApp } from 'firebase/app';
import { getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import firebaseConfig from './config';
import { getFirestore, collection, query} from 'firebase/firestore';
import {  where, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCAq62I57Gg0HvufF-Jc8BOiA9M8veONfA",
    authDomain: "tap4menu-2541a.firebaseapp.com",
    projectId: "tap4menu-2541a",
    storageBucket: "tap4menu-2541a.appspot.com",
    messagingSenderId: "626617995782",
    appId: "1:626617995782:web:f417ecfcc8b41aea106987",
    measurementId: "G-DC0PXF6FN1"
  };

  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const collections = collection;
console.log(collection);







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
      console.log('User already exists in users collection');
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






