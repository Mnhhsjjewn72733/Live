/* ================================
   XTREME BODY - Main JavaScript
   Organized by Sections
================================ */

// ==========================================
// 1. HERO SECTION
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const hero_dots = document.querySelectorAll('.hero_dot');
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    hero_dots.forEach(hero_dot => hero_dot.classList.remove('active'));

    slides[index].classList.add('active');
    hero_dots[index].classList.add('active');

    const activeSlide = slides[index];
    const content = activeSlide.querySelector('.slide-content');

    if (content) {
        const newContent = content.cloneNode(true);
        content.parentNode.replaceChild(newContent, content);
    }
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoSlide();
}

function autoSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 6000);
}

function initHeroCarousel() {
    autoSlideInterval = setInterval(autoSlide, 6000);
    showSlide(0);

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselContainer.addEventListener('mouseleave', () => resetAutoSlide());
    }
}

function scrollToNext() {
    const next = document.querySelector('.hero')?.nextElementSibling;
    next?.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 2. NAVIGATION & GLOBAL EFFECTS
// ==========================================

function initNavigation() {
    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarCollapse?.classList.contains('show')) {
                navbarToggler?.click();
            }
        });
    });

    // Close navbar when clicking outside
    document.addEventListener('click', function (event) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbar = document.querySelector('.navbar');

        if (!navbar?.contains(event.target) && navbarCollapse?.classList.contains('show')) {
            navbarToggler?.click();
        }
    });

    // Enhanced hamburger animation
    document.querySelector('.navbar-toggler')?.addEventListener('click', function () {
        setTimeout(() => {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.classList.toggle('active', isExpanded);
        }, 50);
    });

    // Prevent navbar close when clicking inside menu
    document.querySelector('.navbar-collapse')?.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

// ==========================================
// 3. THEME TOGGLE
// ==========================================

function initThemeToggle() {
    function toggleTheme() {
        const body = document.body;
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');

        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            if (icon) icon.className = 'fas fa-moon gym-icon';
            if (text) text.textContent = 'Dark Mode';
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            if (icon) icon.className = 'fas fa-sun gym-icon';
            if (text) text.textContent = 'Light Mode';
        }
    }

    // Make function globally accessible
    window.toggleTheme = toggleTheme;

    // Add smooth transition
    document.body.style.transition = 'all 0.3s ease';
}

// ==========================================
// 4. STAT CARDS & BUTTON EFFECTS
// ==========================================

function initStatCards() {
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const num = card.querySelector('.stat-number');
            if (num) {
                num.style.transform = 'scale(1.2)';
                num.style.color = '#00d4ff';
            }
        });
        card.addEventListener('mouseleave', () => {
            const num = card.querySelector('.stat-number');
            if (num) {
                num.style.transform = 'scale(1)';
                num.style.color = 'var(--neon-red)';
            }
        });
    });
}

function initPrimaryButtons() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 20px rgba(220,53,69,0.6)');
        btn.addEventListener('mouseleave', () => btn.style.boxShadow = '');
    });
}

// ==========================================
// 5. SERVICE CARDS & ANIMATIONS
// ==========================================

function initServiceCards() {
    // Service card icon pulse animation
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon')?.classList.add('pulse');
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-icon')?.classList.remove('pulse');
        });
    });

    // Add pulse animation to DOM
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Service card intersection observer
    const serviceObserverOptions = {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -50px 0px'
    };

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, serviceObserverOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        serviceObserver.observe(card);
    });
}
// ==========================================
// SLIDER VARIABLES
// ==========================================
let currentIndex = 0;              // Current slide position
let cardsPerView = 1;              // Number of cards visible at once
let totalCards = 9;                // Total number of testimonial cards
let startX = 0;                    // Starting X position for swipe
let isDragging = false;            // Is user currently dragging?
let currentTranslate = 0;          // Current translation value
let prevTranslate = 0;             // Previous translation value

// DOM Elements
const sliderWrapper = document.getElementById('sliderWrapper');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ==========================================
// CALCULATE CARDS PER VIEW BASED ON SCREEN SIZE
// ==========================================
function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;    // Desktop: 3 cards
    if (window.innerWidth >= 768) return 2;     // Tablet: 2 cards
    return 1;                                    // Mobile: 1 card
}

// ==========================================
// CALCULATE TOTAL NUMBER OF SLIDES
// ==========================================
function getTotalSlides() {
    return Math.ceil(totalCards / cardsPerView);
}

// ==========================================
// UPDATE SLIDER POSITION
// ==========================================
function updateSlider() {
    cardsPerView = getCardsPerView();
    const maxIndex = getTotalSlides() - 1;

    // Prevent going beyond last slide
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Calculate offset and apply transform
    const offset = -(currentIndex * 100);
    sliderWrapper.style.transform = `translateX(${offset}%)`;

    // Update dots and buttons
    updateDots();
    updateButtons();
}

// ==========================================
// CREATE DOT INDICATORS
// ==========================================
function createDots() {
    const totalSlides = getTotalSlides();
    dotsContainer.innerHTML = '';

    // Create a dot for each slide
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dotsContainer.appendChild(dot);
    }
}

// ==========================================
// UPDATE ACTIVE DOT
// ==========================================
function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// ==========================================
// UPDATE NAVIGATION BUTTONS STATE
// ==========================================
function updateButtons() {
    const maxIndex = getTotalSlides() - 1;
    prevBtn.disabled = currentIndex === 0;           // Disable prev on first slide
    nextBtn.disabled = currentIndex >= maxIndex;     // Disable next on last slide
}

// ==========================================
// NAVIGATE TO NEXT SLIDE
// ==========================================
function nextSlide() {
    const maxIndex = getTotalSlides() - 1;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
}

// ==========================================
// NAVIGATE TO PREVIOUS SLIDE
// ==========================================
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

// ==========================================
// GO TO SPECIFIC SLIDE
// ==========================================
function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

// ==========================================
// TOGGLE DARK/LIGHT THEME
// ==========================================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// ==========================================
// TOUCH EVENTS FOR MOBILE SWIPE
// ==========================================

// Touch Start - Record starting position
sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    sliderWrapper.style.transition = 'none';  // Disable transition during drag
});

// Touch Move - Move slider with finger
sliderWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const offset = -(currentIndex * 100);
    currentTranslate = offset + (diff / sliderWrapper.offsetWidth * 100);
    sliderWrapper.style.transform = `translateX(${currentTranslate}%)`;
});

// Touch End - Determine if swipe was significant enough
sliderWrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    sliderWrapper.style.transition = 'transform 0.4s ease';  // Re-enable transition

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = 50;  // Minimum swipe distance in pixels

    if (diff > threshold) {
        prevSlide();  // Swiped right
    } else if (diff < -threshold) {
        nextSlide();  // Swiped left
    } else {
        updateSlider();  // Not enough movement, snap back
    }
});

// ==========================================
// MOUSE EVENTS FOR DESKTOP DRAG
// ==========================================

// Mouse Down - Start drag
sliderWrapper.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    sliderWrapper.style.transition = 'none';
    sliderWrapper.style.cursor = 'grabbing';
});

// Mouse Move - Drag slider
sliderWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.clientX;
    const diff = currentX - startX;
    const offset = -(currentIndex * 100);
    currentTranslate = offset + (diff / sliderWrapper.offsetWidth * 100);
    sliderWrapper.style.transform = `translateX(${currentTranslate}%)`;
});

// Mouse Up - End drag
sliderWrapper.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    sliderWrapper.style.transition = 'transform 0.4s ease';
    sliderWrapper.style.cursor = 'grab';

    const endX = e.clientX;
    const diff = endX - startX;
    const threshold = 50;

    if (diff > threshold) {
        prevSlide();
    } else if (diff < -threshold) {
        nextSlide();
    } else {
        updateSlider();
    }
});

// Mouse Leave - Cancel drag if mouse leaves slider
sliderWrapper.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        sliderWrapper.style.transition = 'transform 0.4s ease';
        sliderWrapper.style.cursor = 'grab';
        updateSlider();
    }
});

// Set grab cursor when hovering
sliderWrapper.style.cursor = 'grab';

// ==========================================
// WINDOW RESIZE EVENT
// ==========================================
// Recalculate slider on window resize
window.addEventListener('resize', () => {
    createDots();
    updateSlider();
});

// ==========================================
// INITIALIZE SLIDER ON PAGE LOAD
// ==========================================
createDots();
updateSlider();

// ==========================================
// 7. GALLERY & MODAL
// ==========================================

function initGallery() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;
    let visibleItems = [];

    // Gallery filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Get all visible gallery items
    function getVisibleItems() {
        return Array.from(document.querySelectorAll('.gallery-item')).filter(item =>
            getComputedStyle(item).display !== 'none'
        );
    }

    // Show specific image
    function showImage(item) {
        const img = item.querySelector('img');
        const title = item.dataset.title;

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = title;
    }

    // Close modal
    function closeGalleryModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Open modal
    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            visibleItems = getVisibleItems();
            currentImageIndex = visibleItems.indexOf(item);

            const img = item.querySelector('img');
            const title = item.dataset.title;

            modal.style.display = 'block';
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.textContent = title;

            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn?.addEventListener('click', closeGalleryModal);

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    // Navigate to previous image
    prevBtn?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        showImage(visibleItems[currentImageIndex]);
    });

    // Navigate to next image
    nextBtn?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        showImage(visibleItems[currentImageIndex]);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal?.style.display === 'block') {
            if (e.key === 'Escape') closeGalleryModal();
            else if (e.key === 'ArrowLeft') prevBtn?.click();
            else if (e.key === 'ArrowRight') nextBtn?.click();
        }
    });
}

// ==========================================
// 8. BLOG SECTION
// ==========================================

function initBlog() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Modal Functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            modal.addEventListener('click', function (e) {
                if (e.target === modal) closeModal(modalId);
            });
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    window.openModal = openModal;
    window.closeModal = closeModal;

    // Close modal with escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.blog-modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Read more buttons
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const card = this.closest('.blog-card');
            const modalId = card?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (modalId) openModal(modalId);
        });
    });

    // Blog image hover effect
    document.querySelectorAll('.blog-image').forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Add scroll progress for modals
    function addScrollProgress() {
        document.querySelectorAll('.blog-modal').forEach(modal => {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color), #ff6b6b);
                z-index: 10000;
                transition: width 0.1s ease;
            `;
            modal.appendChild(progressBar);

            modal.addEventListener('scroll', function () {
                const scrollTop = this.scrollTop;
                const scrollHeight = this.scrollHeight - this.clientHeight;
                const scrollPercent = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        });
    }

    addScrollProgress();

    // Calculate reading time
    function calculateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }

    // Update reading times
    document.querySelectorAll('.blog-modal .modal-text').forEach(modalText => {
        const readingTime = calculateReadingTime(modalText.textContent);
        const modal = modalText.closest('.blog-modal');
        const timeElement = modal?.querySelector('.modal-meta .fa-clock')?.parentNode;
        if (timeElement) {
            timeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
        }
    });

    // Search functionality
    window.searchBlogs = function (query) {
        const cards = document.querySelectorAll('.blog-card');
        const searchTerm = query.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.blog-tag') || []).map(tag => tag.textContent.toLowerCase());

            const matches = title.includes(searchTerm) ||
                excerpt.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm));

            if (matches || query === '') {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Social share functionality
    window.shareArticle = function (title, url) {
        if (navigator.share) {
            navigator.share({ title: title, url: url });
        } else {
            const shareText = `Check out this article: ${title} ${url}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    // Bookmark functionality
    window.toggleBookmark = function (articleId) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const index = bookmarks.indexOf(articleId);

        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(articleId);
        }

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        updateBookmarkIcons();
    };

    function updateBookmarkIcons() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            const articleId = btn.dataset.articleId;
            const icon = btn.querySelector('i');
            if (bookmarks.includes(articleId)) {
                icon?.classList.remove('far');
                icon?.classList.add('fas');
                btn.classList.add('bookmarked');
            } else {
                icon?.classList.remove('fas');
                icon?.classList.add('far');
                btn.classList.remove('bookmarked');
            }
        });
    }

    updateBookmarkIcons();

    // Intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.blog-card, .seo-feature').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// 9. PRICING / MEMBERSHIP PLANS
// ==========================================

function initPricing() {
    let selectedCard = null;

    window.setBilling = function (type) {
        const buttons = document.querySelectorAll('.billing-option');
        const prices = document.querySelectorAll('.plan-price');
        const oldPrices = document.querySelectorAll('.old-price');
        const periods = document.querySelectorAll('.plan-period');
        const discountBadges = document.querySelectorAll('.discount-badge');

        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        prices.forEach((price, index) => {
            const monthly = price.dataset.monthly;
            const halfYearly = price.dataset.halfYearly;
            const annual = price.dataset.annual;
            const oldPrice = oldPrices[index];
            const period = periods[index];
            const badge = discountBadges[index];

            if (type === 'half-yearly') {
                if (oldPrice?.dataset.halfYearly) {
                    oldPrice.textContent = oldPrice.dataset.halfYearly;
                    oldPrice.style.display = 'block';
                }
                price.textContent = `₹${halfYearly}`;
                period.textContent = '/6 months';

                if (!price.closest('.student')) {
                    badge.style.display = 'inline-block';
                    badge.textContent = 'Save 17%';
                }
            } else if (type === 'annual') {
                if (oldPrice?.dataset.annual) {
                    oldPrice.textContent = oldPrice.dataset.annual;
                    oldPrice.style.display = 'block';
                }
                price.textContent = `₹${annual}`;
                period.textContent = '/year';

                if (!price.closest('.student')) {
                    badge.style.display = 'inline-block';
                    badge.textContent = 'Save 17%';
                }
            } else {
                oldPrice.style.display = 'none';
                price.textContent = `₹${monthly}`;
                period.textContent = '/month';

                if (!price.closest('.student')) {
                    badge.style.display = 'none';
                }
            }

            if (price.closest('.student')) {
                badge.style.display = 'inline-block';
                badge.textContent = 'Student Discount 35%';
            }
        });
    };

    // Plan button interactions
    document.querySelectorAll('.plan-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const planName = this.closest('.pricing-card')?.querySelector('.plan-name')?.textContent;
            window.open(`https://wa.me/6381389118?text=Hello XTREME BODY!%0APlan Name:${planName}%0AConfirm this plan`, '_blank');
        });
    });
}

// ==========================================
// 10. CONTACT FORM & WHATSAPP
// ==========================================

function initContactForm() {
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = encodeURIComponent(document.getElementById('userName')?.value || '');
        const email = encodeURIComponent(document.getElementById('userEmail')?.value || '');
        const msg = encodeURIComponent(document.getElementById('userMessage')?.value || '');
        window.open(`https://wa.me/6381389118?text=Hello XTREME BODY!%0AName:${name}%0AEmail:${email}%0AMessage:${msg}`, '_blank');
    });
}

// ==========================================
// 11. FLOATING & MISC EFFECTS
// ==========================================

function initFloatingEffects() {
    window.addEventListener('load', () => {
        document.querySelector('.hero-content')?.classList.add('floating');
    });
}

// ==========================================
// 12. AOS INITIALIZATION
// ==========================================

function initAOS() {
    AOS.init({
        duration: 1000,
        once: true
    });
}

// ==========================================
// MASTER INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all sections
    initHeroCarousel();
    initNavigation();
    initThemeToggle();
    initStatCards();
    initPrimaryButtons();
    initServiceCards();
    // initTestimonials();
    initGallery();
    initBlog();
    initPricing();
    initContactForm();
    initFloatingEffects();
    initAOS();
});