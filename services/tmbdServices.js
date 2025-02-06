require('dotenv').config();
const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching trending movies: ' + error.message);
  }
};

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details: ' + error.message);
  }
};

module.exports = { getTrendingMovies, getMovieById };
