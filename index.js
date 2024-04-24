const products = [
    {
        name: "Parodontax Expert Gum Care Manual Toothbrush (Pack Of 1), White",
        category: ["toothbrush"],
        price: 50,
        image: "img1.jpg",
    },
    {
        name: "Oral-B Pro 2000 Electric Rechargeable Toothbrush with Sensi Ultrathin Brush Head",
        category: ["electrictoothbrush"],
        price: 3000,
        image: "img2.jpg",
    },
    {
        name: "Colgate Kids Batman Battery Toothbrush",
        category: ["kidstoothbrush","electrictoothbrush"],
        price: 598,
        image: "img3.jpg",
    },
    {
        name: "Listerine Cool Mint Mouthwash (pack of 3)",
        category: ["mouthwash"],
        price: 300,
        image: "img4.jpg",
    },
    {
        name: "Oral-B Pro-Health All-In-One Soft Toothbrush",
        category: ["kidstoothbrush"],
        price: 190,
        image: "img5.jpg",
    },
    {
        name: "Sensodyne Mouthwash Complete Protection+ ",
        category: ["mouthwash"],
        price: 230,
        image: "img6.jpg",
    },
    {
        name: "Listerine FreshBurst Pocketpaks Breath Freshener Strips - 72 Strips",
        category: ["breathfreshner"],
        price: 700,
        image: "img7.jpg",
    },
    {
        name: "ORACURA® OC300 LITE Smart Pro Dental Care Kit",
        category: ["dentalcarekits","floss"],
        price: 2010,
        image: "img8.jpg",
    },
];

// Define an array to store cart items
let cartItems = [];

// Function to add item to the cart
function addToCart(item) {
    cartItems.push(item);
    updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon img');
    if (cartIcon) {
        cartIcon.src = "cart_icon_filled.png"; 
    }
}

// Function to open cart page
function openCartPage() {
    // Store the cart items in sessionStorage to access them on the cart page
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Redirect to cart page
    window.location.href = "cart.html";
}


function displayMenu(items) {
    const menuElement = document.getElementById("menu");
    menuElement.innerHTML = "";
    items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `

            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}">
            <p>Price: Rs. ${item.price.toFixed(2)}</p>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        menuElement.appendChild(card);
    });
}

function filterItems() {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);

    // Get the selected price range
    let priceFilters = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => input.value);

    let filteredItems = products.filter(item => {
        // Check if the item's category matches any of the selected categories
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => item.category.includes(category));
        
        // Check if the item's price falls within any of the selected price ranges
        const priceMatch = priceFilters.length === 0 || priceFilters.some(filter => {
            if (filter === "under10") {
                return item.price < 100;
            } else if (filter === "100to500") {
                return item.price >= 100 && item.price <= 500;
            } else if (filter === "500to1000") {
                return item.price > 500 && item.price <= 1000;
            } else if (filter === "over1000") {
                return item.price > 1000;
            }
        });

        // Return true if both category and price match
        return categoryMatch && priceMatch;
    });

    // Display the filtered items
    displayMenu(filteredItems);
}


function addToCart(name, price) {
    cartItems.push({ name, price });
    console.log("Item added to cart:", { name, price });
}

// Display all products initially
displayMenu(products);