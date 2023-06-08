import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UilHeart, UilShoppingCart } from '@iconscout/react-unicons';
// import { moveSlide, currentSlide } from './slider.js';
import { MENU_ITEMS } from '../menu.js';
import { onAuthStateChanged } from 'firebase/auth';
import "./Style.css";

const slides = [  '../restaurant1.jpg',  '../restaurant2.jpg',  '../restaurant3.jpg',];
const Restaurant = ({addToCart}) => {
  // const [activeCategory] = useState(IMAGES[0]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const favoritesStr = localStorage.getItem('favorites');
    console.log(favoritesStr);
    if (favoritesStr) {
      setFavorites(JSON.parse(favoritesStr));
    }
  }, []);

  function GetUserUid(){
    const [uid, setUid] = useState(null);
    useEffect(() =>{
      onAuthStateChanged(
        user => {
          if(user){
            setUid(user.uid)
          }
        }
      )
    })
  }





  const handleFavoriteClick = (item) => {
    const index = favorites.findIndex((favoriteItem) => favoriteItem.id === item.id);
     
    if (index === -1) {
      // item doesn't exist in favorites, so add it
      setFavorites([...favorites, {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price
      }]);
    } else {
      // item already exists in favorites, so remove it
      const newFavoriteItems = [...favorites];
      newFavoriteItems.splice(index, 1);
      setFavorites(newFavoriteItems);
    }

  };

  

  //const isFavorited = favorites.some((favoriteItem) => favoriteItem.id === item.id);
  const handleMenuClick = (category) => {
    setSelectedCategory(category);
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
      {/* <NavBar /> */}
      
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
        <div class="container py-5 pl-10 parent-cont">
             <h2 className="text-center font-bold pb-2">Menu</h2>
            <div class="flex flex-wrap justify-center men-category">
                {MENU_ITEMS.map(item => (
                    <button
                    key={item.id}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mx-2"
                    onClick={() => handleMenuClick(item.category)}
                    >
                    {item.category}
                    </button>
                ))}
            </div>
            <div className='container '>
            {selectedCategory && (
              <ul className="list-none mt-4">
                {MENU_ITEMS.find(item => item.category === selectedCategory)?.items.map((item, index) => (
                  <li key={index} className="border border-gray-300 rounded-lg p-2 mt-4">
                    <Link to={`/item/${item.id}`}>
                    <div class="single-menu-item mt-30 sub22" >
                      <div class="item-details">
                        <div class="menu-thumb">
                        <img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-3-800x800.jpg" alt="..." class="shadow-lg rounded object-cover w-16 h-16 border-none" />
                          {/* <img class="lazy wow fadeIn entered loaded"  alt="menu" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;"  src="https://codecanyon8.kreativdev.com/superv/assets/front/img/product/featured/1598685627.jpg">     */}
                        </div>
                          <div class="menu-content ml-30">
                              <h2 className='text-2xl font-medium title-font mb-2 chacha'>{item.name}</h2>
                              {/* <a class="title" href="https://codecanyon8.kreativdev.com/superv/Set-Menu---5/19/item">Set Menu - 5</a> */}
                              <p>{item.description}</p>
                              <h3 class='menu-price chacha'>KSh {item.price}</h3>
                          </div>
                      </div>
                      {/* <div class="rest-like-cart">
                        <div class="rest">
                        <button className="restaurant-item-favorite-button" onClick={() => handleFavoriteClick(item)}>
                          <div className="restaurant-item-favorite mr-4">
                            <UilHeart className={`restaurant-item-favorite-icon 4 ${favorites.some((favoriteItem) => favoriteItem.id === item.id) ? 'favorite-icon-red' : ''}`}/>
                          </div>
                        </button>
                        <div class="ml-4">
                          <button class="bg-yellow-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(item)}>
                            <UilShoppingCart className="inline-block mr-2" />
                            <span class="hidden-cart md:inline-block">Add to Cart</span>
                          </button>
                        </div>
                        </div>
                      </div> */}

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
