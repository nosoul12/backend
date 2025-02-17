const axios = require("axios");
const express = require("express");
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Ensure this is correctly set
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// ✅ Fetch Trending Movies
router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY },
      headers: { Accept: "application/json" },
    });

    res.json(response.data.results); // Send only results for cleaner response
  } catch (error) {
    console.error("TMDb API Error:", error.response?.status, error.response?.data);
    res.status(500).json({
      error: "Failed to fetch trending movies",
      details: error.response?.data || error.message,
    });
  }
});

// ✅ Search Movies by Name
router.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query },
    });

    res.json(response.data.results); // Send only results
  } catch (error) {
    console.error("Search Error:", error.response?.status, error.response?.data);
    res.status(500).json({
      error: "Failed to fetch search results",
      details: error.response?.data || error.message,
    });
  }
});

// ✅ Fetch Complete Movie Details
router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY, append_to_response: "videos,credits" },
    });

    res.json(response.data); // Return full movie details
  } catch (error) {
    console.error("Movie Details Error:", error.response?.status, error.response?.data);
    res.status(500).json({
      error: "Failed to fetch movie details",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
