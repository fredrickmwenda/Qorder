import React from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, HeartIcon, HomeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser, getCurrentUser, onAuthStateChanged, } from '../Firebase/auth';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'Enquiry', to: '/enquiry', current: false },
  { name: 'Wishlist', to: '/wishlist', current: false },
  // { name: 'Calendar', href: '#', current: false },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Footer({ isLoggedIn, cart }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const user = getCurrentUser();
  //   setCurrentUser(user);
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  
    return unsubscribe;
  }, []);

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login', { state: { message: 'Please log in to view your cart.' } });
    }
  };

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        console.log('you have been Successfully Logged out')
        // Do something after the user is logged out
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <footer class="fixed w-full bottom-0 bg-indigo-900" >
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="./logo.png"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="./logo.png"
                alt="Your Company"
              />
            </div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-green-900 text-white' : 'text-gray-300 hover:bg-green-700 hover:text-white',
                      'rounded-md px-3 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name === 'Home' && <HomeIcon className="mr-1" />} {/* Display the Home icon */}
                    {item.name === 'Enquiry' && <InformationCircleIcon className="mr-1" />} {/* Display the Feedback icon */}
                    {item.name === 'Wishlist' && <HeartIcon className="mr-1" />} {/* Display the Favorite icon */}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              // onClick={() => navigate('/cart')}
              onClick={handleCartClick}
              >
              {/* <span className="sr-only">View notifications</span> */}
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              {cart.length > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Profile dropdown */}
            {isLoggedIn && (
            <Menu as="div" className="relative ml-3">
            
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  {currentUser && currentUser.photoURL ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                        {currentUser && currentUser.displayName ? currentUser.displayName.charAt(0) : ""}
                      </div>
                    )}
                </Menu.Button>
              </div>
                <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95 translate-y-[-100%]"
    enterTo="transform opacity-100 scale-100 translate-y-0"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100 translate-y-0"
    leaveTo="transform opacity-0 scale-95 translate-y-[-100%]"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bottom-full">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/orderhistory"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            
            </Menu>
            )}
          </div>
        </div>
      </div>

{/* <div class="mt-12 border-t border-opacity-40 py-8 lg:mt-[60px]">
        <div class="container">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4 md:w-2/3 lg:w-1/2">
              <div class="my-1">
                <div
                  class="-mx-3 flex items-center justify-center md:justify-start"
                >
                  <a
                    href="javascript:void(0)"
                    class="px-3 text-base text-[#f3f4fe] hover:text-primary"
                  >
                    Privacy policy
                  </a>
                  <a
                    href="javascript:void(0)"
                    class="px-3 text-base text-[#f3f4fe] hover:text-primary"
                  >
                    Legal notice
                  </a>
                  <a
                    href="javascript:void(0)"
                    class="px-3 text-base text-[#f3f4fe] hover:text-primary"
                  >
                    Terms of service
                  </a>
                </div>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/3 lg:w-1/2">
              <div class="my-1 flex justify-center md:justify-end">
                <p class="text-base text-[#f3f4fe]">
                  © {currentYear} Copyright:
                  <a
                    href="https://tailgrids.com"
                    rel="nofollow noopner"
                    target="_blank"
                    class="text-primary hover:underline"
                  >
                    Tap4Menu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
  </footer>
    // <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
    //   <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
    //     © {currentYear} Copyright:
    //     <a
    //       className="text-neutral-800 dark:text-neutral-400"
    //       href="/"
    //     >
    //       Tap4Menu
    //     </a>
    //   </div>
    // </footer>
  );
}

export default Footer;
