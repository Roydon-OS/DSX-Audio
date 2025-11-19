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

// Function to update carousel image with lazy-loading
function updateCarousel() {
  // Temporarily use a small base64 tiny placeholder (1x1 transparent) for quick load
  img.classList.remove("loaded");
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  // Create a new Image to preload the actual one
  const highResImg = new Image();
  highResImg.src = imageList[currentIndex];
  highResImg.onload = () => {
    img.src = highResImg.src;
    img.classList.add("loaded"); // removes blur
  };
}

// Buttons
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  updateCarousel();
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  updateCarousel();
});

// Load first image
updateCarousel();
