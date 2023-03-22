"use strict";

///////////////////////////////////////
// Modal window

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

// Create and insert the cookie message
const cookieEl = document.createElement("div");
cookieEl.classList.add("cookie-message");
cookieEl.innerHTML = `We use cookies for improved functionality and analytics.
<button class="btn btn--close-cookie">Got it!</button>
`;

header.prepend(cookieEl);

const btnCloseCookieMessage = document.querySelector(".btn--close-cookie");

btnCloseCookieMessage.addEventListener("click", function () {
  cookieEl.remove();
});

cookieEl.style.height =
  parseFloat(getComputedStyle(cookieEl).height) + 50 + "px";

// Smooth scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());

  // console.log(window.scrollX, window.scrollY);

  console
    .log
    // document.documentElement.clientHeight,
    // document.documentElement.clientWidth
    ();

  // console.log(s1Coords.left, s1Coords.top);

  // window.scrollTo({
  //   left: s1Coords.left + window.scrollX,
  //   top: s1Coords.top + window.scrollY,
  //   behavior: "smooth",
  // });

  // section1.scrollIntoView({ behavior: "smooth" });
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
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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
