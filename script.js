// Function to handle home button click
function goHome() {
    // Refresh the page to go back to home
    window.location.reload();
    console.log('Home button clicked - returning to homepage');
}

// Function to handle "Let's Play" button click
function letsPlay() {
    // Placeholder for now - you mentioned to ignore redirect functionality
    console.log('Let\'s Play button clicked!');
    alert('Let\'s Play! (Redirect functionality to be implemented later)');
}

// Add some extra interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add click sound effect simulation (console log)
    const clickableElements = document.querySelectorAll('button');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function() {
            console.log('Click sound effect would play here');
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // Press 'H' to go home
        if (event.key.toLowerCase() === 'h') {
            goHome();
        }
        
        // Press 'P' for Let's Play
        if (event.key.toLowerCase() === 'p') {
            letsPlay();
        }
    });

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Console welcome message
    console.log('🎮 Gaming Portfolio Website Loaded!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   H - Go Home');
    console.log('   P - Let\'s Play');
});

// Add some visual feedback for button presses
function addButtonFeedback() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize button feedback when page loads
document.addEventListener('DOMContentLoaded', addButtonFeedback);

// Add a subtle animation to the main title
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.8s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add glow effect to home button on hover
document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.querySelector('.home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 188, 212, 0.8)';
        });
        
        homeBtn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    }
});
