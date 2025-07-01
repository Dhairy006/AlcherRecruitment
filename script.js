


const row1 = document.getElementById("row-1");
const row2 = document.getElementById("row-2");


const api = `https://jsonfakery.com/movies/paginated?page=1`;


async function loadMovies() {

    const response = await fetch(api);

    const json = await response.json();
    const movies = json.data ;

    const half = Math.floor(movies.length / 2)
    const firstSet = movies.slice(0, half)
    const secondSet = movies.slice(half, half * 2)

    renderMovies(row1, firstSet)
    renderMovies(row2, secondSet)

}

function renderMovies(container, movieList) {
  container.innerHTML = "";

  movieList.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const poster = movie.poster_path;
    const title = movie.original_title;
    const overview = movie.overview;
    const releaseDate = movie.release_date;
    const rating = movie.vote_average ;


    card.innerHTML = `
      <img src="${poster}" alt="" class="movie-poster" />
      <p class="movie-title">${title}</p>
    `;

    card.addEventListener("click", () => {
      const existing = document.querySelector(".movie-description-overlay");
      if (existing) existing.remove();

      const description = document.createElement("div");
      description.className = "movie-description-overlay";
      description.innerHTML = `
        <div class="description-content">
          <img class="description-poster" src="${poster}" alt="${title}" />
          <div class="description-details">
            <h2>${title}</h2>
            <p>${releaseDate} • ⭐ ${rating}</p>
            <p>${overview}</p>
            <button class="close-button">Close</button>
          </div>
        </div>
      `;

      description.querySelector(".close-button").addEventListener("click", () => {
        description.remove();
      });

      document.body.appendChild(description);
    });

    container.appendChild(card);
  });
}


loadMovies();