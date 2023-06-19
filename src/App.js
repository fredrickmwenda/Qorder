import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, getCurrentUser, db, collections } from './Firebase/auth'; // import default export
import { collection, query, where, getDocs, addDoc, setDoc, doc, updateDoc  } from 'firebase/firestore';

// pages
import Footer from './components/Footer.js'
import NavBar from './components/NaviBar'
import Login from './components/Login'
import Register from './components/Register'
import Restaurant from './components/Restaurant'
import Wishlist from './components/Wishlist'
import Enquiry from  './components/Enquiry'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Item from './components/Item';
import OrderHistory from './components/OrderHistory';
import QRScannerComponent from './components/QRCodeScanner';
import NotFound from './components/NotFound';
import { Toaster } from 'react-hot-toast';


function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  const [cart, setCart] = useState([]);

  const user = getCurrentUser;

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        console.log('logged in');
      } else {
        setLoggedIn(false);
        localStorage.removeItem('loggedIn');
        console.log('not logged in');
      }
    });
  }, []);

  const addToCart = async (item) => {
    console.log('cart via');
    if(loggedIn){
      setCart([...cart, item]);
      console.log('logged in')
      try {   
        const user = getCurrentUser(); 
        if(user){        
        console.log(user.uid);
        const cartRef = collection(db, 'cart');
        const querySnapshot = await getDocs(cartRef);
        if (querySnapshot.size === 0) {
          console.log('no user');
          // await setDoc(usersRef.doc('dummy'), {dummy: true});
          await addDoc(cartRef, {dummy: true});
          console.log('Cart collection created');
        }

        const userCartQuery = query(cartRef, where('userId', '==', user.uid));
        const existingUserCart = await getDocs(userCartQuery);
        if(existingUserCart.empty){
          //create a cart for the user
          const newCartData = {
            //name: item.name,
            totalPrice: Number(item.price.replace(",", "")),
            totalQuantity: 1,
            userId: user.uid,
            products: [item],
          };
          await setDoc(doc(cartRef), newCartData);
        } else{
          const cartDocRef = doc(cartRef, existingUserCart.docs[0].id); // get the reference to the existing cart document
          const cartData = existingUserCart.docs[0].data();
          console.log("cartData before:", cartData.totalPrice); // log the value of cartData before the addition
          console.log("item.price:", item.price); // log the value of item.price
          const updatedCartData = {
            // totalPrice: cartData.totalPrice + item.price,
            totalPrice: cartData.totalPrice + Number(item.price.replace(",", "")),
            // totalPrice: parseFloat(cartData.totalPrice) + parseFloat(item.price),
            totalQuantity: cartData.totalQuantity + 1,
            products: [...cartData.products, item],
          };
          await updateDoc(cartDocRef, updatedCartData);
        } 
      }else{
        console.log('user is not found', user)

      }      
      } catch (error) {
        console.error(error);
      }


    } else{
      setCart([...cart, item]);
    }
  };

  return (
    <div className="App">

      {loggedIn ? (
        <>
          {/* Your protected pages */}
          
          <Router>
            <Routes>
              <Route path="*" element={<NotFound />}> </Route>
              <Route exact path='/' element={<QRScannerComponent/>}> </Route>
              <Route  path="/home" element={<Restaurant addToCart={addToCart} />}> </Route>
              <Route path="/meal/:id" element={<Item addToCart={addToCart} />} />
              <Route path="/orderhistory" element={<OrderHistory/>}></Route>
              <Route path="/wishlist" element={<Wishlist addToCart={addToCart}/>}> </Route>
              <Route path="/enquiry" element={<Enquiry />}> </Route>
              <Route path="/checkout" element={<Checkout />}> </Route>
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}> </Route>
            </Routes>
            {window.location.pathname !== '/' && <Footer isLoggedIn={true} cart={cart}/>}
            <Toaster/> 
          </Router>
          
        </>
      
      ) : (
        <>
         
          
          <Router>
            <Routes>
            <Route exact path='/' element={<QRScannerComponent/>}> </Route>
              <Route  path="/home" element={<Restaurant addToCart={addToCart} />}> </Route>
              <Route path="/meal/:id" element={<Item addToCart={addToCart} />} />
              <Route path="/login" element={<Login />}> </Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/wishlist" element={<Wishlist  addToCart={addToCart}/>}> </Route>
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}> </Route>
              <Route path="/enquiry" element={<Enquiry />}> </Route>
            </Routes>
            {window.location.pathname !== '/' && <Footer isLoggedIn={false} cart={cart}/>}
            <Toaster/> 
          </Router>
          

        </>
      )}
    </div>
  );
}

export default App;
