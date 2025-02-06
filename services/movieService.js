const movieRepository = require('../repositories/movieRepository');

const getAllMovies = async () => {
  return await movieRepository.getAllMovies();
};

const addMovie = async (movieData) => {
  return await movieRepository.addMovie(movieData);
};

const getMovieById = async (id) => {
  return await movieRepository.getMovieById(id);
};

const updateMovie = async (id, movieData) => {
  return await movieRepository.updateMovie(id, movieData);
};

const deleteMovie = async (id) => {
  return await movieRepository.deleteMovie(id);
};

module.exports = { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie };
