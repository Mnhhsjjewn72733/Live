const products = [
    {
        id: 1,
        name: "Whey Protein Isolate",
        category: "protein",
        price: 2500,
        images: [
            "/Products/Images/download__5_-removebg-preview.png",
            "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "1 KG", value: "1kg", price: 2500 },
            { name: "2 KG", value: "2kg", price: 4500 }
        ],
        description: "Premium quality whey protein isolate designed for serious athletes and fitness enthusiasts. Each serving delivers 25g of high-quality protein with minimal carbs and fats, perfect for muscle building and recovery."
    },
    {
        id: 2,
        name: "Casein Protein",
        category: "protein",
        price: 2800,
        images: [
            "/Products/Images/images-removebg-preview.png",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "500g", value: "500g", price: 2800 },
            { name: "1 KG", value: "1kg", price: 5200 }
        ],
        description: "Slow-digesting casein protein ideal for nighttime consumption and sustained muscle recovery throughout the night."
    },
    {
        id: 3,
        name: "Adjustable Dumbbells",
        category: "accessories",
        price: 800,
        images: [
            "/Products/Images/adjustable_dumbells.png",
            "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "10 LB", value: "10lb", price: 800 },
            { name: "20 LB", value: "20lb", price: 1500 }
        ],
        description: "Professional-grade adjustable dumbbells with multiple weight settings for versatile home workouts."
    },
    {
        id: 4,
        name: "Weight Plates Set",
        category: "accessories",
        price: 500,
        images: [
            "https://images.unsplash.com/photo-1566218917207-a5e0e80f5aa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1583473848882-f9a9873d0db0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "5 KG", value: "5kg", price: 500 },
            { name: "10 KG", value: "10kg", price: 900 }
        ],
        description: "High-quality cast iron weight plates for home and gym use."
    },
    {
        id: 5,
        name: "Compression T-Shirt",
        category: "clothing",
        price: 1200,
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "Black", value: "black", price: 1200, color: "#000000" },
            { name: "Red", value: "red", price: 1200, color: "#dc3545" }
        ],
        description: "High-performance compression t-shirt with moisture-wicking fabric."
    },
    {
        id: 6,
        name: "Training Shorts",
        category: "clothing",
        price: 900,
        images: [
            "https://images.unsplash.com/photo-1506629905607-45c5a2c0e0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "Blue", value: "blue", price: 900, color: "#007bff" },
            { name: "Gray", value: "gray", price: 900, color: "#6c757d" }
        ],
        description: "Lightweight training shorts with built-in compression liner."
    },
    {
        id: 7,
        name: "BCAA Powder",
        category: "supplements",
        price: 1800,
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "250g", value: "250g", price: 1800 },
            { name: "500g", value: "500g", price: 3200 }
        ],
        description: "Essential BCAA supplement with 2:1:1 ratio for optimal muscle recovery and growth."
    },
    {
        id: 8,
        name: "Pre-Workout",
        category: "supplements",
        price: 2200,
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "300g", value: "300g", price: 2200 },
            { name: "600g", value: "600g", price: 4000 }
        ],
        description: "High-stimulant pre-workout formula for explosive energy and enhanced performance."
    }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')) || 1;
const currentProduct = products.find(p => p.id === productId) || products[0];

let cart = [];
let quantity = 1;
let selectedVariantIndex = 0;

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('xtremeBodyCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('xtremeBodyCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}
// window.addEventListener('scroll', () => {
//     const nav = document.querySelector('.navbar');
//     if (window.scrollY > 100) {
//         nav?.classList.add('scrolled');
//     } else {
//         nav?.classList.remove('scrolled');
//     }
// });
document.addEventListener('click', function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbar = document.querySelector('.navbar');

    if (!navbar?.contains(event.target) && navbarCollapse?.classList.contains('show')) {
        navbarToggler?.click();
    }
});
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Initialize page
function initializePage() {
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
    document.getElementById('productCategory').textContent = currentProduct.category.toUpperCase();
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('fullDescription').textContent = currentProduct.description;
    document.getElementById('productPrice').textContent = `₹${currentProduct.price}`;

    // Set main image
    if (currentProduct.images.length > 0) {
        document.getElementById('mainImage').src = currentProduct.images[0];
    }

    // Create thumbnails
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.innerHTML = currentProduct.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})">
            <img src="${img}" alt="Product ${index + 1}">
        </div>
    `).join('');

    // Create variant options
    const variantOptions = document.getElementById('variantOptions');
    variantOptions.innerHTML = currentProduct.variants.map((variant, index) => {
        const isColor = variant.color;
        const style = isColor ? `background-color: ${variant.color}; width: 50px; height: 50px; border-radius: 50%;` : '';

        return `
            <button class="variant-option ${isColor ? 'color-variant' : ''} ${index === 0 ? 'active' : ''}" 
                    onclick="selectVariant(${index})" 
                    style="${style}">
                ${isColor ? '' : variant.name}
            </button>
        `;
    }).join('');

    // Load related products
    loadRelatedProducts();
}

// Change main image
function changeImage(index) {
    document.getElementById('mainImage').src = currentProduct.images[index];
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Select variant
function selectVariant(index) {
    selectedVariantIndex = index;
    const variant = currentProduct.variants[index];
    document.getElementById('productPrice').textContent = `₹${variant.price}`;

    document.querySelectorAll('.variant-option').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

// Update quantity
function updateQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById('quantity').textContent = quantity;
}

// Add to cart
function addToCart() {
    const btn = document.querySelector('.add-to-cart-btn');
    const variant = currentProduct.variants[selectedVariantIndex];

    const cartItem = {
        ...currentProduct,
        selectedVariant: variant,
        finalPrice: variant.price,
        quantity: quantity,
        cartId: `${currentProduct.id}-${variant.value}`
    };

    const existingItemIndex = cart.findIndex(item => item.cartId === cartItem.cartId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    saveCart();

    // Success animation
    btn.classList.add('success-added');
    btn.innerHTML = '<i class="fas fa-check me-2"></i>Added to Cart!';

    setTimeout(() => {
        btn.classList.remove('success-added');
        btn.innerHTML = '<i class="fas fa-shopping-cart me-2"></i>Add to Cart';
    }, 2000);

    // Reset quantity
    quantity = 1;
    document.getElementById('quantity').textContent = '1';

    updateCartUI();
}

// Load related products
function loadRelatedProducts() {
    const relatedContainer = document.getElementById('relatedProducts');
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 3);

    if (relatedProducts.length < 3) {
        const additional = products
            .filter(p => p.id !== currentProduct.id && !relatedProducts.includes(p))
            .slice(0, 3 - relatedProducts.length);
        relatedProducts.push(...additional);
    }

    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="related-product-card" onclick="goToProduct(${product.id})">
                <img src="${product.images[0]}" alt="${product.name}" class="related-product-image">
                <div class="related-product-name">${product.name}</div>
                <div class="related-product-price">₹${product.price}</div>
            </div>
        </div>
    `).join('');
}

// Navigate to product
function goToProduct(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalSection = document.getElementById('cartTotalSection');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; opacity: 0.3; margin-bottom: 20px;"></i>
                <p>Your cart is empty</p>
                <p>Add some products to get started!</p>
            </div>
        `;
        cartTotalSection.style.display = 'none';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-info">
                        <h6>${item.name}</h6>
                        <div class="cart-item-variant">${item.selectedVariant.name} - ₹${item.finalPrice} each</div>
                    </div>
                    <button class="cart-remove-btn" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-quantity-controls">
                        <button class="cart-quantity-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                        <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                        <button class="cart-quantity-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="cart-item-price">₹${item.finalPrice * item.quantity}</div>
                </div>
            </div>
        `).join('');

        cartTotal.textContent = totalPrice;
        cartTotalSection.style.display = 'block';
        checkoutBtn.disabled = false;
    }
}

// Update cart item quantity
function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);
        saveCart();
        updateCartUI();
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Cart toggle
const cartToggle = document.getElementById('cartToggle');
const cartSlider = document.getElementById('cartSlider');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

function openCart() {
    cartSlider.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSlider.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderDetails = cart.map(item =>
        `${item.quantity}× ${item.name} (${item.selectedVariant.name}) - ₹${item.finalPrice * item.quantity}`
    ).join('%0A');

    const total = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    const message = `Hi XTREME BODY! 💪%0A%0AI want to place an order:%0A%0A${orderDetails}%0A%0A*Total: ₹${total}*%0A%0APlease confirm my order. Thank you!`;

    const whatsappNumber = "916381389118";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializePage();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
    }
});


