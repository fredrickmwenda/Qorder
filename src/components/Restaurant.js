import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  
  console.log('majorCategories:', majorCategories);
  
 

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

  const handleMenuClick = (category) => {
    console.log('the category:', category)

    const filteredMeals = categoriesMeals.filter(meal =>meal.categories === category.categoryname);
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
  <div className="flex flex-wrap justify-center men-category">
    {filteredCategories.map((category, index) => (
      <button
        key={index}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mx-2"
        onClick={() => handleMenuClick(category)}
      >
        {category.categoryname}
      </button> 
    ))}
  </div>
)}

            <div className='container '>
            {showCategories && meals && meals.length > 0 && (
                <ul className="list-none mt-4">
                  {meals.map((meal, index) => (
                    <li key={index} className="border border-gray-300 rounded-lg p-2 mt-4">
                      <Link to={`/menu/${meal.mealitemid}`} key={meal.mealitemid} onClick={() => handleMealClick(meal)}>
                      <div class="single-menu-item mt-30 sub22" >
                        <div class="item-details">
                          <div class="menu-thumb">
                          <img src="{meal.images}" alt="{meal.itemname}" class="shadow-lg rounded object-cover w-16 h-16 border-none" />
                          
                          </div>
                            <div class="menu-content ml-30">
                                <h2 className='text-2xl font-medium title-font mb-2 chacha'>{meal.mealitemname}</h2>
                                
                                <p>{meal.description}</p>
                                <h3 class='menu-price chacha'>KSh {meal.price}</h3>
                            </div>
                        </div>
  

                      </div>
                      </Link>                  
                    </li>
                  ))}
                </ul>
              )}
            </div>

        </div>

        

    </div>
    
  );
};

export default Restaurant;
