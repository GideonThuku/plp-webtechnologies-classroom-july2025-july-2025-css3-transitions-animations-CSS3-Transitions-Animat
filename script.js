/* ===========================================
   PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES
   =========================================== */

// Global Variables (Global Scope)
let animationState = {
    isAnimating: false,
    currentAnimation: null,
    animationCount: 0
};

let statsAnimated = false;
let currentPage = 'home';

/* ===========================================
   PAGE NAVIGATION SYSTEM
   =========================================== */

/**
 * Function to show specific page
 * @param {string} pageId - ID of the page to show
 * @returns {boolean} - Success status
 */
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update navigation active state
        updateNavigation(pageId);
        
        // Trigger page-specific animations
        triggerPageAnimations(pageId);
        
        return true;
    }
    return false;
}

/**
 * Function to update navigation active state
 * @param {string} activePageId - ID of the active page
 * @returns {void}
 */
function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().replace(' ', '-') === activePageId || 
            (activePageId === 'home' && link.textContent === 'Home') ||
            (activePageId === 'about' && link.textContent === 'About Us') ||
            (activePageId === 'what-we-do' && link.textContent === 'What We Do') ||
            (activePageId === 'contact' && link.textContent === 'Contact')) {
            link.classList.add('active');
        }
    });
}

/**
 * Function to trigger page-specific animations
 * @param {string} pageId - ID of the page
 * @returns {void}
 */
function triggerPageAnimations(pageId) {
    // Reset stats animation flag when navigating to about page
    if (pageId === 'about') {
        statsAnimated = false;
        setTimeout(() => {
            animateStats();
        }, 500);
    }
    
    // Animate elements on page load
    const animatedElements = document.querySelectorAll(`#${pageId} .fade-in, #${pageId} .slide-in-left, #${pageId} .slide-in-right, #${pageId} .slide-in-up`);
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0)';
        }, index * 200);
    });
}

/**
 * Function to toggle mobile menu
 * @returns {void}
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/* ===========================================
   UTILITY FUNCTIONS WITH PARAMETERS AND RETURN VALUES
   =========================================== */

/**
 * Utility function to add class with animation delay
 * @param {HTMLElement} element - The element to animate
 * @param {string} className - The class name to add
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise} - Promise that resolves when animation is complete
 */
function addClassWithDelay(element, className, delay = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (element) {
                element.classList.add(className);
                resolve(true);
            } else {
                resolve(false);
            }
        }, delay);
    });
}

/**
 * Function to calculate animation duration based on element size
 * @param {HTMLElement} element - The element to measure
 * @returns {number} - Calculated duration in milliseconds
 */
function calculateAnimationDuration(element) {
    if (!element) return 300;
    
    const rect = element.getBoundingClientRect();
    const area = rect.width * rect.height;
    
    // Larger elements get longer animations (min 300ms, max 1000ms)
    return Math.min(Math.max(area / 1000, 300), 1000);
}

/**
 * Function to generate random animation properties
 * @param {string} type - Type of animation ('bounce', 'slide', 'fade')
 * @returns {object} - Object containing animation properties
 */
function generateAnimationProperties(type = 'bounce') {
    const properties = {
        bounce: {
            duration: Math.random() * 500 + 500,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            transform: `scale(${0.8 + Math.random() * 0.4})`
        },
        slide: {
            duration: Math.random() * 300 + 200,
            easing: 'ease-out',
            transform: `translateX(${Math.random() * 20 - 10}px)`
        },
        fade: {
            duration: Math.random() * 400 + 300,
            easing: 'ease-in-out',
            opacity: Math.random() * 0.3 + 0.7
        }
    };
    
    return properties[type] || properties.bounce;
}

/* ===========================================
   PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT
   =========================================== */

/**
 * Function to show modal with slide-in animation
 * @param {string} modalId - ID of the modal to show
 * @returns {boolean} - Success status
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return false;
    
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Add click outside to close functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
    
    return true;
}

/**
 * Function to close modal with fade-out animation
 * @param {string} modalId - ID of the modal to close
 * @returns {boolean} - Success status
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return false;
    
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    return true;
}

/**
 * Function to flip card with 3D animation
 * @param {HTMLElement} card - The card element to flip
 * @returns {boolean} - Success status
 */
function flipCard(card) {
    if (!card) return false;
    
    // Local variable (Local Scope)
    const isFlipped = card.classList.contains('flipped');
    
    if (isFlipped) {
        card.classList.remove('flipped');
    } else {
        card.classList.add('flipped');
    }
    
    // Update global animation count
    animationState.animationCount++;
    
    return true;
}

/**
 * Function to animate card with bounce effect
 * @param {string} cardId - ID of the card to animate
 * @returns {Promise} - Promise that resolves when animation completes
 */
function animateCard(cardId) {
    return new Promise((resolve) => {
        const card = document.getElementById(cardId);
        if (!card) {
            resolve(false);
            return;
        }
        
        // Local variables for animation properties
        const originalTransform = card.style.transform;
        const animationDuration = calculateAnimationDuration(card);
        
        card.style.transition = `transform ${animationDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        card.style.transform = 'scale(1.1) rotate(5deg)';
        
        setTimeout(() => {
            card.style.transform = originalTransform;
            resolve(true);
        }, animationDuration);
    });
}

/**
 * Function to highlight card with glow effect
 * @param {HTMLElement} card - The card element to highlight
 * @returns {void}
 */
function highlightCard(card) {
    if (!card) return;
    
    // Remove highlight from all other cards (Local Scope)
    const allCards = document.querySelectorAll('.approach-card');
    allCards.forEach(c => c.classList.remove('highlighted'));
    
    // Add highlight to clicked card
    card.classList.add('highlighted');
    
    // Auto-remove highlight after 3 seconds
    setTimeout(() => {
        card.classList.remove('highlighted');
    }, 3000);
}

/**
 * Function to expand pillar with smooth animation
 * @param {HTMLElement} pillar - The pillar element to expand
 * @returns {boolean} - Success status
 */
function expandPillar(pillar) {
    if (!pillar) return false;
    
    // Local variable to track expansion state
    const isExpanded = pillar.classList.contains('expanded');
    
    // Collapse all other pillars
    const allPillars = document.querySelectorAll('.pillar-card');
    allPillars.forEach(p => p.classList.remove('expanded'));
    
    // Toggle current pillar
    if (!isExpanded) {
        pillar.classList.add('expanded');
        
        // Smooth scroll to pillar
        pillar.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    return true;
}

/**
 * Function to animate timeline item with bounce effect
 * @param {HTMLElement} item - The timeline item to animate
 * @returns {void}
 */
function animateTimelineItem(item) {
    if (!item) return;
    
    // Add animated class for CSS animation
    item.classList.add('animated');
    
    // Remove class after animation completes
    setTimeout(() => {
        item.classList.remove('animated');
    }, 600);
}

/**
 * Function to animate number counting
 * @param {HTMLElement} element - Element containing the number
 * @param {number} target - Target number to count to
 * @param {number} duration - Duration of animation in milliseconds
 * @returns {void}
 */
function animateNumber(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/**
 * Function to animate statistics when they come into view
 * @returns {void}
 */
function animateStats() {
    if (statsAnimated) return;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateNumber(stat, target, 2000);
    });
    
    statsAnimated = true;
}

/* ===========================================
   DEMO SECTION ANIMATION CONTROLS
   =========================================== */

/**
 * Function to start demo animation
 * @returns {boolean} - Success status
 */
function startAnimation() {
    const demoBox = document.getElementById('demoBox');
    if (!demoBox || animationState.isAnimating) return false;
    
    // Local variables for animation control
    const animationTypes = ['spinning', 'bouncing'];
    const randomType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
    
    demoBox.classList.add(randomType);
    animationState.isAnimating = true;
    animationState.currentAnimation = randomType;
    
    return true;
}

/**
 * Function to stop demo animation
 * @returns {boolean} - Success status
 */
function stopAnimation() {
    const demoBox = document.getElementById('demoBox');
    if (!demoBox || !animationState.isAnimating) return false;
    
    demoBox.classList.remove(animationState.currentAnimation);
    animationState.isAnimating = false;
    animationState.currentAnimation = null;
    
    return true;
}

/**
 * Function to reset demo to initial state
 * @returns {boolean} - Success status
 */
function resetDemo() {
    const demoBox = document.getElementById('demoBox');
    if (!demoBox) return false;
    
    // Stop any current animation
    stopAnimation();
    
    // Reset styles
    demoBox.style.transform = '';
    demoBox.style.transition = '';
    
    // Reset global state
    animationState.animationCount = 0;
    
    return true;
}

/* ===========================================
   FORM HANDLING
   =========================================== */

/**
 * Function to handle form submission
 * @param {Event} event - Form submission event
 * @returns {boolean} - Success status
 */
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Animate form submission
    form.style.transform = 'scale(0.95)';
    form.style.opacity = '0.7';
    
    // Simulate form processing
    setTimeout(() => {
        form.style.transform = 'scale(1)';
        form.style.opacity = '1';
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    }, 1000);
    
    return false;
}

/* ===========================================
   INITIALIZATION AND EVENT LISTENERS
   =========================================== */

/**
 * Function to hide loading screen
 * @returns {void}
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

/**
 * Function to initialize scroll animations
 * @returns {void}
 */
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when they come into view
                if (entry.target.classList.contains('stats-card')) {
                    animateStats();
                }
                
                // Add animation classes to elements
                if (entry.target.classList.contains('text-block')) {
                    const animationClass = entry.target.dataset.animation || 'slide-in-left';
                    entry.target.classList.add(animationClass);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.text-block, .stats-card, .pillar-card');
    elementsToObserve.forEach(el => observer.observe(el));
}

/**
 * Function to initialize staggered animations
 * @returns {void}
 */
function initStaggeredAnimations() {
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease';
        }, index * 200);
    });
    
    // Initialize text blocks with data attributes for animations
    const textBlocks = document.querySelectorAll('.text-block');
    textBlocks.forEach((block, index) => {
        const animations = ['slide-in-left', 'slide-in-right', 'slide-in-up'];
        block.dataset.animation = animations[index % animations.length];
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
    });
}

/**
 * Main initialization function
 * @returns {void}
 */
function initializeApp() {
    // Hide loading screen after 1.5 seconds
    setTimeout(hideLoadingScreen, 1500);
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize staggered animations
    initStaggeredAnimations();
    
    // Show home page by default
    showPage('home');
    
    console.log('App initialized successfully!');
    console.log('Current page:', currentPage);
    console.log('Animation state:', animationState);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);

// Keyboard event listeners for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalId = modal.id;
            closeModal(modalId);
        });
    }
    
    // Navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showPage('home');
                break;
            case '2':
                e.preventDefault();
                showPage('about');
                break;
            case '3':
                e.preventDefault();
                showPage('what-we-do');
                break;
            case '4':
                e.preventDefault();
                showPage('contact');
                break;
        }
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    // Recalculate animations on resize
    const animatedElements = document.querySelectorAll('.animated-box');
    animatedElements.forEach(element => {
        const duration = calculateAnimationDuration(element);
        element.style.animationDuration = `${duration}ms`;
    });
});

/* ===========================================
   DEMONSTRATION OF SCOPE CONCEPTS
   =========================================== */

// Global scope variable
var globalMessage = "This is accessible everywhere";

function demonstrateScope() {
    // Function scope variable
    var functionMessage = "This is only accessible within this function";
    
    if (true) {
        // Block scope variable (let/const)
        let blockMessage = "This is only accessible within this block";
        const constantMessage = "This constant is also block-scoped";
        
        console.log("Inside block:", blockMessage, constantMessage);
    }
    
    console.log("Inside function:", functionMessage);
    console.log("Global access:", globalMessage);
    
    // Return function-scoped variable
    return functionMessage;
}

// Example of closure (function returning function with access to outer scope)
function createAnimationController(elementId) {
    // This variable is captured in the closure
    const element = document.getElementById(elementId);
    let animationCount = 0;
    
    return {
        animate: function() {
            if (element) {
                animationCount++;
                element.style.transform = `rotate(${animationCount * 45}deg)`;
                return animationCount;
            }
            return 0;
        },
        reset: function() {
            if (element) {
                animationCount = 0;
                element.style.transform = '';
                return true;
            }
            return false;
        },
        getCount: function() {
            return animationCount;
        }
    };
}

// Usage example (uncomment to test):
// const boxController = createAnimationController('demoBox');
// boxController.animate(); // Returns 1
// boxController.animate(); // Returns 2
// console.log(boxController.getCount()); // Returns current count
// boxController.reset(); // Resets animation and count