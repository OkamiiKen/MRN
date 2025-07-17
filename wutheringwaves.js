// Wuthering Waves - Using Splide for character gallery
let currentSlide = 0;
let splide;

// Function to change video background based on character selection
function goToSlide(slideIndex) {
    console.log(`🌊 Switching to character ${slideIndex + 1}`);
    
    // Update video background
    const videoSlides = document.querySelectorAll('.video-slide');
    const infoSlides = document.querySelectorAll('.info-slide');
    
    // Remove active class from all elements
    videoSlides.forEach(slide => slide.classList.remove('active'));
    infoSlides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide elements
    if (videoSlides[slideIndex]) videoSlides[slideIndex].classList.add('active');
    if (infoSlides[slideIndex]) infoSlides[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
    
    // Add resonance effect
    createResonanceWave();
    
    console.log(`✨ Character switched! Now showing: ${getCharacterName(slideIndex)}`);
}

// Get character name by index
function getCharacterName(index) {
    const names = ['Rover', 'Jiyan', 'Yinlin', 'Calcharo'];
    return names[index] || 'Unknown';
}

// Create resonance wave effect
function createResonanceWave() {
    const wave = document.createElement('div');
    wave.className = 'resonance-wave';
    wave.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid #00D4AA;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
        animation: resonanceExpand 1s ease-out forwards;
    `;
    
    document.body.appendChild(wave);
    
    // Remove wave after animation
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 1000);
}

// Add resonance wave animation
const style = document.createElement('style');
style.textContent = `
    @keyframes resonanceExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌊 Wuthering Waves - Initializing Splide...');
    
    // Initialize Splide with your configuration
    splide = new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        focus: 'center',
        gap: '2rem',
        padding: '5rem',
        arrows: true,
        pagination: false,
        autoplay: false,
        breakpoints: {
            768: {
                perPage: 2,
                padding: '2rem',
            },
            480: {
                perPage: 1,
                padding: '1rem',
            }
        }
    });
    
    // Listen for slide changes
    splide.on('moved', function(newIndex) {
        console.log(`🎮 Splide moved to slide ${newIndex}`);
        goToSlide(newIndex);
    });
    
    // Add click events to character cards
    splide.on('mounted', function() {
        const slides = document.querySelectorAll('.splide__slide');
        slides.forEach((slide, index) => {
            const characterCard = slide.querySelector('.character-card');
            if (characterCard) {
                characterCard.addEventListener('click', function() {
                    console.log(`🎯 Character card ${index} clicked`);
                    splide.go(index);
                });
            }
        });
        console.log('✅ Character card click events attached');
    });
    
    // Mount the splide
    splide.mount();
    console.log('🎮 Splide mounted successfully!');
    
    // Enhanced particle system
    createFloatingParticles();
    
    console.log('✨ Wuthering Waves - Ready with Splide!');
});

// Enhanced particle system
function createFloatingParticles() {
    const particleContainer = document.querySelector('.resonance-effects');
    if (!particleContainer) return;
    
    // Create additional dynamic particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 2}px;
            height: ${Math.random() * 3 + 2}px;
            background: ${getRandomElementColor()};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: dynamicFloat ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
            pointer-events: none;
        `;
        
        particleContainer.appendChild(particle);
    }
}

function getRandomElementColor() {
    const colors = ['#00D4AA', '#4ECDC4', '#667eea', '#00F5CC'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add dynamic particle animation
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
    @keyframes dynamicFloat {
        0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-30px) translateX(10px) scale(1.3);
            opacity: 1;
        }
        50% {
            transform: translateY(-60px) translateX(-10px) scale(0.7);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-30px) translateX(15px) scale(1.1);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(dynamicStyle);

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (!splide) return;
    
    if (event.key === 'ArrowLeft') {
        console.log('⌨️ Left arrow key - Previous character');
        splide.go('<');
    } else if (event.key === 'ArrowRight') {
        console.log('⌨️ Right arrow key - Next character');
        splide.go('>');
    } else if (event.key >= '1' && event.key <= '4') {
        const slideIndex = parseInt(event.key) - 1;
        console.log(`⌨️ Number key ${event.key} - Character ${getCharacterName(slideIndex)}`);
        splide.go(slideIndex);
    }
});

// Touch/swipe support (Splide handles this automatically, but we can add custom logic)
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
    if (!splide) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            console.log('👆 Swipe right - Previous character');
            splide.go('<');
        } else {
            console.log('👆 Swipe left - Next character');
            splide.go('>');
        }
    }
}

// Debug function
window.testWutheringWaves = function() {
    console.log('🧪 Testing Wuthering Waves with Splide...');
    console.log('Current character:', getCharacterName(currentSlide));
    console.log('Splide instance:', splide);
    console.log('Video slides found:', document.querySelectorAll('.video-slide').length);
    console.log('Info slides found:', document.querySelectorAll('.info-slide').length);
    console.log('Character cards found:', document.querySelectorAll('.character-card').length);
    console.log('Splide slides found:', document.querySelectorAll('.splide__slide').length);
};

console.log('🌊 Wuthering Waves script loaded - Ready for Splide!');
