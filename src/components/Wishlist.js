import React, { useEffect, useState } from "react";
// import {  ShoppingCartIcon } from '@heroicons/react/24/outline'
import { UilShoppingCart } from '@iconscout/react-unicons';


export default function Wishlist({addToCart}) {
    const [show, setshow] = useState(true);
    const [favouritedOnes, setFavouritedOnes] = useState([]);

    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      
      if (storedFavorites) {
        console.log(storedFavorites);
        // localStorage.removeItem("favorites");
        setFavouritedOnes(storedFavorites);
      }
    }, []);
  


    const hasFavorites = favouritedOnes.length > 0 ? true : false;
    console.log(hasFavorites);

    return (
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
            <div className="flex flex-col jusitfy-start items-start">

                <div className="mt-3">
                    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Favourites</h1>
                </div>
                <div className="mt-4">
                    {/* number of items in the favourite */}
                    <p className="text-2xl tracking-tight leading-6 text-gray-600">{favouritedOnes.length} items</p>
                </div>
                {hasFavorites ? (
                <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                     {favouritedOnes.map((favorite, index) => (
                    <div  key={index} className="flex flex-col">
                        <div className="relative">
                            {/* <img className={index === 0 ? "block lg:hidden" : "hidden lg:block"} src="{{ favourite.image}}" alt="bag" /> */}
                            <img className="hidden lg:block" src="./pepperoni.png" alt="bag" />
                            <img className="hidden sm:block lg:hidden" src="./pepperoni.png" alt="bag" />
                            <img className=" sm:hidden" src="./pepperoni.png" alt="bag" />
                            {/* on click on below button remove the item from  localstorage */}
                            <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute  p-1.5 bg-gray-800 text-white hover:text-gray-400"    onClick={() => {
                                const newFavorites = [...favouritedOnes];
                                newFavorites.splice(index, 1);
                                setFavouritedOnes(newFavorites);
                                localStorage.setItem('favorites', JSON.stringify(newFavorites));
                            }}>
                                <svg className="fil-current" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <div className="flex justify-center items-center">
                                <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">{favorite.name}</p>
                            </div>
                            <div className="flex justify-center items-center">
                               <button aria-label="show menu"   onClick={() => setshow(prevShow => prevShow === index ? !prevShow : true)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400">
                                {/* <button aria-label="show menu" onClick={() => setshow(!show)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400"> */}
                                    <svg className={`fill-stroke ${show ? "block" : "hidden"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg className={`fill-stroke ${show ? "hidden" : "block"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div id="menu" className={` flex-col jusitfy-start items-start mt-12 ${show ? "flex" : "hidden"}`}>
                            <div>
                                <p className="tracking-tight text-xs leading-3 text-gray-800">{favorite.name}</p>
                            </div>
                            <div className="mt-2">
                                <p className="tracking-tight text-base font-medium leading-4 text-gray-800">{favorite.description}</p>
                            </div>
                            <div className="mt-6">
                                <p className="tracking-tight text-base font-medium leading-4 text-gray-800">Ksh {favorite.price}</p>
                            </div>
                            <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full  space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                <div className="w-full">
                                    <button className=" focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">More information</button>
                                </div>
                                <div className="w-full">
                                    <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-black bg-gray-800 border border-gray-800" onClick={() => addToCart(favorite)}>
                                    <UilShoppingCart className="inline-block mr-2" />
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>))}
                </div> ) : (
                    <p>You don't have any favorites yet.</p>
                  )}
            </div>
        </div>
    );
}
