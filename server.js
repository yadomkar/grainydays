const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const axios = require('axios');
require('dotenv').config();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    const featuredMovies = response.data.results;
    res.render('index', { featuredMovies });
  } catch (error) {
    console.error(error);
    res.render('index', { featuredMovies: [] });
  }
});

// Without Pagination
// app.get('/search-live', async (req, res) => {
//   const searchQuery = req.query.query;
//   const apiKey = process.env.TMDB_API_KEY;
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
//     searchQuery
//   )}`;

//   try {
//     const response = await axios.get(url);
//     res.json(response.data.results);
//   } catch (error) {
//     console.error('Error fetching from TMDb:', error);
//     res.status(500).json({ message: 'Error fetching search results' });
//   }
// });

// With Pagination
app.get('/search-live', async (req, res) => {
  const { query, page = 1 } = req.query;
  try {
    console.log('Searching for:', query, 'on page', page);
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query,
          page,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Search API call failed:', error);
    res.status(500).json({ message: 'Error performing movie search' });
  }
});

async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    return {};
  }
}

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
