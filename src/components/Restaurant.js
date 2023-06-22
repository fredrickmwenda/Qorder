import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UilHeart, UilShoppingCart } from '@iconscout/react-unicons';
import { MENU_ITEMS } from '../menu.js';
import {  db } from '../Firebase/auth';
import { collection, query, where, onSnapshot, updateDoc, doc, connectFirestoreEmulator } from "firebase/firestore";
import "./Style.css";
import { majoryCategories } from './Firebase/firestore';


const slides = [  '../restaurant1.jpg',  '../restaurant2.jpg',  '../restaurant3.jpg',];
const Restaurant = ({ addToCart }) => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [majorCategories, setMajorCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [clickedMeal, setClickedMeal] = useState(null);


  // Check if location is defined and has a search property
  const searchParams = new URLSearchParams(location.search);
  const hotelUniqueId = searchParams.get('hotelId');
  console.log(hotelUniqueId);
  const storeUniqueId = searchParams.get('storeLocationId');

  useEffect(() => {
    const favoritesStr = localStorage.getItem('favorites');
    console.log(favoritesStr);
    if (favoritesStr) {
      setFavorites(JSON.parse(favoritesStr));
    }
  }, []);

  const fetchMajorCategories = async () => {
    try {
      // const initialCategories = await majoryCategories(hotelUniqueId, storeUniqueId);
      const { categories, catg, categoriesMeals } = await majoryCategories(hotelUniqueId, storeUniqueId);
      setMajorCategories(categories);
      setCategories(catg);
      setCategoriesMeals(categoriesMeals);
      

    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    fetchMajorCategories();
  }, []);
  
  // console.log('majorCategories:', majorCategories);
  // console.log('meals', categoriesMeals);
  
 

  const handleMajCatClick = (category) => {
    console.log('Categories:', categories);
    console.log('Category Name:', category.categoryname);
    
    const filteredCategories = categories.filter(cat => {
      console.log('Category:', cat);
      console.log('Major Categories:', cat.majorcategories);
      console.log('Includes:', cat.majorcategories && cat.majorcategories.includes(category.categoryname));
      return cat.majorcategories && cat.majorcategories.includes(category.categoryname);
    });
  
    console.log('Filtered Categories:', filteredCategories);
  
    setFilteredCategories(filteredCategories);
    setSelectedCategory(category);
    setShowCategories(true);
  };
  
  

  const handleMealClick = (meal) => {
    setClickedMeal(meal);
  };

  const handleFavoriteClick = (meal) => {
    const index = favorites.findIndex((favoriteItem) => favoriteItem.id === meal.menuitemid);
     
    if (index === -1) {
      // item doesn't exist in favorites, so add it
      setFavorites([...favorites, {
        id: meal.menuitemid,
        name: meal.menuitemname,
        description: meal.description,
        image: meal.images,
        price: meal.price
      }]);
    } else {
      // item already exists in favorites, so remove it
      const newFavoriteItems = [...favorites];
      newFavoriteItems.splice(index, 1);
      setFavorites(newFavoriteItems);
    }

  };

  const handleMenuClick = (category) => {
    console.log('the menu click category:', category)
    console.log('Category', category.categoryname);

    const filteredMeals = categoriesMeals.filter(menu =>{
      console.log('meal', menu);
      console.log('meal category', menu.categories);
      return menu.categories.includes(category.categoryname);
    });
    console.log('filtered meals: ', filteredMeals);
    setMeals(filteredMeals);
    setSelectedCat(category);
  }


  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }

  const selectSlide = (index) => {
    setCurrentSlide(index);
  }
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    
    <div>
 
      <div class="relative mx-auto">
        <div className="slide relative header-images">
          <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
        </div>
        <button className="absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer" onClick={prevSlide}>❮</button>
        <button className="absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer" onClick={nextSlide}>❯</button>
      </div>
      

        {/* <!-- The dots --> */}
        <div className="flex justify-center items-center space-x-5">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer ${index === currentSlide ? 'bg-yellow-600' : 'bg-gray-300'}`}
              onClick={() => selectSlide(index)}
            ></div>
          ))}         
        </div>
        <div class="container py-5 pl-10 parent-cont pb-16">
          {/* <h2 className="text-center font-bold pb-2">Menu</h2> */}
          <div className='container' id="data-set">
          {!showCategories && majorCategories && majorCategories.length > 0 && (
                    <div className='grid grid-cols-4 gap-4'>
                      {majorCategories.map((category, index) => (
                        <div key={index} className='category-item bg-white rounded-lg shadow-lg p-4 flex flex-col items-center' onClick={() => handleMajCatClick(category)}>
                          <div className='category-icon'>
                            <img src={category.icon} alt={category.name} className='rounded-full h-20 w-20' />
                          </div>
                          <div className='category-name mt-2'>
                            {category.available ? (
                              <a href={category.link} className='text-blue-500 hover:underline'>{category.categoryname}</a>
                            ) : (
                              category.categoryname
                            )}
                          </div>
                        </div>
                    ))}
                </div>
          )}
        </div>
        {showCategories && filteredCategories && filteredCategories.length > 0 && (
          <div>
            <div className="flex items-center">
              <button
                className=" text-white font-bold py-2 px-4 rounded-full ml-2"
                onClick={() => setShowCategories(false)}
              >
                {/* <i className="fas fa-arrow-left mr-2"></i>  */}
                <img src="/back-arrow.svg" className='mr-2 w-20 h-10'/>
              </button>
            </div>
            <div className="flex flex-wrap justify-center men-category">
              {filteredCategories.map((category, index) => (
                <button
                  key={index}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mx-2 mb-3"
                  onClick={() => handleMenuClick(category)}
                >
                  {category.categoryname}
                </button> 
              ))}
            </div>
            {/* Meals Container */}
            <div className="container">
              {showCategories && meals && meals.length > 0 && (
                <ul className="list-none mt-4">
                  {meals.map((meal, index) => (
                    <li key={index} className="border border-gray-300 rounded-lg p-2 mt-4">
                     
                        <div class="single-menu-item mt-30 sub22">
                        <Link to={`/menu/${meal.menuitemid}`} key={meal.menuitemid} onClick={() => handleMealClick(meal)}>
                          <div class="item-details">
                            <div class="menu-thumb">
                              <img src={meal.images} alt={meal.menuitemname} class="shadow-lg rounded object-cover w-16 h-16 border-none" />
                            </div>
                            <div class="menu-content ml-30">
                              <h2 className="text-2xl font-medium title-font mb-2 chacha">{meal.menuitemname}</h2>
                              <p>{meal.description}</p>
                              {meal.sizeoption == "singlesize" && (
                                <h3 className="menu-price chacha">KSh {meal.price}</h3>
                              )}
                              {/* <h3 class="menu-price chacha">KSh {meal.price}</h3> */}
                            </div>
                          </div>
                          </Link>
                          {meal.sizeoption == "singlesize" && (
                            <div class="rest-like-cart">
                        <div class="rest">
                        <button className="restaurant-item-favorite-button" onClick={() => handleFavoriteClick(meal)}>
                          <div className="restaurant-item-favorite mr-4">
                            <UilHeart className={`restaurant-item-favorite-icon 4 ${favorites.some((favoriteItem) => favoriteItem.id === meal.menuitemid) ? 'favorite-icon-red' : ''}`}/>
                          </div>
                        </button>
                        <div class="ml-4">
                          <button class="bg-yellow-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(meal)}>
                            <UilShoppingCart className="inline-block mr-2" />
                            <span class="hidden-cart md:inline-block">Add to Cart</span>
                          </button>
                        </div>
                        </div>
                      </div>
                          )}

                        </div>
                      {/* </Link> */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}



        </div>

        

    </div>
    
  );
};

export default Restaurant;
