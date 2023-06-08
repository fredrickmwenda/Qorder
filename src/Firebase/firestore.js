import firebase from 'firebase';
import { getFirestore } from 'firebase/firestore';
// import { firebaseConfig } from './config';
const firebaseConfig = {
  apiKey: "AIzaSyCAq62I57Gg0HvufF-Jc8BOiA9M8veONfA",
  authDomain: "tap4menu-2541a.firebaseapp.com",
  projectId: "tap4menu-2541a",
  storageBucket: "tap4menu-2541a.appspot.com",
  messagingSenderId: "626617995782",
  appId: "1:626617995782:web:f417ecfcc8b41aea106987",
  measurementId: "G-DC0PXF6FN1"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to the Firestore database
const dataDB = firebase.firestore();

export default dataDB;

// Function to send data to Firestore
// const sendDataToFirestore = (data) => {
//   // Add the data to the "restaurants" collection in Firestore
//   db.collection("restaurants").add({
//     name: data.name,
//     location: data.location,
//     rating: data.rating
//   })
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   });
// };



// import {onSnapshot, collection} from  '@firebse/firestore';
// getData(); gets data once from firebase
//onSnapshot(); listens for realtime updates
//anytime we use useEffect have an empty array
// useEffect(() => onSnapshot(collection(db, "name of the database"), (snapshot) => 
//       // map every single document
//     console.log(snapshot.docs.map((doc) => doc.data()));
// use of spread operator
// console.log(snapshot.docs.map((doc) => doc.data())));
//   ), []);
