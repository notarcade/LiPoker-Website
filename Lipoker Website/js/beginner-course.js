// beginner-course.js
const slideTrack = document.querySelector('.slide-track');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function updateSlides(direction) {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });

  slides[currentSlide].classList.add('active');
}

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlides('next');
    }
  });
});

document.querySelectorAll('[data-prev]').forEach(button => {
  button.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlides('prev');
    }
  });
});

// Init
updateSlides();
