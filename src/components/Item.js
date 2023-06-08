/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useParams, Link } from 'react-router-dom';
import { UilHeart, UilShoppingCart } from '@iconscout/react-unicons';
import { MENU_ITEMS } from '../menu.js';


const product = {
  name: 'Basic Tee 6-Pack',
  price: 'Ksh192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    // { name: 'XXS', inStock: false },
    // { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    // { name: 'XL', inStock: true },
    // { name: '2XL', inStock: true },
    // { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
// const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Item({addToCart}) {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [expanded, setExpanded] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product.images[0].src);
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const { id } = useParams();
  //console.log()
  const handleImageClick = (src) => {
    setSelectedImage(src);
  };


  useEffect(() => {
    const favoritesStr = localStorage.getItem('favorites');
    console.log(favoritesStr);
    if (favoritesStr) {
      setFavorites(JSON.parse(favoritesStr));
    }
  }, []);

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


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);



  const toggleAccordion = (index) => {
    if (expanded === index) {
        // console.log(index)
      setExpanded(null);
    } else {
    //    console.log(index)
      setExpanded(index);
    }
  };

 

  // ...
  useEffect(() => {
    // Fetch item details and categories
    const fetchItemDetails = async () => {
      try {
        console.log(id);
        // Find the item with the matching ID in MENU_ITEMS
        const foundItem = MENU_ITEMS.flatMap(category => category.items).find(item => item.id === parseInt(id));
        if (foundItem) {
          const foundCategory = MENU_ITEMS.find(category => category.items.includes(foundItem));
          setItem(foundItem);
          setCategories([foundCategory.category])
          // setCategories(MENU_ITEMS.map(category => category.category));
          const otherItems = foundCategory.items.filter(item => item.id !== foundItem.id);
          setOtherItems(otherItems)
          console.log('Other items:', otherItems);
        } else {
          console.log('Not found');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };
  
    fetchItemDetails();
  }, [id]);
  
  
  if (!item) {
    // console.log(item)
    return <div>Loading...</div>;
  }
  console.log(categories)


  

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className='container mb-4 px-4 md:px-8 2xl:px-0 py-12'>
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
              <img src={selectedImage} alt={product.images[0].alt} className="object-cover object-center" />  
              {/* <img src={product.images[0].src} alt={product.images[0].alt} className="object-cover object-center" /> */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="cursor-pointer opacity-50 hover:opacity-100"
                    onClick={() => handleImageClick(image.src)}
                  />
                ))}
              </div>
            </div>
            <div className="sm:col-span-8 lg:col-span-7">
              {/* <h2 className="text-sm font-medium text-gray-900">{product.name}</h2> */}
              <div class="flex justify-between">
                <h2 class="text-3xl font-bold text-gray-900 sm:pr-12">{item.name}</h2>
              </div>
              <div class="text-left">
                <p class="text-2xl text-gray-900">
                  <span>Category:</span> {categories}</p>
              </div>
              <div class="text-left">
                <p class="text-3xl font-bold text-gray-900">Ksh {item.price}</p>
              </div>
              

              <section aria-labelledby="information-heading" className="mt-2">
                <div className="mt-6">
                  <div className="flex items-center">
                    <button className="restaurant-item-favorite-button" onClick={() => handleFavoriteClick(item)}>
                      <div className="restaurant-item-favorite mr-4">
                      <UilHeart className={`restaurant-item-favorite-icon 4 ${favorites.some((favoriteItem) => favoriteItem.id === item.id) ? 'favorite-icon-red' : ''}`}/>
                      </div>
                  </button>
                  </div>
                </div>
                <div className='mt-3'>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-left text-gray-900">{item.description}</p>
                  </div>
                </div>
              </section>



              <section aria-labelledby="options-heading" className="mt-10">
                <h3 id="options-heading" className="sr-only">
                  Product options
                </h3>

                <form>
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Size</h4>
                      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                      </a>
                    </div>

                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked ? 'border-indigo-500' : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-md'
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => addToCart(item)}
                  >
                    <UilShoppingCart className="inline-block mr-2"/>
                    Add to Cart
                  </button>
                  {/* border-right-width: lg:border-r */}
                  <div className="py-10 lg:col-span-2 lg:col-start-1  lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
  
                    <div className="mt-10">
                    <button
                        onClick={() => toggleAccordion(0)}
                        className="w-full text-left text-blue-500 hover:text-blue-700"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                        <span>Features</span>
                        <span className="text-[30px]">{expanded ? '+' : '-'}</span>
                    </button>
                      {/* <h3 className="text-sm font-medium text-gray-900">Features</h3> */}
                      {expanded && (
                      <div className="mt-4">
                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                          {product.highlights.map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                              <span className="text-gray-600">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                        )}
                    </div>

                    <div className="mt-10">
                    <button
                    onClick={() => toggleAccordion(1)}
                    className={`w-full text-left text-blue-500 hover:text-blue-700`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <span>Details</span>
                    <span className="text-[30px]">{expanded ? '+' : '-'}</span>
                    
                    </button>
                      {/* <h2 className="text-sm font-medium text-gray-900">Details</h2> */}

                      {expanded && (
                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">{product.details}</p>
                        </div>
                        )}
                    </div>

                    <div className="mt-10">
                    <button
                    onClick={() => toggleAccordion(2)}
                    className={`w-full text-left text-blue-500 hover:text-blue-700`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <span>Add-ons</span>
                    <span className="text-[30px]">{expanded ? '+' : '-'}</span>
                    
                    </button>


                      {expanded && (
                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">{product.details}</p>
                        </div>
                        )}
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>

          {/* mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 */}
          <div className="container">
            <div className="flex justify-between">
               <h2 className="text-2xl font-bold tracking-tight text-gray-900">Related Items</h2>

            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 pb-16">
              {otherItems.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src=''
                      alt= ''
                      // {product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/item/${item.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {item.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{Item.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">KES {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
