const movieService = require('../services/movieService');

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newMovie = await movieService.addMovie({ title, description });
    return res.json(newMovie);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (movie) {
      return res.json(movie);
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedMovie = await movieService.updateMovie(id, { title, description });
    if (updatedMovie) {
      return res.json(updatedMovie);
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await movieService.deleteMovie(id);
    if (deletedMovie) {
      return res.json({ message: 'Movie deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie };
