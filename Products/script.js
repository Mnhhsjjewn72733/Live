const products = [
    {
        id: 1,
        name: "Whey Protein Isolate",
        category: "protein",
        price: 2500,
        images: [
            "Images/download__5_-removebg-preview.png",
            "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "1 KG", value: "1kg", price: 2500 },
            { name: "2 KG", value: "2kg", price: 4500 }
        ],
        description: "Premium whey protein for muscle building",
        fullDescription: "High-quality whey protein isolate with 25g protein per serving."
    },
    {
        id: 2,
        name: "Casein Protein",
        category: "protein",
        price: 2800,
        images: [
            "Images/images-removebg-preview.png",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "500g", value: "500g", price: 2800 },
            { name: "1 KG", value: "1kg", price: 5200 }
        ],
        description: "Slow-release protein for overnight recovery",
        fullDescription: "Slow-digesting casein protein ideal for nighttime consumption."
    },
    {
        id: 3,
        name: "Adjustable Dumbbells",
        category: "accessories",
        price: 800,
        images: [
            "Images/adjustable_dumbells.png",
            "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "10 LB", value: "10lb", price: 800 },
            { name: "20 LB", value: "20lb", price: 1500 }
        ],
        description: "Complete set of adjustable dumbbells",
        fullDescription: "Professional-grade adjustable dumbbells with multiple weight settings."
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
        description: "Cast iron weight plates",
        fullDescription: "High-quality cast iron weight plates for home and gym use."
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
        description: "Moisture-wicking compression wear",
        fullDescription: "High-performance compression t-shirt with moisture-wicking fabric."
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
        description: "Comfortable athletic shorts",
        fullDescription: "Lightweight training shorts with built-in compression liner."
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
        description: "Branched-chain amino acids",
        fullDescription: "Essential BCAA supplement with 2:1:1 ratio of leucine, isoleucine, and valine."
    },
    {
        id: 8,
        name: "Pre-Workout",
        category: "supplements",
        price: 2200,
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        variants: [
            { name: "300g", value: "300g", price: 2200 },
            { name: "600g", value: "600g", price: 4000 }
        ],
        description: "Energy booster for intense workouts",
        fullDescription: "High-stimulant pre-workout formula with caffeine, beta-alanine, and citrulline."
    }
];

// Cart functionality with localStorage
let cart = [];
let currentCategory = 'all';
let productQuantities = {};

// Initialize quantities for all products
products.forEach(product => {
    productQuantities[product.id] = 1;
});

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

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        renderProducts();
    });
});

// Generate variant options
function generateVariantOptions(product) {
    return product.variants.map((variant, index) => {
        const isColor = variant.color;
        const optionClass = isColor ? 'color-option' : '';
        const optionStyle = isColor ? `background-color: ${variant.color}` : `background: var(--primary-red)`;

        return `
            <label for="${product.id}-variant-${index}">
                <div class="name">${variant.name}</div>
                <input type="radio" name="variant-${product.id}" id="${product.id}-variant-${index}" value="${index}" ${index === 0 ? 'checked' : ''}>
                <div class="option ${optionClass}" style="${optionStyle}">
                    ${isColor ? '' : variant.name}
                </div>
            </label>
        `;
    }).join('');
}

// Update quantity
function updateQuantity(productId, change) {
    const currentQty = productQuantities[productId] || 1;
    const newQty = Math.max(1, currentQty + change);
    productQuantities[productId] = newQty;

    const display = document.getElementById(`qty-${productId}`);
    if (display) {
        display.textContent = newQty;
    }
}

// Navigate to product detail
function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card-container">
                <div class="product-card" id="card-${product.id}">
                    <div class="basicInfo">
                        <div class="title">
                            <div class="category">${product.category.toUpperCase()}</div>
                            <div class="name">${product.name}</div>
                            <div class="info">XTREME BODY Premium</div>
                        </div>
                        <div class="product-images">
                            ${product.images.map((img, index) => `
                                <div class="item">
                                    <input type="radio" name="image-${product.id}" class="img-input" id="${product.id}-img-${index}" ${index === 0 ? 'checked' : ''}>
                                    <img src="${img}" alt="${product.name}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="product-options">
                            <div class="variants">
                                ${generateVariantOptions(product)}
                            </div>
                            <div class="quantity-section">
                                <span style="font-size: 12px; font-weight: 600; color: var(--dark);">Quantity:</span>
                                <div class="quantity-controls">
                                    <button type="button" class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                                    <span class="quantity-display" id="qty-${product.id}">${productQuantities[product.id] || 1}</span>
                                    <button type="button" class="quantity-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="addCard">
                            <i class="fa-solid fa-cart-shopping" onclick="event.stopPropagation(); addToCart(${product.id})"></i>
                        </div>
                    </div>
                    <div class="mores">
                        <button class="see-more-btn" onclick="goToProductDetail(${product.id})">
                            <i class="fas fa-eye me-2"></i>See More
                        </button>
                        <div class="price" id="price-${product.id}">₹${product.price}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add variant selection functionality
    filteredProducts.forEach(product => {
        const variantInputs = document.querySelectorAll(`input[name="variant-${product.id}"]`);
        variantInputs.forEach((input) => {
            input.addEventListener('change', () => {
                if (input.checked) {
                    const variantIndex = parseInt(input.value);
                    const priceElement = document.getElementById(`price-${product.id}`);
                    priceElement.textContent = `₹${product.variants[variantIndex].price}`;
                }
            });
        });
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const card = document.getElementById(`card-${productId}`);

    const selectedVariantInput = document.querySelector(`input[name="variant-${productId}"]:checked`);
    let variantIndex = 0;
    if (selectedVariantInput) {
        variantIndex = parseInt(selectedVariantInput.value);
    }

    const selectedVariant = product.variants[variantIndex];
    const quantity = productQuantities[productId] || 1;

    const cartItem = {
        ...product,
        selectedVariant: selectedVariant,
        finalPrice: selectedVariant.price,
        quantity: quantity,
        cartId: `${productId}-${selectedVariant.value}`
    };

    const existingItemIndex = cart.findIndex(item => item.cartId === cartItem.cartId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    // Save to localStorage
    saveCart();

    // Card animation
    card.classList.add('card-added');

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Added to Cart!';
    card.appendChild(successMessage);

    setTimeout(() => {
        card.classList.remove('card-added');
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 1500);

    productQuantities[productId] = 1;
    const qtyDisplay = document.getElementById(`qty-${productId}`);
    if (qtyDisplay) {
        qtyDisplay.textContent = '1';
    }

    updateCartUI();
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

// Cart toggle functionality
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

// Checkout functionality
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

    const whatsappNumber = "911234567890";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappURL, '_blank');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();

    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';

            setTimeout(() => {
                card.style.transition = 'all 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(18, 18, 18, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});