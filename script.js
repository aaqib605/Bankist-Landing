"use strict";

///////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Event Delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const targetId = e.target.getAttribute("href");

    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Removing active class from other tabs
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

  clicked.classList.add("operations__tab--active");

  // Activate content area
  const activeContentArea = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );

  tabsContent.forEach((tabContent) =>
    tabContent.classList.remove("operations__content--active")
  );
  activeContentArea.classList.add("operations__content--active");
});

// Menu fade animation
const fadeAnimation = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", fadeAnimation.bind(0.5));
nav.addEventListener("mouseout", fadeAnimation.bind(1));

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries, headerObserver) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const revealSectionOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  revealSectionOptions
);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy load images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const loadImgOptions = {
  root: null,
  threshold: 0,
};

const imgObserver = new IntersectionObserver(loadImg, loadImgOptions);
imgTargets.forEach((img) => imgObserver.observe(img));

// Slider component
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

let currentSlide = 0;
let maxSlides = slides.length;

const goToSlide = function (currentSlide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
  );
};

const nextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  else if (e.key === "ArrowLeft") prevSlide();
});

const createDots = function () {
  slides.forEach((_dot, index) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
