const tmdbService = require('../services/tmdbService');

const getTrendingMovies = async (req, res) => {
  try {
    const movies = await tmdbService.getTrendingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await tmdbService.getMovieById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTrendingMovies, getMovieById };
