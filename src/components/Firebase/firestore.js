import { getCurrentUser, db, collections } from './auth';
import { collection, query, where, getDocs, addDoc, setDoc, doc, updateDoc, getDoc, onSnapshot,collectionGroup  } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

const hotelsCollection = collection(db, 'hotels');


export const locateHotel = async (hoteluniqueid, storeuniqueid) => {
  try {
    const hotelQuery = query(hotelsCollection, where('hoteluniqueid', '==', hoteluniqueid));
    const hotelsSnapshot = await getDocs(hotelQuery);
    console.log(hotelsSnapshot)

    if (hotelsSnapshot.empty) {
      console.log('No hotel found with the provided hoteluniqueid');
      toast.error('No hotel found with the id', {
        duration: 4000,
        position: 'top-right',
      
        // Styling
        style: {},
        className: '',
      
        // Custom Icon
        icon: '👏',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      })
      return null;
    }

    const hotel = hotelsSnapshot.docs[0].data();
    console.log('Hotel:', hotel);
    const hotelDoc = hotelsSnapshot.docs[0];
   

    const storeLocationQuery = query(collection(hotelDoc.ref, 'storelocations'), where('storeuniqueid', '==', storeuniqueid));
    const storeLocationSnapshot = await getDocs(storeLocationQuery);
    console.log(storeLocationSnapshot);

    // const storeRef = collection(db, 'storelocations');
    // const storeLocationQuery = query(storeRef, where('storeuniqueid', '==', storeuniqueid));
    // const storeLocationSnapshot = await getDocs(storeLocationQuery);
    // console.log(storeLocationSnapshot);
    
    if (storeLocationSnapshot.empty) {
      console.log('No store location found with the provided storeUniqueId');
      toast.error('No store location found ', {
        duration: 4000,
        position: 'top-right',
        // Styling
        style: {},
        className: '',
        // Custom Icon
        icon: '👏',
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return null;
    } 

    const storeLocation = storeLocationSnapshot.docs[0].data();
    console.log('Store Location:', storeLocation);
    return { hotel, storeLocation };
    


  } catch (error) {
    console.error('Error locating hotel:', error);
    toast.error('Error locating hotel:', error);
    return null;
  }
};

export const checkCollectionExists = async (parentCollection, nestedCollection) => {
  try {
    const parentQuerySnapshot = await getDocs(collection(db, parentCollection));
    const documents = [];

    await Promise.all(parentQuerySnapshot.docs.map(async (parentDoc) => {
      const nestedCollectionRef = collection(parentDoc.ref, nestedCollection);
      const nestedQuerySnapshot = await getDocs(nestedCollectionRef);

      nestedQuerySnapshot.forEach((nestedDoc) => {
        documents.push(nestedDoc.data());
      });
    }));

    return documents;
  } catch (error) {
    console.error('Error checking collection:', error);
    return [];
  }
};

// export const majoryCategories = async(hoteluniqueid, storeuniqueid) => {
//   try {
//     const hotelQuery = query(hotelsCollection, where('hoteluniqueid', '==', hoteluniqueid));
//     const hotelsSnapshot = await getDocs(hotelQuery);
//     const hotelDoc = hotelsSnapshot.docs[0];
//     const storeLocationQuery = query(collection(hotelDoc.ref, 'storelocations'), where('storeuniqueid', '==', storeuniqueid));
//     const storeLocationSnapshot = await getDocs(storeLocationQuery);

//     const storeLocationDoc = storeLocationSnapshot.docs[0];
//     const majorCategoriesRef = collection(hotelDoc.ref, 'storelocations', storeLocationDoc.id, 'majorcategories');

//     const unsubscribe = onSnapshot(majorCategoriesRef, (snapshot) => {
//       const categories = [];
//       snapshot.forEach((doc) => {
//         categories.push(doc.data());
//       });

//       // Do something with the updated categories array
//       console.log('Updated Categories:', categories);
//     });

//     // Return the unsubscribe function
//     return unsubscribe;
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error('Error locating the hotel:', error);
//     toast.error('Error locating the hotel', {
//       // Error handling options
//     });
//     return null;
//   }
// };

export const majoryCategories = async (hoteluniqueid, storeuniqueid) => {
  try {
    const hotelQuery = query(hotelsCollection, where('hoteluniqueid', '==', hoteluniqueid));
    const hotelsSnapshot = await getDocs(hotelQuery);
    const hotelDoc = hotelsSnapshot.docs[0];
    const storeLocationQuery = query(collection(hotelDoc.ref, 'storelocations'), where('storeuniqueid', '==', storeuniqueid));
    const storeLocationSnapshot = await getDocs(storeLocationQuery);

    const storeLocationDoc = storeLocationSnapshot.docs[0];
    const majorCategoriesRef = collection(hotelDoc.ref, 'storelocations', storeLocationDoc.id, 'majorcategories');

    const majorCategoriesQuery = query(majorCategoriesRef);
    const categoriesSnapshot = await getDocs(majorCategoriesQuery);

    const categories = [];
    categoriesSnapshot.forEach((doc) => {
      categories.push(doc.data());
    });

    // Do something with the categories array
    console.log('Categories:', categories);

    return categories;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error locating the hotel:', error);
    toast.error('Error locating the hotel', {
      // Error handling options
    });
    return null;
  }
};




