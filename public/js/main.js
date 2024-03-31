let currentPage = 1;

document
  .getElementById('searchInput')
  .addEventListener('input', debounce(handleSearch, 500));
document
  .getElementById('prevPage')
  .addEventListener('click', () => changePage(-1));
document
  .getElementById('nextPage')
  .addEventListener('click', () => changePage(1));

function handleSearch(e) {
  const query = e.target.value.trim();
  if (query.length > 2) {
    document.getElementById('mainContainer').classList.add('hidden');
    document
      .getElementById('searchResultsContainer')
      .classList.remove('hidden');
    currentPage = 1;
    fetchResults(query, currentPage);
  } else {
    document.getElementById('mainContainer').classList.remove('hidden');
    document.getElementById('searchResultsGrid').innerHTML = '';
    document.getElementById('searchResultsContainer').classList.add('hidden');
  }
}

function changePage(change) {
  const query = document.getElementById('searchInput').value.trim();
  currentPage += change;
  fetchResults(query, currentPage);
}

function fetchResults(query, page) {
  fetch(`/search-live?query=${encodeURIComponent(query)}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      const resultsGrid = document.getElementById('searchResultsGrid');
      resultsGrid.innerHTML = '';
      data.results.forEach((movie) => {
        const moviePoster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : '/images/cat-shoe.jpg';
        const movieElement = document.createElement('div');
        movieElement.classList.add(
          'movie-item',
          'bg-slate-900',
          'rounded',
          'overflow-hidden',
          'shadow-lg'
        );
        movieElement.innerHTML = `
                  <img src="${moviePoster}" alt="${movie.title}" class="w-full">
                  <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2 text-white">${
                        movie.title
                      } (${new Date(movie.release_date).getFullYear()})</div>
                  </div>
              `;
        resultsGrid.appendChild(movieElement);
      });

      document.getElementById('currentPage').textContent = currentPage;
      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled =
        currentPage >= data.total_pages;
    })
    .catch((error) => {
      console.error('Error fetching search results:', error);
      resultsGrid.innerHTML =
        '<p class="text-white">Failed to load search results.</p>';
    });
}

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function initiateAnimations() {
  document.querySelectorAll('.animate-fadeIn').forEach((element) => {
    element.classList.add('start');
  });
  document.querySelectorAll('.animate-fadeInSlow').forEach((element) => {
    element.classList.add('start');
  });
}

window.addEventListener('load', () => {
  initiateAnimations();
});

document.addEventListener('DOMContentLoaded', () => {
  const movieItems = document.querySelectorAll('.movie-item');
  const movieDetailModal = document.getElementById('movieDetailModal');
  const closeModalButton = document.getElementById('closeModal');

  function openModal(movieDetails) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
<div class="flex items-center space-x-4 p-4">
  <div class="flex-none">
    <img src="${movieDetails.posterPath}" alt="${
      movieDetails.title
    }" class="rounded-lg shadow-lg" style="width: 200px; height: auto;">
  </div>
  <div class="flex-grow text-left">
    <h2 class="text-3xl font-bold mb-2">${movieDetails.title} (${new Date(
      movieDetails.releaseDate
    ).getFullYear()})</h2>
    <p class="text-lg text-gray-300">${movieDetails.overview}</p>
  </div>
</div>
`;

    movieDetailModal.classList.remove('hidden');
    movieDetailModal.classList.add('fade-in');
  }

  function closeModal() {
    movieDetailModal.classList.add('fade-out');
    setTimeout(() => {
      movieDetailModal.classList.add('hidden');
      movieDetailModal.classList.remove('fade-in', 'fade-out');
    }, 300);
  }

  movieItems.forEach((item) => {
    item.addEventListener('click', () => {
      const movieDetails = {
        title: item.getAttribute('data-title'),
        releaseDate: item.getAttribute('data-release-date'),
        posterPath: item.getAttribute('data-poster-path'),
        overview: item.getAttribute('data-overview'),
      };
      openModal(movieDetails);
    });
  });

  closeModalButton.addEventListener('click', closeModal);

  movieDetailModal.addEventListener('click', (event) => {
    if (event.target === movieDetailModal) {
      closeModal();
    }
  });
});
