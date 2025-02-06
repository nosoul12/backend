const express = require('express');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movieRoutes'); // Path to movieRoutes.js
const errorMiddleware = require('./middlewares/errorMiddleware');
const prisma = require('./prismaClient');
const cors = require("cors");
app.use(cors()); // Enable CORS for all requests

dotenv.config();

const app = express();
const tmdbRoutes = require("./routes/tmbdRoutes"); // Import TMDb routes

app.use("/tmdb", tmdbRoutes); // Register route for TMDb API


// Middleware to parse JSON requests
app.use(express.json());

// Use the movie routes
app.use('/movies', movieRoutes);
app.use('/tmdb', tmdbRoutes); // New route for TMDb API

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
