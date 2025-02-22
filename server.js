const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const prisma = require("./prismaClient");
const authRoutes = require("./routes/authroutes");
const authenticateUser = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());


// ADD to fav list
app.post("/favorites/add", authenticateUser, async (req, res) => {
  const { movieId } = req.body;

  try {
    const movieIdInt = parseInt(movieId, 10); // Ensure it's an integer

    // Step 1: Check if the movie exists in the database
    let movie = await prisma.movie.findFirst({
      where: {
        movieId: movieIdInt,
      }
    });


    // Step 2: If movie does not exist, fetch from TMDb and save
    if (!movie) {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
        params: { api_key: TMDB_API_KEY },
      });

      const {
        title,
        original_title,
        overview,
        poster_path,
        backdrop_path,
        media_type = "movie",
        release_date,

        popularity,
        vote_average,
        vote_count,
      } = response.data;

      movie = await prisma.movie.create({
        data: {
          movieId: movieIdInt, // Store as integer
          title,
          originalTitle: original_title,
          description: overview || "No description available",
          posterPath: poster_path || "",
          backdropPath: backdrop_path || "",
          mediaType: media_type,
          releaseDate: release_date,

          popularity,
          voteAverage: vote_average,
          voteCount: vote_count,
        },
      });
    }

    // Step 3: Add movie to user's favorites
    const user = await prisma.user.update({
      where: { userid: req.user.userId },
      data: { favourites: { connect: { movieId: movieIdInt } } },
    });

    res.json({ message: "Movie added to favorites", user });
  } catch (error) {
    console.error("Add to Favorites Error:", error);
    res.status(500).json({ error: "Failed to add movie" });
  }
});


// REMOVE from fav list
// REMOVE from favorites
app.post("/favorites/remove", authenticateUser, async (req, res) => {
  const { movieId } = req.body;

  try {
    const movieIdInt = parseInt(movieId, 10); // Ensure it's an integer

    const user = await prisma.user.update({
      where: { userid: req.user.userId },
      data: { favourites: { disconnect: { movieId: movieIdInt } } }, // Ensure `movieId` is used correctly
    });

    res.json({ message: "Movie removed from favorites", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove movie", details: error.message });
  }
});

// ADD to watchlist
app.post("/watchlist/add", authenticateUser, async (req, res) => {
  const { movieId } = req.body;

  try {
    const movieIdInt = parseInt(movieId, 10); // Ensure it's an integer

    const user = await prisma.user.update({
      where: { userid: req.user.userId },
      data: { watchlist: { connect: { movieId: movieIdInt } } }, // Ensure `movieId` is used correctly
    });

    res.json({ message: "Movie added to watchlist", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie", details: error.message });
  }
});

// REMOVE from watchlist
app.post("/watchlist/remove", authenticateUser, async (req, res) => {
  const { movieId } = req.body;

  try {
    const movieIdInt = parseInt(movieId, 10); // Ensure it's an integer

    const user = await prisma.user.update({
      where: { userid: req.user.userId },
      data: { watchlist: { disconnect: { movieId: movieIdInt } } }, // Ensure `movieId` is used correctly
    });

    res.json({ message: "Movie removed from watchlist", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove movie", details: error.message });
  }
});




// TMDb trending movies
app.get("/tmdb/trending", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("TMDb API Error:", error.response?.status, error.response?.data);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Search Movies Route
app.get("/tmdb/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query },
    });
    res.json(response.data.results);
  } catch (error) {
    console.error("TMDb Search Error:", error.response?.status, error.response?.data);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// Movie Details Route
app.get("/tmdb/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("TMDb Movie Details Error:", error.response?.status, error.response?.data);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// Use movie routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
// Error handling middleware
// app.use(errorMiddleware);
app.use(authenticateUser);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
