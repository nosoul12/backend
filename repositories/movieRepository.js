const prisma = require('../prismaClient');

const getAllMovies = async () => {
  return await prisma.movie.findMany();
};

const addMovie = async (movieData) => {
  return await prisma.movie.create({ data: movieData });
};

const getMovieById = async (id) => {
  return await prisma.movie.findUnique({ where: { id: parseInt(id) } });
};

const updateMovie = async (id, movieData) => {
  return await prisma.movie.update({
    where: { id: parseInt(id) },
    data: movieData,
  });
};

const deleteMovie = async (id) => {
  return await prisma.movie.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  getAllMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
