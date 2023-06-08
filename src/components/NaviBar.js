import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, HeartIcon, HomeIcon } from '@heroicons/react/24/outline'
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

export default function NavBar({ isLoggedIn, cart }) {
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
            {/* <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-white-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div> */}

            <div className="hidden sm:hidden">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-white-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium flex items-center' // Add flex and items-center classes
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name === 'Home' && <HomeIcon className="mr-1" />} {/* Display the Home icon */}
                    {item.name === 'Enquiry' && <HeartIcon className="mr-1" />} {/* Display the Feedback icon */}
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
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  {/* <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item> */}
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
  )
}
