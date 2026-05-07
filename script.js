const photoFiles = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.1.jpeg",
  "8.2.jpeg",
  "9.jpeg",
  "10.1.jpeg",
  "10.2.jpeg",
  "10.3.jpeg",
  "10.4.jpeg",
  "11.1.jpeg",
  "11.2.jpeg",
  "11.3.jpeg",
  "12.jpeg",
  "13.1.jpeg",
  "13.2.jpeg",
  "14.1.jpeg",
  "14.2.jpeg",
  "14.3.jpeg",
  "14.4.jpeg",
  "14.5.jpeg",
  "14.6.jpeg",
  "14.7.jpeg",
  "14.8.jpeg",
  "14.9.jpeg",
  "30.jpeg",
  "32.jpeg",
  "33.jpeg",
  "34.jpeg",
  "35.jpeg",
  "36.jpeg",
];

const track = document.querySelector(".carousel-track");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const counter = document.querySelector(".carousel-counter");
const priceBadge = document.querySelector(".price-badge");
const contactSection = document.querySelector("#contact");

if (track) {
  photoFiles.forEach((fileName, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide${index === 0 ? " active" : ""}`;
    slide.dataset.src = `poze/${fileName}`;
    slide.dataset.alt = `BMW F40 poza ${index + 1}`;

    const image = document.createElement("img");
    image.alt = slide.dataset.alt;
    image.decoding = "async";

    if (index === 0) {
      image.src = slide.dataset.src;
      image.loading = "eager";
      image.fetchPriority = "high";
      slide.dataset.loaded = "true";
    } else {
      image.loading = "lazy";
    }

    slide.append(image);
    track.append(slide);
  });
}

const slides = document.querySelectorAll(".carousel-slide");
let currentSlide = 0;

function loadSlide(index) {
  const slide = slides[index];
  const image = slide?.querySelector("img");

  if (!slide || !image || slide.dataset.loaded === "true") {
    return;
  }

  image.src = slide.dataset.src;
  slide.dataset.loaded = "true";
}

function preloadNearbySlides(index) {
  loadSlide(index);
  loadSlide(index + 1);
  loadSlide(index - 1);
}

function showSlide(index) {
  if (!slides.length) {
    return;
  }

  currentSlide = Math.min(Math.max(index, 0), slides.length - 1);
  preloadNearbySlides(currentSlide);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  if (counter) {
    counter.textContent = `Poza ${currentSlide + 1} din ${slides.length}`;
  }

  if (prevButton) {
    prevButton.disabled = currentSlide === 0;
  }

  if (nextButton) {
    nextButton.disabled = currentSlide === slides.length - 1;
  }
}

prevButton?.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextButton?.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

showSlide(0);

window.addEventListener("pageshow", () => {
  showSlide(0);
});

if (priceBadge && contactSection) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      priceBadge.classList.toggle("hidden", entry.isIntersecting);
    },
    { threshold: 0.18 }
  );

  contactObserver.observe(contactSection);
}
