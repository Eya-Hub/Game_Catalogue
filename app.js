// Step 1: Get DOM elements
const nextDom = document.getElementById('next');
const prevDom = document.getElementById('prev');

const carouselDom = document.querySelector('.carousel');
const sliderDom = carouselDom.querySelector('.list');
const thumbnailBorderDom = document.querySelector('.thumbnail');
const thumbnailItemsDom = [...thumbnailBorderDom.querySelectorAll('.item')];
const timeDom = document.querySelector('.time');

let timeRunning = 3000; // Time for transition animation
let timeAutoNext = 7000; // Time for auto-next

let runTimeOut;
let runNextAuto;

const startAutoNext = () => {
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
};

// Add event listeners for buttons
nextDom.addEventListener('click', () => showSlider('next'));
prevDom.addEventListener('click', () => showSlider('prev'));

// Function to handle slider transitions
function showSlider(type) {
    const sliderItemsDom = [...sliderDom.querySelectorAll('.item')];
    const thumbnailItemsDom = [...thumbnailBorderDom.querySelectorAll('.item')];

    if (type === 'next') {
        sliderDom.appendChild(sliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else if (type === 'prev') {
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    startAutoNext();
}

// Initialize auto-next
startAutoNext();

// Dropdown functionality
document.querySelector('.dropdown-btn').addEventListener('click', () => {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

// Close the dropdown if the user clicks outside
window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach((dropdown) => dropdown.classList.remove('show'));
    }
});
