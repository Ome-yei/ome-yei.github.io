const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const carouselNav = document.querySelector(".carousel__nav");
const carouselIndicators = Array.from(carouselNav.children);
let timer = null;

const moveSlide = (currentSlide, targetedSlide) => {
  currentSlide.classList.remove("carousel__slide--active");
  targetedSlide.classList.add("carousel__slide--active");
};

const moveNavIndicator = (currentNavIndicator, targetedNavIndicator) => {
  currentNavIndicator.classList.remove("carousel__nav--active");
  targetedNavIndicator.classList.add("carousel__nav--active");
};

const carouselController = (targetedSlide, targetedIndex) => {
  let nextSlide = targetedSlide;
  let nextIndicator = targetedIndex;

  const currentSlide = track.querySelector(".carousel__slide--active");
  const currentNavIndicator = carouselNav.querySelector(
    ".carousel__nav--active"
  );

  if (!nextSlide)
    nextSlide = currentSlide.nextElementSibling
      ? currentSlide.nextElementSibling
      : slides[0];

  if (!nextIndicator)
    nextIndicator = currentNavIndicator.nextElementSibling
      ? currentNavIndicator.nextElementSibling
      : carouselIndicators[0];

  moveSlide(currentSlide, nextSlide);
  moveNavIndicator(currentNavIndicator, nextIndicator);

  timer = setTimeout(() => carouselController(), 3500);
};

const onNavigationIndicatorClick = (e) => {
  const targetCarouselIndicator = e.target.closest("button");
  if (!targetCarouselIndicator) return;
  clearTimeout(timer);
  const indicatorIndex = carouselIndicators.findIndex(
    (indicator) => indicator === targetCarouselIndicator
  );
  const targetedSlide = slides[indicatorIndex];
  carouselController(targetedSlide, targetCarouselIndicator);
};

setTimeout(() => carouselController(), 3500);
carouselNav.addEventListener("click", onNavigationIndicatorClick);
