// JavaScript for Quote Slider
const quotes = document.querySelectorAll(".quote-slide");
const dotsContainer = document.getElementById("pagination-dots");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let currentIndex = 0;

// Create Pagination Dots
quotes.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

// Update Active Slide
const updateSlide = (index) => {
  quotes.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
};

// Navigate to Next Slide
const nextSlide = () => {
  currentIndex = (currentIndex + 1) % quotes.length;
  updateSlide(currentIndex);
};

// Navigate to Previous Slide
const prevSlide = () => {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  updateSlide(currentIndex);
};

// Go to Specific Slide
const goToSlide = (index) => {
  currentIndex = index;
  updateSlide(currentIndex);
};

// Auto Play Slides
let autoPlay = setInterval(nextSlide, 5000);

// Pause Auto Play on Hover
const slider = document.getElementById("quote-slider");
slider.addEventListener("mouseover", () => clearInterval(autoPlay));
slider.addEventListener("mouseleave", () => {
  autoPlay = setInterval(nextSlide, 5000);
});

// Event Listeners
rightArrow.addEventListener("click", nextSlide);
leftArrow.addEventListener("click", prevSlide);

// Initialize First Slide
updateSlide(currentIndex);

// Therapist Data
const therapists = [
    {
      img: "therapist1.jpg",
      name: "Dr. Sarah Lee",
      specialty: "Cognitive Behavioral Therapy",
      bio: "Dr. Sarah Lee has over 10 years of experience helping individuals overcome anxiety and depression through evidence-based practices."
    },
    {
      img: "therapist2.jpg",
      name: "John Doe",
      specialty: "Adolescent Counseling",
      bio: "John specializes in guiding adolescents through challenging transitions, fostering resilience and self-confidence."
    },
    {
      img: "therapist3.jpg",
      name: "Emily Carter",
      specialty: "Stress and Anxiety Management",
      bio: "Emily is a certified therapist with a passion for helping clients manage stress and find inner peace through mindfulness techniques."
    }
  ];
  
  // Open Modal
  function openTherapistModal(index) {
    const modal = document.getElementById("therapist-modal");
    const therapist = therapists[index];
  
    document.getElementById("modal-img").src = therapist.img;
    document.getElementById("modal-name").innerText = therapist.name;
    document.getElementById("modal-specialty").innerText = therapist.specialty;
    document.getElementById("modal-bio").innerText = therapist.bio;
  
    modal.style.display = "block";
  }
  
  // Close Modal
  function closeTherapistModal() {
    document.getElementById("therapist-modal").style.display = "none";
  }
  
  // Close Modal on Outside Click
  window.onclick = function (event) {
    const modal = document.getElementById("therapist-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  

function exploreDomain(domainUrl) {
  window.location.href = domainUrl;
}

// Simulated Feedback Data
const feedbackData = [
  { text: "I'm calm again and no longer feel like I'm struggling to breathe." },
  { text: "The community is very good, especially the moderator I got. I do feel a lot lighter now." },
  { text: "I feel more supported and acknowledged about how I feel." },
  { text: "It feels nice to tell people about my thoughts and feelings. I will be returning. :D" },
  { text: "This is my first time on this website and it was better than I expected. I genuinely am leaving with a smile on my face and a lighter heart." },
  { text: "I absolutely love it and of course the moderators. Thank you all so much!" },
  { text: "I loved it! I met a really nice person." },
  { text: "I feel a lot better and motivated!" },
  { text: "It was amazing. So welcoming and understanding." },
];

// Pagination logic
const feedbackList = document.querySelector(".feedback-list");
const pagination = document.querySelector(".pagination");
const ITEMS_PER_PAGE = 5;
let currentPage = 1;

function renderFeedbackPage(page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = page * ITEMS_PER_PAGE;
  const visibleFeedback = feedbackData.slice(start, end);

  // Render visible feedback cards
  feedbackList.innerHTML = visibleFeedback
    .map(
      (feedback) => `
      <div class="feedback-card">
        <div class="quote-icon">“</div>
        <p class="feedback-text">${feedback.text}</p>
      </div>
    `
    )
    .join("");

  // Update active pagination
  Array.from(pagination.querySelectorAll(".page-number")).forEach((pageNumber, index) => {
    pageNumber.classList.toggle("active", index + 1 === page);
  });
}

// Render initial pagination
function renderPagination() {
  const totalPages = Math.ceil(feedbackData.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  pagination.innerHTML = pageNumbers
    .map((page) => `<span class="page-number ${page === 1 ? "active" : ""}" onclick="goToPage(${page})">${page}</span>`)
    .join("");


  pagination.innerHTML += `<span class="next-arrow" onclick="goToPage(currentPage + 1)">›</span>`;
}

// Go to a specific page
function goToPage(page) {
  const totalPages = Math.ceil(feedbackData.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderFeedbackPage(page);
}

// Initialize feedback section
renderFeedbackPage(1);
renderPagination();

// Select elements
const stars = document.querySelectorAll('.star');
const ratingInput = document.querySelector('#rating');
const reviewForm = document.querySelector('#reviewForm');
const successMessage = document.querySelector('#successMessage');

// Star Rating Interaction
stars.forEach((star) => {
  star.addEventListener('click', () => {
    // Set the selected rating
    const rating = star.getAttribute('data-value');
    ratingInput.value = rating;

    // Highlight selected stars
    stars.forEach((s) => {
      s.classList.remove('selected');
      if (s.getAttribute('data-value') <= rating) {
        s.classList.add('selected');
      }
    });
  });
});

// Handle form submission
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather form data
  const reviewText = document.querySelector('#reviewText').value;
  const rating = ratingInput.value;

  // Check if all required fields are filled
  if (!reviewText || rating === '0') {
    alert('Please provide a review and a star rating.');
    return;
  }

  // Display success message
  successMessage.textContent = 'Thank you for your review!';
  successMessage.style.display = 'block';

  // Clear form fields
  reviewForm.reset();
  stars.forEach((s) => s.classList.remove('selected'));
  ratingInput.value = '0';

  // Log review data (you can replace this with sending data to a backend API)
  console.log({
    name,
    reviewText,
    rating,
  });
});

document.querySelectorAll('.footer-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    window.location.href = target; // Redirects to the linked page
  });
});
