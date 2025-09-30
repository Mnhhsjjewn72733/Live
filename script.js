
/* ================================
   Testimonial Slider Class
================================ */
class TestimonialSlider {
    constructor() {
        this.carousel = document.getElementById('testimonialCarousel');
        this.bootstrapCarousel = new bootstrap.Carousel(this.carousel, {
            interval: 5000,
            ride: 'carousel',
            wrap: true
        });
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.carousel-item').length;
        this.isAnimating = false;
        this.startX = this.endX = this.startY = this.endY = 0;
        this.isDragging = false;
        this.init();
    }

    init() {
        this.handleResize();
        this.setupEventListeners();
        this.updateDots();
        this.animateOnLoad();
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        const width = window.innerWidth;
        const cards = document.querySelectorAll('.testimonial-slide');

        cards.forEach((card, index) => {
            const col = card.closest('[class*="col-"]');
            if (!col) return;

            if (width < 768) {
                col.style.display = (index % 3 === 0) ? 'block' : 'none';
                col.className = 'col-12';
            } else if (width < 1024) {
                col.style.display = (index % 3 < 2) ? 'block' : 'none';
                col.className = 'col-md-6 col-12';
            } else {
                col.style.display = 'block';
                col.className = 'col-lg-4 col-md-6 col-12';
            }
        });
    }

    setupEventListeners() {
        // Bootstrap carousel events
        this.carousel.addEventListener('slide.bs.carousel', (e) => {
            this.currentSlide = e.to;
            this.updateDots();
        });

        this.carousel.addEventListener('slid.bs.carousel', () => {
            this.isAnimating = false;
        });

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.bootstrapCarousel.pause());
        this.carousel.addEventListener('mouseleave', () => !this.isDragging && this.bootstrapCarousel.cycle());

        // Touch swipe
        this.carousel.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.bootstrapCarousel.pause();
        }, { passive: true });

        this.carousel.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.handleSwipe();
            setTimeout(() => this.bootstrapCarousel.cycle(), 200);
        });

        // Mouse drag
        let isDragging = false, startMouseX = 0, startMouseY = 0;
        this.carousel.addEventListener('mousedown', (e) => {
            isDragging = true; this.isDragging = true;
            startMouseX = e.clientX; startMouseY = e.clientY;
            this.bootstrapCarousel.pause();
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                isDragging = false;
                this.startX = startMouseX; this.endX = e.clientX;
                this.startY = startMouseY; this.endY = e.clientY;
                this.handleSwipe();
                setTimeout(() => { this.isDragging = false; this.bootstrapCarousel.cycle(); }, 200);
            }
        });

        // Keyboard nav
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Visibility pause
        document.addEventListener('visibilitychange', () => {
            document.hidden ? this.bootstrapCarousel.pause() : this.bootstrapCarousel.cycle();
        });

        // Button clicks
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goToSlide(i)));
    }

    updateDots() {
        this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentSlide));
        this.updateNavButtons();
    }

    updateNavButtons() {
        if (this.prevBtn) this.prevBtn.disabled = this.currentSlide === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    nextSlide() {
        if (!this.isAnimating && this.currentSlide < this.totalSlides - 1) {
            this.isAnimating = true;
            this.bootstrapCarousel.next();
        }
    }

    previousSlide() {
        if (!this.isAnimating && this.currentSlide > 0) {
            this.isAnimating = true;
            this.bootstrapCarousel.prev();
        }
    }

    goToSlide(i) {
        if (!this.isAnimating && i !== this.currentSlide) {
            this.isAnimating = true;
            this.bootstrapCarousel.to(i);
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const distX = this.startX - this.endX;
        if (Math.abs(distX) > swipeThreshold && Math.abs(distX) > Math.abs(this.startY - this.endY)) {
            distX > 0 ? this.nextSlide() : this.previousSlide();
        }
    }

    animateOnLoad() {
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 200 + 300); // stagger animation
        });
    }
}

/* ================================
   Global UI Features
================================ */

// Mouse follow hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.style.background = `radial-gradient(300px circle at ${e.clientX}px ${e.clientY}px, rgba(255,0,64,0.1), transparent)`;
});

// Counter animation
function animateCounter(el, target, duration) {
    let start = 0, increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        el.textContent = Math.floor(start);
        if (start >= target) { el.textContent = target; clearInterval(timer); }
    }, 16);
}
setTimeout(() => {
    document.getElementById('members') && animateCounter(document.getElementById('members'), 500, 2000);
    document.getElementById('trainers') && animateCounter(document.getElementById('trainers'), 15, 1500);
}, 6000);

// Scroll to next section
function scrollToNext() {
    const next = document.querySelector('.hero')?.nextElementSibling;
    next?.scrollIntoView({ behavior: 'smooth' });
}

// Stat card hover
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const num = card.querySelector('.stat-number');
        num.style.transform = 'scale(1.2)'; num.style.color = '#00d4ff';
    });
    card.addEventListener('mouseleave', () => {
        const num = card.querySelector('.stat-number');
        num.style.transform = 'scale(1)'; num.style.color = 'var(--neon-red)';
    });
});
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
        // Close mobile menu after click
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Theme switcher with gym elements
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');

    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        icon.className = 'fas fa-weight-hanging gym-icon';
        text.textContent = 'Dark Mode';
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        icon.className = 'fas fa-dumbbell gym-icon';
        text.textContent = 'Light Mode';
    }
}

// Close navbar when clicking outside
document.addEventListener('click', function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbar = document.querySelector('.navbar');

    // Check if click is outside the navbar
    if (!navbar.contains(event.target) && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
});

// Enhanced hamburger animation
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    // Small delay to ensure Bootstrap has updated aria-expanded
    setTimeout(() => {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.classList.toggle('active', isExpanded);
    }, 50);
});

// Prevent navbar close when clicking inside the menu
document.querySelector('.navbar-collapse').addEventListener('click', function (event) {
    event.stopPropagation();
});

// Add smooth transition to theme changes
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.transition = 'all 0.3s ease';
});
// // Gallery filter
// document.addEventListener('DOMContentLoaded', () => {
//     const filterBtns = document.querySelectorAll('.filter-btn');
//     const items = document.querySelectorAll('.gallery-item');
//     filterBtns.forEach(btn => btn.addEventListener('click', () => {
//         const f = btn.getAttribute('data-filter');
//         filterBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active');
//         items.forEach(item => {
//             if (f === 'all' || item.dataset.category === f) {
//                 item.style.display = 'flex'; setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
//             } else {
//                 item.style.opacity = '0'; item.style.transform = 'scale(0.8)';
//                 setTimeout(() => item.style.display = 'none', 300);
//             }
//         });
//     }));
// });

// // Gallery item click
// document.querySelectorAll('.gallery-item').forEach(item =>
//     item.addEventListener('click', () => alert(`Viewing: ${item.querySelector('span').textContent}`))
// );

// Contact form WhatsApp
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('userName').value);
    const email = encodeURIComponent(document.getElementById('userEmail').value);
    const msg = encodeURIComponent(document.getElementById('userMessage').value);
    window.open(`https://wa.me/1234567890?text=Hello XTREME BODY!%0AName:${name}%0AEmail:${email}%0AMessage:${msg}`, '_blank');
});

// Floating hero effect
window.addEventListener('load', () => document.querySelector('.hero-content')?.classList.add('floating'));

// Glow on primary buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 20px rgba(220,53,69,0.6)');
    btn.addEventListener('mouseleave', () => btn.style.boxShadow = '');
});

// Service card icon pulse
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.querySelector('.service-icon')?.classList.add('pulse'));
    card.addEventListener('mouseleave', () => card.querySelector('.service-icon')?.classList.remove('pulse'));
});
const style = document.createElement('style');
style.textContent = `@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}} .pulse{animation:pulse 0.6s ease-in-out}`;
document.head.appendChild(style);

// Testimonial card auto-rotation highlight
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
function rotateTestimonials() {
    testimonials.forEach((c, i) => {
        c.style.transform = i === currentTestimonial ? 'scale(1.05)' : 'scale(1)';
        c.style.boxShadow = i === currentTestimonial ? '0 10px 30px rgba(220,53,69,0.3)' : '';
    });
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}
if (testimonials.length) setInterval(rotateTestimonials, 3000);

/* ================================
   Gallery
================================ */
document.addEventListener('DOMContentLoaded', () => {
    window.slider = new TestimonialSlider();
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Gallery filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
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
});

// Image modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentImageIndex = 0;
let visibleItems = [];

// Get all visible gallery items
function getVisibleItems() {
    return Array.from(document.querySelectorAll('.gallery-item')).filter(item =>
        getComputedStyle(item).display !== 'none'
    );
}

// Open modal
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        visibleItems = getVisibleItems();
        currentImageIndex = visibleItems.indexOf(item);

        const img = item.querySelector('img');
        const title = item.dataset.title;

        modal.style.display = 'block';
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = title;

        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal
function closeGalleryModel() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

closeBtn.addEventListener('click', closeGalleryModel);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGalleryModel();
    }
});

// Navigate to previous image
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage(visibleItems[currentImageIndex]);
});

// Navigate to next image
nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
    showImage(visibleItems[currentImageIndex]);
});

// Show specific image
function showImage(item) {
    const img = item.querySelector('img');
    const title = item.dataset.title;

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalCaption.textContent = title;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeGalleryModel();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
});
// blog section

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add click outside to close
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal with escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.blog-modal');
        openModals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Smooth scroll for read more buttons
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Get the modal ID from the parent card
        const card = this.closest('.blog-card');
        const modalId = card.getAttribute('onclick').match(/'([^']+)'/)[1];
        openModal(modalId);
    });
});

// Add loading animation for images
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
    const modals = document.querySelectorAll('.blog-modal');
    modals.forEach(modal => {
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

// Add theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Add search functionality for blog posts
function searchBlogs(query) {
    const cards = document.querySelectorAll('.blog-card');
    const searchTerm = query.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase());

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
}

// Add reading time calculation
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
}

// Update reading times
document.querySelectorAll('.blog-modal .modal-text').forEach(modalText => {
    const readingTime = calculateReadingTime(modalText.textContent);
    const modal = modalText.closest('.blog-modal');
    const timeElement = modal.querySelector('.modal-meta .fa-clock').parentNode;
    timeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
});

// Add social share functionality
function shareArticle(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Check out this article: ${title} ${url}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Add bookmark functionality
function toggleBookmark(articleId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const index = bookmarks.indexOf(articleId);

    if (index > -1) {
        bookmarks.splice(index, 1);
    } else {
        bookmarks.push(articleId);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarkIcons();
}

function updateBookmarkIcons() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        const articleId = btn.dataset.articleId;
        const icon = btn.querySelector('i');
        if (bookmarks.includes(articleId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.classList.add('bookmarked');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.classList.remove('bookmarked');
        }
    });
}

// Initialize bookmark icons
updateBookmarkIcons();

// Add intersection observer for animations
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

// Performance optimization: Lazy load modal content
const modals = document.querySelectorAll('.blog-modal');
modals.forEach(modal => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Modal is visible, can load heavy content here if needed
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(modal);
});


// servide section 
// Add smooth scrolling and intersection observer for animations
const serviceObserverOptions = {
    threshold: [0, 0.1, 0.2, 0.3],
    rootMargin: '0px 0px -50px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200); // stagger
        }
    });
}, serviceObserverOptions);

document.querySelectorAll('.service-card').forEach(card => {
    serviceObserver.observe(card);
});

// Enhanced smooth intersection observer
// const observerOptions = {
//     threshold: [0, 0.1, 0.2, 0.3],
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver(function(entries) {
//     entries.forEach((entry, index) => {
//         if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
//             setTimeout(() => {
//                 entry.target.classList.add('animate');
//             }, index * 200); // Increased stagger delay
//         }
//     });
// }, observerOptions);

// document.querySelectorAll('.service-card').forEach(card => {
//     observer.observe(card);
// });


// Membership logic
let selectedCard = null;

function setBilling(type) {
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
            // Show old price crossed out for half-yearly
            if (oldPrice.dataset.halfYearly) {
                oldPrice.textContent = oldPrice.dataset.halfYearly;
                oldPrice.style.display = 'block';
            }
            price.textContent = `₹${halfYearly}`;
            period.textContent = '/6 months';

            // Show discount for non-student plans
            if (!price.closest('.student')) {
                badge.style.display = 'inline-block';
                badge.textContent = 'Save 17%';
            }
        } else if (type === 'annual') {
            // Show old price crossed out for annual
            if (oldPrice.dataset.annual) {
                oldPrice.textContent = oldPrice.dataset.annual;
                oldPrice.style.display = 'block';
            }
            price.textContent = `₹${annual}`;
            period.textContent = '/year';

            // Show discount for non-student plans
            if (!price.closest('.student')) {
                badge.style.display = 'inline-block';
                badge.textContent = 'Save 17%';
            }
        } else {
            // Monthly - hide old price and discount
            oldPrice.style.display = 'none';
            price.textContent = `₹${monthly}`;
            period.textContent = '/month';

            // Hide discount badge for non-student plans
            if (!price.closest('.student')) {
                badge.style.display = 'none';
            }
        }

        // Student plan always shows discount
        if (price.closest('.student')) {
            badge.style.display = 'inline-block';
            badge.textContent = 'Student Discount 35%';
        }
    });
}
// Button interactions
document.querySelectorAll('.plan-button').forEach(button => {
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
        window.open(`https://wa.me/6381389118?text=Hello XTREME BODY!%0APlan Name:${planName}%0AConfirm this plan`, '_blank');
        // alert(`Great choice! You've selected the ${planName} plan.`);
    });
});