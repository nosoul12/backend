const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ error: "Access Denied, No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next(); // Move to next middleware
    } catch (error) {
        return res.status(403).json({ error: "Invalid Token, Access Denied" });
    }
};

module.exports = authenticateUser;
