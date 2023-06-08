// import { Fragment, useState } from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";

import "./Style.css";
import { getCurrentUser, db } from '../Firebase/auth';






export default function Cart({cart, useCart}) {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const user = getCurrentUser();
  useEffect(() => {
    if (user) {
      console.log(user.uid);
      const cartRef = collection(db, "cart");
      const querySet = query(cartRef, where("userId", "==", user.uid))
      // query(cartRef, where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(querySet, (snapshot) =>
        //console.log(snapshot.docs.map((doc) => doc.data()))
        setCartItems(snapshot.docs.map((doc) => doc.data()))
      );
      return unsubscribe;
    }
  }, [user])
  console.log(cartItems.length ? cartItems : "Cart is empty");

  const removeFromCart = async (productId) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex((item) => item.id === productId);

    if (productIndex >= 0) {
      const product = updatedCart[productIndex];

      if (product.quantity === 1) {
        updatedCart.splice(productIndex, 1);
      } else {
        updatedCart[productIndex].quantity -= 1;
      }

      // Update the cart in the database
      const cartRef = doc(collection(db, "cart"), user.uid);
      // doc(collection(db, "cart"), user.uid);
      await updateDoc(cartRef, { products: updatedCart });
    }
  }
  


  


  return (
    
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 mb-3">
          <div className="container cont">

          </div>
           <div className='flex'>
          <section className="w-1/2 p-4" >
            <div className="mt-3"><h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Shopping Cart</h1>

              {/* <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2> */}
            </div>

            <div className="mt-8">
              <div className="flow-root">
              {cartItems.length > 0 && (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems[0].products.reduce((acc, item) => {
                  const existingItem = acc.find((i) => i.id === item.id);
                  if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.totalPrice += Number(item.price.replace(',', ''));
                    // existingItem.totalPrice += item.price;
                  } else {
                    acc.push({ ...item, quantity: 1, totalPrice: Number(item.price.replace(',', '')) });
                    // acc.push({ ...item, quantity: 1, totalPrice: item.price });
                  }
                  return acc;
                }, []).map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg"
                        alt
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          {/* <p className="ml-4">{item.totalPrice}</p> */}
                          <h3>{item.quantity * Number(item.price.replace(",", ""))}</h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.quantity * Number(item.price.replace(",", ""))}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

                </ul>
              )}
              </div>
            </div>
          </section>
          
          
          <section className="w-1/2 p-4">
            {/* <div className='mt-3'></div> */}
            {cartItems.length > 0 && (
            <div className="px-4 py-6 sm:px-6 lg:mt-16 bg-gray-100 shadow-lg">
              <p className="text-sm text-gray-500">QTY items ordered: {cartItems[0].totalQuantity}</p> 

              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                {/* <p> Ksh {total(cart.price)} </p> */}
                <p>Ksh {cartItems[0].totalPrice}</p>
                {/* <p>$122.00</p> */}
              </div>
              <div className="mt-6">
                <Link to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                    <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate('/')}
                  >
                     Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
            )}
          </section>
          </div>
        </div>
      
    
  )
}
