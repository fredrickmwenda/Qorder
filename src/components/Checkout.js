import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser, db } from '../Firebase/auth';
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import "./Style.css";


export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const user = getCurrentUser();


    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };

    
    useEffect(() => {
      if (user) {
        console.log(user.uid);
        const cartRef = collection(db, "cart");
        const querySet = query(cartRef, where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(querySet, (snapshot) => {
          setCartItems(snapshot.docs.map((doc) => doc.data()));
        });
    
        return unsubscribe;
      }
    }, [user]);

    useEffect(() => {
        const getAccessToken = async () => {
            // ... code for generating access token
            const consumerKey = 'YourConsumerKey';
            const consumerSecret = 'YourConsumerSecret';
          
            const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
          
            const headers = {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/json',
            };
          
            const response = await axios.get(
                'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
                { headers }
            );
          
            return response.data.access_token;
        };

        const generatePassword = (businessShortCode, passkey, timestamp) => {
          const str = businessShortCode + passkey + timestamp;
          const buffer = Buffer.from(str, 'utf-8');
          return buffer.toString('base64');
        }
        
        const getTimestamp = () => {
            const date = new Date();
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
          
            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        const registerURL = async () => {
            // ... code for registering URL
            const accessToken = await getAccessToken();
  
            const data = {
                ShortCode: 'YourBusinessShortCode',
                ResponseType: 'Completed',
                ConfirmationURL: 'YourConfirmationURL',
                ValidationURL: 'YourValidationURL',
            };
          
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
          
            const response = await axios.post(
                'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
                data,
                { headers }
            );
          
            return response.data;
        };

        const initiateStkPush = async(phoneNumber, amount) => {
            //create a function to  generate the accessToken
            const accessToken = await getAccessToken();
            const timestamp = getTimestamp();
            const password = generatePassword(process.env.BUSINESS_SHORTCODE, process.env.PASSKEY, timestamp);
          
            const data = {
                BusinessShortCode: process.env.BUSINESS_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                Amount :amount,
                PartyA: phoneNumber,
                partyB: process.env.BUSINESS_SHORTCODE,
                PhoneNumber: phoneNumber,
                CallBackURL: process.env.CALLBACK_URL,
                AccountReference: 'Account Reference',
                TransactionDesc: 'Transaction Description'
            }

            const headers = {
                Authorization : `Bearer ${accessToken}`,
                'Content_type': 'application/json',
            }
            //use demo stk push before the live to test it
            const response = await axios.post(
                'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
                data,
                { headers}
            );

            return response.data;
        }

        const performCheckout = async () => {
            const phoneNumber = 'YourPhoneNumber';
            const amount = 100; // Example amount

            try {
                const accessToken = await getAccessToken();
                // Store the accessToken in your component state or perform further operations

                const registrationResponse = await registerURL();
                // Handle the registration response as needed

                const stkPushResponse = await initiateStkPush(phoneNumber, amount);
                // Handle the STK push response as needed
            } catch (error) {
                // Handle any errors that occur during the process
            }
        };       
        performCheckout();
    }, []);

    return (
      <div className='mx-auto container pt-16 pb-16'>
        <div className="flex">
          <div className="w-1/2 bg-gray-200 p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Mpesa Payment</h2>
              {/* Add your contact information form here */}
              {/* className="mx-auto mt-16 max-w-xl sm:mt-20" */}
              <form  method="POST" className="mx-auto  max-w-xl">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                  <div className="sm:col-span-2">
                    {/* <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                      Address
                    </label> */}
                    <div className="mt-2.5">
                      <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder='0712345678'
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required/>
                    </div>
                  </div>

                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
            {/* <hr class="border-4 border-black cursor-pointer hover:border-red-500 duration-500" />
            <div className="mt-3">
              <h2 className="text-xl font-bold">Payment Method</h2>
              <div className="payment-buttons-container">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2" onClick={() => handlePaymentSelection("mpesa")}>M-Pesa</button>
                <button  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2" onClick={() => handlePaymentSelection("visa")}>Visa</button>
                <button   className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2" onClick={() => handlePaymentSelection("paypal")}>PayPal</button>
              </div>
            </div> */}
          </div>
          <div className="w-1/2 bg-green-600 p-4">
            <h2 className="text-xl font-bold">Cart Items</h2>
            {cartItems.length > 0 && (           
              <ul role="list" >
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
                  <li key={item.id} className="items-start flex py-6 border-b border-black">
                    <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg" alt="Front of zip tote bag with white canvas, white handles, and black drawstring top." className="object-cover object-center rounded-md w-20 h-20"></img>
                    <div className="flex-auto">
                      <h3 class="text-white">{item.name}</h3>
                      <p>{item.quantity}</p>

                    </div>
                    <p class="text-base font-medium text-white">{item.quantity * Number(item.price.replace(",", ""))}</p>

                  </li>

                  ))}
              {/* Add your cart items as list items here */}
              
              </ul>
            )}
            <dl class="text-sm pt-6">
            {cartItems.length > 0 && (
              <div class="flex justify-between">
                <dt class="text-base text-white">Total</dt>
                <dd class="text-base text-white">Ksh {cartItems[0].totalPrice}</dd>
              </div>
            )}
            </dl>
           </div>
        </div>

      </div>
 
      );

    

}
  