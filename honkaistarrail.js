let currentSlide = 0;
const totalSlides = 5;
let autoPlayInterval;

// Function to change slide (video, character, text, dots)
function goToSlide(slideIndex) {
    console.log(`🎮 Going to slide ${slideIndex + 1}`);

    const videoSlides = document.querySelectorAll('.video-slide');
    const characterSlides = document.querySelectorAll('.character-slide');
    const textSlides = document.querySelectorAll('.text-slide');
    const dots = document.querySelectorAll('.dot');

    // Remove active classes & pause/reset videos
    videoSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if (video) {
            if (i === slideIndex) {
                slide.classList.add('active');
                video.play().catch(e => console.log('Video play error:', e));
            } else {
                video.pause();
                video.currentTime = 0;
            }
        }
    });

    characterSlides.forEach(slide => slide.classList.remove('active'));
    textSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (characterSlides[slideIndex]) characterSlides[slideIndex].classList.add('active');
    if (textSlides[slideIndex]) textSlides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');

    currentSlide = slideIndex;
    console.log(`✅ Switched to slide ${slideIndex + 1}: Character and video synced!`);
}

// Next and Prev navigation
function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}

// Auto-play controls
function startAutoPlay() {
    stopAutoPlay(); // Clear previous if any
    autoPlayInterval = setInterval(() => {
        console.log('🔄 Auto-play: moving to next slide');
        nextSlide();
    }, 5000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        console.log('⏸️ Auto-play paused');
        autoPlayInterval = null;
    }
}

// DOM Loaded setup
document.addEventListener('DOMContentLoaded', function () {
    console.log('🌌 DOM loaded, setting up Honkai Star Rail page...');

    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const dots = document.querySelectorAll('.dot');

    if (leftArrow) {
        leftArrow.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('⬅️ Left arrow clicked');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
        console.log('✅ Left arrow event attached');
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('➡️ Right arrow clicked');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
        console.log('✅ Right arrow event attached');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            console.log(`🔘 Dot ${index + 1} clicked`);
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    console.log(`✅ ${dots.length} dot events attached`);

    // Auto-play start
    startAutoPlay();

    // Pause auto-play on hover
    const mainContainer = document.querySelector('.honkai-main');
    if (mainContainer) {
        mainContainer.addEventListener('mouseenter', stopAutoPlay);
        mainContainer.addEventListener('mouseleave', startAutoPlay);
        console.log('✅ Auto-play pause on hover enabled');
    }

    console.log('🎮 Honkai Star Rail page setup complete!');
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        console.log('⌨️ Left arrow key pressed');
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    } else if (event.key === 'ArrowRight') {
        console.log('⌨️ Right arrow key pressed');
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    } else if (event.key >= '1' && event.key <= '5') {
        const slideIndex = parseInt(event.key) - 1;
        console.log(`⌨️ Number key ${event.key} pressed`);
        stopAutoPlay();
        goToSlide(slideIndex);
        startAutoPlay();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        stopAutoPlay();
        if (swipeDistance > 0) {
            console.log('👆 Swipe right detected');
            prevSlide();
        } else {
            console.log('👆 Swipe left detected');
            nextSlide();
        }
        startAutoPlay();
    }
}
