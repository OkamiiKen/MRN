// Valorant page - Fixed JavaScript
let currentSlide = 0;
const totalSlides = 3;

// Function to change slide
function goToSlide(slideIndex) {
    console.log(`🎯 Going to slide ${slideIndex + 1}`);
    
    // Get all elements fresh each time
    const slideContents = document.querySelectorAll('.slide-content');
    const textSlides = document.querySelectorAll('.text-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all elements
    slideContents.forEach(slide => slide.classList.remove('active'));
    textSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide elements
    if (slideContents[slideIndex]) slideContents[slideIndex].classList.add('active');
    if (textSlides[slideIndex]) textSlides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
    console.log(`✅ Switched to slide ${slideIndex + 1}`);
}

// Navigation functions
function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Valorant page loading...');
    
    // Set up arrow click events
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⬅️ Left arrow clicked');
            prevSlide();
        });
        console.log('✅ Left arrow event attached');
    } else {
        console.log('❌ Left arrow not found');
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('➡️ Right arrow clicked');
            nextSlide();
        });
        console.log('✅ Right arrow event attached');
    } else {
        console.log('❌ Right arrow not found');
    }
    
    // Set up dot click events
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`🔘 Dot ${index + 1} clicked`);
            goToSlide(index);
        });
    });
    console.log(`✅ ${dots.length} dot events attached`);
    
    // Auto-play functionality - every 5 seconds
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            console.log('🔄 Auto-play: moving to next slide');
            nextSlide();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        console.log('⏸️ Auto-play paused');
    }
    
    // Start auto-play
    startAutoPlay();
    console.log('▶️ Auto-play started (5 second intervals)');
    
    // Pause auto-play on hover
    const mainContainer = document.querySelector('.valorant-main');
    if (mainContainer) {
        mainContainer.addEventListener('mouseenter', stopAutoPlay);
        mainContainer.addEventListener('mouseleave', startAutoPlay);
        console.log('✅ Auto-play pause on hover enabled');
    }
    
    console.log('🎯 Valorant page setup complete!');
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        console.log('⌨️ Left arrow key pressed');
        prevSlide();
    } else if (event.key === 'ArrowRight') {
        console.log('⌨️ Right arrow key pressed');
        nextSlide();
    } else if (event.key >= '1' && event.key <= '3') {
        const slideIndex = parseInt(event.key) - 1;
        console.log(`⌨️ Number key ${event.key} pressed`);
        goToSlide(slideIndex);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            console.log('👆 Swipe right detected');
            prevSlide();
        } else {
            console.log('👆 Swipe left detected');
            nextSlide();
        }
    }
}

// Debug function
window.testValorant = function() {
    console.log('🧪 Testing Valorant functionality...');
    console.log('Current slide:', currentSlide);
    console.log('Slide contents found:', document.querySelectorAll('.slide-content').length);
    console.log('Text slides found:', document.querySelectorAll('.text-slide').length);
    console.log('Dots found:', document.querySelectorAll('.dot').length);
    console.log('Left arrow found:', !!document.querySelector('.left-arrow'));
    console.log('Right arrow found:', !!document.querySelector('.right-arrow'));
};
