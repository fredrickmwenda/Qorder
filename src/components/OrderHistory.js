// import React, { useEffect, useState } from "react";
// import './order.css';

export default function OrderHistory() {
    // const [show1, setshow1] = useState(true);
    // const [show2, setshow2] = useState(false);
    // const [show3, setshow3] = useState(false);

    return (
        <div className="mx-auto container">
            <div className="py-6">
                <div className="mx-auto max-w-7xl cem px-8">
                    <div class="mx-auto max-w-3xl px-4 max-w-4x px-0">
                        <h1 class="font-bold tracking-tight axq text-3xl text-left">Order History</h1>
                        <p class="mt-2 text-sm text-left">Check the status of recent orders, manage returns, and discover similar products.</p>
                    </div>
                </div>
                <div className="mt-16 pb-16">
                    <h2 className="absolute w-1 h-1 p-0 m--1 overflow-hidden whitespace-nowrap border-0"> Recent Orders</h2>
                    <div class="mx-auto max-w-7xl cem px-8">
                        <div class="mx-auto max-w-2xl abu ceq max-w-4xl px-0">
                            <div class="border rounded-lg afh afp alj bbi ccy cdj">
                                <h3 class="t">Order placed on 
                                    <time datetime="2021-07-06">Jul 6, 2021</time>
                                </h3>
                                <div class="grid grid-cols-4 gap-x-6 border-b  afp p-4 bxj cak cbo cef">
                                    <dl class="grid md:grid-cols-3 sm:col-span-2 yd aad text-sm btv caj crl">
                                        <div>
                                            <dt class="font-medium axq">Order number</dt>
                                            <dd class="kp axm">WU88191111</dd>
                                        </div>
                                        <div class="block">
                                            <dt class="font-medium axq">Date placed</dt>
                                            <dd class="kp axm">
                                                <time datetime="2021-07-06">Jul 6, 2021</time>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt class="font-medium axq">Total amount</dt>
                                            <dd class="kp font-medium">$160.00</dd>
                                        </div>
                                    </dl>
                                    <div class="hidden md:block" >
                                        <div class="flex items-center">
                                            <button class="flex -m-[0.5rem] items-center aql axk bkr" id="headlessui-menu-button-1" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                                <span class="t">Options for order WU88191111</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="nx rz">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="justify-end items-center  md:grid-cols-2 md:flex">
                                        <button class="flex items-center justify-center rounded-lg py-2.5 px-2.5 border afq alj aqz arq text-sm font-medium axo bbi bib bmt bmy bnk boa">
                                            <span>View Order</span>
                                            <span class="t">WU88191111</span>
                                        </button>
                                        <button class="flex items-center justify-center rounded-lg py-2.5 px-2.5 border afq alj aqz arq text-sm font-medium mx-4">
                                            <span>View Invoice</span>
                                            <span class="t">for order WU88191111</span>
                                        </button>
                                    </div>
                                </div>
                                <h4 class="t">Items</h4>
                                <ul role="list" class="border-y border-gray-200">
                                    <li class="p-4 p-6">
                                        <div class="flex items-center cav">
                                            <div class="h-20 w-20 uk adb ado aig bxt byp">
                                                <img  src="./pepperoni.png" alt="bag" />
                                                {/* <img src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg" alt="backpack" class="pc ti apz aqa"> */}
                                            </div>
                                            <div class="ml-6 flex-1 text-sm">
                                                <div class="font-medium axq flex justify-between">
                                                    <h5>Micro Backpack</h5>
                                                    <p class="mt-2 bwk">$70.00</p>
                                                </div>
                                                <p class="hidden axm mt-2 block">Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.</p>
                                            </div>
                                        </div>
                                        <div class="mt-6 flex justify-between">
                                            <div class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-green-500">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd">
                                                    </path>
                                                </svg>
                                                <p class="ml-2 text-sm font-medium axm">Delivered on 
                                                    <time datetime="2021-07-12">July 12, 2021</time>
                                                </p>
                                                </div>
                                                <div class="flex mt-6 items-center  border-gray-200 afh afp auw text-sm font-medium bvy bwk cdr cgo">
                                                    <div class="flex flex-1 justify-center">
                                                        <button  class="whitespace-nowrap ayc bkz text-gren-300">View product</button>
                                                    </div>
                                                    <div class="flex flex-1 justify-center pl-4">
                                                        <button  class="whitespace-nowrap ayc bkz text-green-500">Order again</button>
                                                    </div>
                                                </div>
                                            </div>
                                    </li>

                                    <li class="p-4 p-6">
                                        <div class="flex items-center cav">
                                            <div class="h-20 w-20 uk adb ado aig bxt byp">
                                                <img  src="./pepperoni.png" alt="bag" />
                                                {/* <img src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg" alt="backpack" class="pc ti apz aqa"> */}
                                            </div>
                                            <div class="ml-6 flex-1 text-sm">
                                                <div class="font-medium axq flex justify-between">
                                                    <h5>Micro Backpack</h5>
                                                    <p class="mt-2 bwk">$70.00</p>
                                                </div>
                                                <p class="hidden axm mt-2 block">Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.</p>
                                            </div>
                                        </div>
                                        <div class="mt-6 flex justify-between">
                                            <div class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-green-500">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd">
                                                    </path>
                                                </svg>
                                                <p class="ml-2 text-sm font-medium axm">Delivered on 
                                                    <time datetime="2021-07-12">July 12, 2021</time>
                                                </p>
                                                </div>
                                                <div class="flex mt-6 items-center space-x-reverse-0 mr-0 ml-1 divide-x-reverse-0 divide-x divide-solid border-gray-200 afh afp auw text-sm font-medium bvy bwk cdr cgo">
                                                    <div class="flex flex-1 justify-center">
                                                        <button  class="whitespace-nowrap ayc bkz">View product</button>
                                                    </div>
                                                    <div class="flex flex-1 justify-center pl-4">
                                                        <button class="whitespace-nowrap ayc bkz text-green-500">Order again</button>
                                                    </div>
                                                </div>
                                            </div>
                                    </li>
                                </ul>
                            </div>
                        
                            <div class="border rounded-lg afh afp alj bbi ccy cdj mt-4">
                                <h3 class="t">Order placed on 
                                    <time datetime="2020-12-22">Dec 22, 2020</time>
                                </h3>
                                <div class="grid grid-cols-4 gap-x-6 border-b  afp p-4 bxj cak cbo cef">
                                    <dl class="grid md:grid-cols-3 sm:col-span-2 yd aad text-sm btv caj crl">
                                        <div>
                                            <dt class="font-medium axq">Order number</dt>
                                            <dd class="kp axm">AT48441546</dd>
                                        </div>
                                        <div class="block">
                                            <dt class="font-medium axq">Date placed</dt>
                                            <dd class="kp axm">
                                            <time datetime="2020-12-22">Dec 22, 2020</time>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt class="font-medium axq">Total amount</dt>
                                            <dd class="kp font-medium">$40.00</dd>
                                        </div>
                                    </dl>
                                    <div class="hidden md:block" >
                                        <div class="flex items-center">
                                            <button class="flex -m-[0.5rem] items-center aql axk bkr" id="headlessui-menu-button-1" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                                <span class="t">Options for order WU88191111</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="nx rz">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="justify-end items-center  md:grid-cols-2 md:flex">
                                        <button class="flex items-center justify-center rounded-lg py-2.5 px-2.5 border afq alj aqz arq text-sm font-medium axo bbi bib bmt bmy bnk boa">
                                            <span>View Order</span>
                                            <span class="t">WU88191111</span>
                                        </button>
                                        <button class="flex items-center justify-center rounded-lg py-2.5 px-2.5 border afq alj aqz arq text-sm font-medium mx-4">
                                            <span>View Invoice</span>
                                            <span class="t">for order WU88191111</span>
                                        </button>
                                    </div>
                                </div>
                                {/* <div class="flex items-center border-b afp p-4 bxj cak cbo p-6">
                                    <dl class="grid flex-1 yd aad text-sm btv caj crl">
                                        <div>
                                            <dt class="font-medium axq">Order number</dt>
                                            <dd class="kp axm">AT48441546</dd>
                                        </div>
                                        <div class="hidden block">
                                            <dt class="font-medium axq">Date placed</dt>
                                            <dd class="kp axm">
                                                <time datetime="2020-12-22">Dec 22, 2020</time>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt class="font-medium axq">Total amount</dt>
                                            <dd class="kp font-medium axq">$40.00</dd>
                                        </div>
                                    </dl>
                                    <div class="flex ab yy cuq" data-headlessui-state="">
                                        <div class="flex items-center">
                                            <button class="flex -m-[0.5rem] items-center aql axk bkr" id="headlessui-menu-button-2" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                                <span class="t">Options for order AT48441546</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="nx rz">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="hidden crl cum cyu cyx czy">
                                        <button  class="flex items-center justify-center rounded-lg border afq alj aqz arq text-sm font-medium axo bbi bib bmt bmy bnk boa">
                                            <span>View Order</span>
                                            <span class="t">AT48441546</span>
                                        </button>
                                        <button  class="flex items-center justify-center rounded-lg border afq alj aqz arq text-sm font-medium axo bbi bib bmt bmy bnk boa">
                                            <span>View Invoice</span>
                                            <span class="t">for order AT48441546</span>
                                        </button>
                                    </div>
                                </div> */}
                                <h4 class="t">Items</h4>
                                <ul role="list" class="border-y border-gray-200">
                                    <li class="p-4 p-6">
                                        <div class="flex items-center cav">
                                            <div class="h-20 w-20 uk adb ado aig bxt byp">
                                            <img  src="./pepperoni.png" alt="bag" />

                                                {/* <img src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-03.jpg" alt="Garment" class="pc ti apz aqa"> */}
                                            </div>
                                            <div class="ml-6 flex-1 text-sm">
                                                <div class="font-medium axq flex justify-between">
                                                    <h5>Double Stack Clothing Bag</h5>
                                                    <p class="mt-2 bwk">$40.00</p>
                                                </div>
                                                <p class="hidden axm mt-2 block">Save space and protect your favorite clothes in this double-layer garment bag. Each compartment easily holds multiple pairs of jeans or tops, while keeping your items neatly folded throughout your trip.</p>
                                            </div>
                                        </div>
                                        <div class="mt-6 flex justify-between">
                                            <div class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-green-500">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd">
                                                        </path>
                                                </svg>
                                                <p class="ml-2 text-sm font-medium axm">Delivered on 
                                                    <time datetime="2021-01-05">January 5, 2021</time>
                                                </p>
                                            </div>
                                            <div class="flex mt-6 items-center space-x-reverse-0 mr-0 ml-1 divide-x-reverse-0 divide-x divide-solid border-gray-200 afh afp auw text-sm font-medium bvy bwk cdr cgo">
                                                <div class="flex flex-1 justify-center">
                                                    <button  class="whitespace-nowrap ayc bkz">View product</button>
                                                </div>
                                                <div class="flex flex-1 justify-center pl-4">
                                                    <button class="whitespace-nowrap ayc bkz text-green-500">Order again</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    
    )
}
