document.addEventListener('DOMContentLoaded', () => {
  const slidesWrapper = document.getElementById('slidesWrapper');
  const slides = document.querySelectorAll('.slide');

  let currentIndex = 0;

  function updateCarousel() {
    const offset = currentIndex * -100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;
    const dots = document.querySelectorAll('#carouselDots .dot');
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentIndex) {
        dot.classList.add('active');
      }
    });
    updateControlButtons();
  }
  function updateControlButtons() {
    document.getElementById('prevSlide').disabled = currentIndex === 0;
    document.getElementById('nextSlide').disabled =
      currentIndex === slides.length - 1;
  }

  const dotsContainer = document.getElementById('carouselDots');
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add(
      'dot',
      'cursor-pointer',
      'h-2',
      'w-2',
      'bg-gray-400',
      'rounded-full'
    );
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  document.getElementById('nextSlide').addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  document.getElementById('prevSlide').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
});
