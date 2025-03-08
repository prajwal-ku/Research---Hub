const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  // Import your User model

// POST route for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token and send it back to the frontend
    const token = jwt.sign({ userId: user._id }, "yourSecretKey", { expiresIn: "1h" });

    // Send the token to the frontend
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
