// DSX Audio - Main JavaScript

// ===========================
// Smooth Scroll Navigation
// ===========================
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".dark-nav-link, .footer-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const headerHeight = 80;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update active link
          updateActiveNavLink(targetId);

          // Close mobile menu if open
          closeMobileMenu();
        }
      }
    });
  });
}

// ===========================
// Active Navigation Link
// ===========================
function updateActiveNavLink(activeId) {
  const navLinks = document.querySelectorAll(".dark-nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-target") === activeId) {
      link.classList.add("active");
    }
  });
}

// Update active link on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".dark-nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-target") === current) {
        link.classList.add("active");
      }
    });
  });
}

// ===========================
// Mobile Menu Toggle
// ===========================
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mainNav.classList.toggle("active");
    });
  }
}

function closeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.classList.remove("active");
    mainNav.classList.remove("active");
  }
}

// ===========================
// Header Scroll Effect
// ===========================
function initHeaderScroll() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for elements in the same container
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ===========================
// Lazy Load Images
// ===========================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-load");

  const imageObserverOptions = {
    threshold: 0,
    rootMargin: "50px",
  };

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const highResSrc = img.getAttribute("data-src");

        if (highResSrc) {
          // Create a new image to preload
          const tempImage = new Image();
          tempImage.onload = function () {
            img.src = highResSrc;
            img.classList.add("loaded");
          };
          tempImage.src = highResSrc;
        }

        imageObserver.unobserve(img);
      }
    });
  }, imageObserverOptions);

  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });
}

// ===========================
// Gallery Image Click
// ===========================
function initGalleryInteractions() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector(".gallery-image");
      const highResSrc = img.getAttribute("data-src") || img.src;

      // You can implement a lightbox here
      // For now, just open in new tab
      window.open(highResSrc, "_blank");
    });
  });
}

// ===========================
// Parallax Effect for Hero
// ===========================
function initParallaxEffect() {
  const splineContainer = document.querySelector(".spline-container");

  if (splineContainer) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const parallaxSpeed = 0.3;

      if (scrolled < window.innerHeight) {
        splineContainer.style.transform = `translateY(${
          scrolled * parallaxSpeed
        }px)`;
      }
    });
  }
}

// ===========================
// Service Cards Hover Effect
// ===========================
function initServiceCardEffects() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.setProperty("--hover-scale", "1.02");
    });

    card.addEventListener("mouseleave", function () {
      this.style.setProperty("--hover-scale", "1");
    });
  });
}

// ===========================
// Initialize All Functions
// ===========================
function init() {
  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
}

function initializeApp() {
  console.log("DSX Audio - Website Initialized");

  // Initialize all features
  initSmoothScroll();
  initScrollSpy();
  initMobileMenu();
  initHeaderScroll();
  initScrollAnimations();
  initLazyLoading();
  initGalleryInteractions();
  initParallaxEffect();
  initServiceCardEffects();

  // Trigger animations for elements already in view
  setTimeout(() => {
    const visibleElements = document.querySelectorAll(".animate-on-scroll");
    visibleElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add("animated");
      }
    });
  }, 100);
}

// Start the application
init();
