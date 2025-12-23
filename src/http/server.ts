const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
import type { Request, Response } from "express";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

type User = {
  username: string;
  password: string; // this will store the hashed password
};

const dados: User[] = []; // array to store user data

// Functionality to sign up a new user
app.post(
  "/signup",
  body("username").isString().isLength({ min: 3 }),
  body("password").isString().isLength({ min: 6 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // generate hashed password
    const hash = await bcrypt.hash(password, 10);

    // add user to array (in a real app, you'd save this to a database)
    dados.push({ username, password: hash });

    // respond to client
    res.status(201).json({
      message: `User signed up successfully!`,
    });
  }
);

// Functionality to log in an existing user
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // find user in array
  const user = dados.find((u) => u.username === username);
  // if user not found
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // compare provided password with stored hashed password
  const isValid = await bcrypt.compare(password, user.password);

  // respond based on password validity
  if (isValid) {
    const token = jwt.sign(
      {
        username: user.username,
        user: "admin",
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
      },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .json({ message: "Authentication successful", token: token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// Functionality to validate a JWT token
app.post(
  "/validate-token",
  body("token").notEmpty().isString(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract token from request body
    const { token } = req.body;
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ valid: true, decoded });
    } catch (err) {
      res.status(401).json({ valid: false, message: "Invalid token" });
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
