// Initialize Lucide icons
lucide.createIcons();

const row1 = document.getElementById("row-1");
const row2 = document.getElementById("row-2");

// API URL (Using faker API from previous code)
const api = `https://jsonfakery.com/movies/paginated?page=1`;

// DOM Elements for Hero
const heroBanner = document.getElementById("hero-banner");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");


async function loadMovies() {
    try {
        const response = await fetch(api);
        const json = await response.json();
        const movies = json.data;

        // Set a random movie as the Hero Banner
        if (movies.length > 0) {
            const randomHero = movies[Math.floor(Math.random() * movies.length)];
            // Create a high-res pseudo background from the poster or backdrop if available
            // Faker API usually gives poster_path. We'll use it as background and set a darker gradient.
            const backdropUrl = randomHero.backdrop_path || randomHero.poster_path;
            
            // To prevent harsh jumps, fade background in CSS
            heroBanner.style.backgroundImage = `url('${backdropUrl}')`;
            heroTitle.textContent = randomHero.original_title;
            heroDesc.textContent = randomHero.overview;
        }

        const half = Math.floor(movies.length / 2);
        const firstSet = movies.slice(0, half);
        const secondSet = movies.slice(half, half * 2);

        renderMovies(row1, firstSet);
        renderMovies(row2, secondSet);
        
        // Re-init icons for dynamic content
        lucide.createIcons();
    } catch (error) {
        console.error("Error loading movies:", error);
        row1.innerHTML = "<p style='padding: 20px; color: var(--text-secondary);'>Failed to load movies.</p>";
        row2.innerHTML = "<p style='padding: 20px; color: var(--text-secondary);'>Failed to load movies.</p>";
    }
}

function renderMovies(container, movieList) {
  container.innerHTML = ""; // Clear skeletons

  movieList.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const poster = movie.poster_path;
    const title = movie.original_title;
    const releaseDate = movie.release_date ? movie.release_date.split('-')[0] : "N/A"; // Just the year
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    card.innerHTML = `
      <div class="poster-wrapper">
        <img src="${poster}" alt="${title}" class="movie-poster" loading="lazy" />
        <div class="card-overlay">
            <div class="card-rating">
                <i data-lucide="star"></i> ${rating}
            </div>
            <div class="card-title-hover">${title}</div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openMovieModal(movie);
    });

    container.appendChild(card);
  });
}

function openMovieModal(movie) {
  // Remove existing
  const existing = document.querySelector(".movie-description-overlay");
  if (existing) existing.remove();

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const overlay = document.createElement("div");
  overlay.className = "movie-description-overlay";
  
  overlay.innerHTML = `
    <div class="description-content">
      <button class="close-button" aria-label="Close modal">
         <i data-lucide="x"></i>
      </button>
      <div class="description-poster-container">
        <img class="description-poster" src="${movie.poster_path}" alt="${movie.original_title}" />
      </div>
      <div class="description-details">
        <div class="description-header">
            <h2>${movie.original_title}</h2>
            <div class="meta-info">
                <span>${releaseYear}</span>
                <span>•</span>
                <span class="meta-rating"><i data-lucide="star"></i> ${rating} / 10</span>
            </div>
        </div>
        <div class="description-body">
            <p>${movie.overview}</p>
        </div>
        <div class="modal-actions">
             <button class="btn-primary" style="width: auto; padding: 10px 24px;"><i data-lucide="play" fill="currentColor"></i> Play</button>
             <button class="btn-secondary" style="width: auto; padding: 10px 24px;"><i data-lucide="plus"></i> Watchlist</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  
  // Render icons inside modal
  lucide.createIcons({
      root: overlay
  });

  // Trigger animation after append
  requestAnimationFrame(() => {
     overlay.classList.add("active");
  });

  const closeBtn = overlay.querySelector(".close-button");
  
  const closeModal = () => {
      overlay.classList.remove("active");
      setTimeout(() => overlay.remove(), 300); // match transition duration
  };

  closeBtn.addEventListener("click", closeModal);
  
  // Close on outside click
  overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
          closeModal();
      }
  });
}

// Slider controls
document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.movie-slider');
    const leftArrow = container.querySelector('.left-arrow');
    const rightArrow = container.querySelector('.right-arrow');

    const scrollAmount = window.innerWidth * 0.6; // Scroll 60% of view

    leftArrow.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Hide left arrow if at start
    slider.addEventListener('scroll', () => {
        if(slider.scrollLeft <= 0) {
            leftArrow.style.opacity = '0';
            leftArrow.style.pointerEvents = 'none';
        } else {
            leftArrow.style.opacity = ''; // Reverts to CSS hover rule
            leftArrow.style.pointerEvents = 'all';
        }
    });

    // Initial check
    setTimeout(() => {
        if(slider.scrollLeft <= 0) {
            leftArrow.style.opacity = '0';
            leftArrow.style.pointerEvents = 'none';
        }
    }, 100);
});

// Top Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.top-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 12, 16, 0.95)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(15, 17, 21, 0.85)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        nav.style.boxShadow = 'none';
    }
});

loadMovies();