export const moveSlide = (n) => {
    console.log('moving');
    const slides = document.getElementsByClassName('header-item');
    let currentSlideIndex = -1;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('active')) {
        currentSlideIndex = i;
        break;
      }
    }
    if (currentSlideIndex >= 0) {
      slides[currentSlideIndex].classList.remove('active');
      const nextSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;
      slides[nextSlideIndex].classList.add('active');
    }
  };
  
  export const currentSlide = (n) => {
    console.log('moving on box');
    const slides = document.getElementsByClassName("header-item");
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    slides[n - 1].classList.add("active");
  };