/* -------------------------
   MOBILE NAV TOGGLE
-------------------------- */
(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("active");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
})();

/* -------------------------
   HEADER SCROLL EFFECT
-------------------------- */
(() => {
  const header = document.querySelector(".site-header");
  const THRESH = 40;
  const updateScroll = () =>
    header.classList.toggle("scrolled", window.scrollY > THRESH);
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll(); // initial state
})();

/* -------------------------
   GALLERY CAROUSEL
-------------------------- */
const imageList = [
  "our-work/image1.jpg",
  "our-work/image2.jpg",
  "our-work/image3.jpg",
  "our-work/image4.jpg",
  "our-work/image5.jpg",
  "our-work/image6.jpg",
  "our-work/image7.jpg",
  "our-work/image8.jpg",
];
let currentIndex = 0;
const img = document.getElementById("carousel-image");
function updateCarousel() {
  img.classList.remove("loaded");
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  const highResImg = new Image();
  highResImg.src = imageList[currentIndex];
  highResImg.onload = () => {
    img.src = highResImg.src;
    img.classList.add("loaded");
  };
}
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  updateCarousel();
});
document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  updateCarousel();
});
updateCarousel();

/* -------------------------
   SERVICES SCROLL ANIMATION
-------------------------- */
const serviceCards = document.querySelectorAll(".service-card");
const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        serviceObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
serviceCards.forEach((card) => serviceObserver.observe(card));

/* -------------------------
   GALLERY SCROLL ANIMATION
-------------------------- */
const carousel = document.querySelector(".carousel");
const carouselObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        carouselObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
carouselObserver.observe(carousel);

/* -------------------------
   CONTACT BOX SCROLL ANIMATION
-------------------------- */
const contactBox = document.querySelector(".contact-box");
const contactObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
contactObserver.observe(contactBox);
