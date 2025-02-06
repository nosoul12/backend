const axios = require("axios");
const express = require("express");
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Ensure this is correctly set

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY },
      headers: { Accept: "application/json" }, // Optional but recommended
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb API Error:", error.response?.status, error.response?.data);
    res.status(500).json({
      error: "Failed to fetch trending movies",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
