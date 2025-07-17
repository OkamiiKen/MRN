// OSU Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('main-video');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentIndex = 0;

    function updateActiveItem(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        const videoSrc = carouselItems[index].getAttribute('data-video');
        if (videoSrc) {
            video.src = videoSrc;
            video.load();
            video.play();
        }
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateActiveItem(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateActiveItem(currentIndex);
    }

    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateActiveItem(currentIndex);
        });
    });

    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Initialize
    updateActiveItem(currentIndex);
});
