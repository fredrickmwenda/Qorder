export const MENU_ITEMS =  [  
    {     
        id: 1,     
        category: 'Appetizers',     
        items: [      
            {id: 1, name: 'Bruschetta', description: 'Toasted bread topped with fresh tomatoes and basil', image: 'bruschetta.jpg', price: '2,500' },      
            {id:2,  name: 'Calamari', description: 'Deep-fried squid served with marinara sauce', image: 'calamari.jpg', price: '1,250' },      
            {id:3,  name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze', image: 'caprese.jpg', price: '1,300' }    
        ]
    },
    {
        id: 2, 
        category: 'Entrees', 
        items: [
            {id:4, name: 'Spaghetti Bolognese', description: 'Spaghetti pasta with meat sauce', image: 'bolognese.jpg', price: '500' },
            {id:5, name: 'Fettuccine Alfredo', description: 'Fettuccine pasta with creamy parmesan sauce', image: 'alfredo.jpg', price: '800' },
            {id:6, name: 'Chicken Parmigiana', description: 'Breaded chicken breast with tomato sauce and melted cheese', image: 'parmigiana.jpg', price: '1000' }
        ]
    },
    {
        id: 3, 
        category: 'Beverages', 
        items: [
            {id:7, name: 'Tea', description: 'Hot or cold tea with a variety of flavors', image: 'tea.jpg' },
            {id:8, name: 'Juice', description: 'Freshly squeezed juice from seasonal fruits', image: 'juice.jpg' },
            { 
            id:9, name: 'Coffee', 
            description: 'Espresso-based coffee drinks with milk or cream', 
            image: 'coffee.jpg',
            subcategory: [
                {id:10, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', image: 'cappuccino.jpg', price: '300' },
                {id:11, name: 'Latte', description: 'Espresso with steamed milk and a small amount of foam', image: 'latte.jpg', price: '200' },
                {id:12, name: 'Mocha', description: 'Espresso with chocolate and steamed milk', image: 'mocha.jpg', price: '250' },
                { id:13,name: 'Macchiato', description: 'Espresso with a dollop of foamed milk', image: 'macchiato.jpg', price: '250' },
                { id:14,name: 'Americano', description: 'Espresso with hot water', image: 'americano.jpg', price: '300' }
            ]
            }
        ]
    },
    {
        id: 4, 
        category: 'Fish', 
        items: [
            {id:15, name: 'Salmon', description: 'Grilled or baked salmon with lemon and herbs', image: 'salmon.jpg',  price: '1,500' },
            {id:16,name: 'Tuna', description: 'Seared or grilled tuna steak with soy sauce and ginger', image: 'tuna.jpg', price: '2,000' },
            {id:17, name: 'Cod', description: 'Baked or fried cod fillet with lemon and herbs', image: 'cod.jpg', price: '880' }
        ]
    },
    {
        id: 5, 
        category: 'Burgers', 
        items: [
            {id:18, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and onion on a bun', image: 'classic-burger.jpg', price: '500' },
            {id:19, name: 'Cheeseburger', description: 'Beef patty with cheese, lettuce, tomato, and onion on a bun', image: 'cheeseburger.jpg', price: '750' },
            {id:20, name: 'Veggie Burger', description: 'Vegetable patty with lettuce, tomato, and onion on a bun', image: 'veggie-burger.jpg', price: '600' }
        ]
    },
    {
        id: 6, 
        category: 'Meat', 
        items: [
            { id:21,name: 'Steak', description: 'Grilled or pan-seared beef steak with choice of sauce', image: 'steak.jpg', price: '1,200' },
            {id:22, name: 'Pork Chop', description: 'Grilled or baked pork chop with choice of side dish', image: 'pork-chop.jpg', price: '1,500' },
            {id:23, name: 'Lamb Shank', description: 'Slow-cooked lamb shank with root vegetables and herbs', image: 'lamb-shank.jpg', price: '1,750' }
        ]
    },

    {
        id: 7,
        category: 'Drinks',
        items: [
            { id:24,name: 'Soda', description: 'Coca-Cola, Sprite, Fanta, or Root Beer', image: 'soda.jpg', price: '100' },
            { id:25,name: 'Beer', description: 'IPA, Stout, Pilsner, or Lager', image: 'beer.jpg', price: '300' },
            {id:26, name: 'Wine', description: 'Red, White, or Rosé from our selection', image: 'wine.jpg', price: '1,500' }
        ]
    },
    {
        id: 8,
        category: 'Desserts',
        items: [
            {id:27, name: 'Tiramisu', description: 'Classic Italian dessert made with mascarpone cheese and ladyfingers', image: 'tiramisu.jpg',  price: '1,200' },
            {id:28, name: 'Cheesecake', description: 'Creamy cheesecake with graham cracker crust and raspberry sauce', image: 'cheesecake.jpg',  price: '1,250' },
            {id:29,name: 'Chocolate Cake', description: 'Decadent chocolate cake with vanilla ice cream and caramel sauce', image: 'chocolate-cake.jpg' , price: '1,100' }
        ]
    },

    {
        id: 9,
        category: 'Pizza',
        items: [
            {id:30, name: 'Margherita', description: 'Tomato sauce, mozzarella, and basil', image: 'margherita.jpg', price: '2,500' },
            {id:31, name: 'Pepperoni', description: 'Tomato sauce, mozzarella, and pepperoni', image: 'pepperoni.jpg', price: '2,000' },
            {id:33, name: 'Hawaiian', description: 'Tomato sauce, mozzarella, ham, and pineapple', image: 'hawaiian.jpg', price: '1,500' },
        ]
    }
];