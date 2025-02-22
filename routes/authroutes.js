const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration Error:", error); // LOG THE ERROR
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
});





// Define routes
router.get("/test", (req, res) => {
  res.send("Auth route working!");
});




// Login Route  
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.userid });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
