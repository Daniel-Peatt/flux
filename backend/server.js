// Runs a server 
// Creates an API for my React Website to push and pull data from

// Requirements 
const pool = require("./db");
const cors = require("cors");
const express = require("express"); // Framework 
const jwt = require('jsonwebtoken'); // JWT Authenticaiton
const bcrypt = require('bcrypt'); // Hashing passwords
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// ROUTES // 

// JWT Authentication Login
app.post("/users/login", async(req, res) => {
  const {email, password_hash} = req.body;

  try {
    // Authenticate User

    // Get the user from the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    // Check if user was found
    if (result.rows.length === 0) {
      return res.status(404).json({message: 'User not found'});
    }

    // Save user to a const
    const user = result.rows[0];

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash)

    // If password is invalid
    if(!isPasswordValid) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    // Creating token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({
      message: 'Login successful',
      accessToken,
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({message: 'Server error'});
  }
});

// Middleware for user routing
function authenticateToken(req, res, next) {

}

// Create a user 
app.post("/CreateUser", async(req, res) => {
  try {
    const {email} = req.body;
    const {password_hash} = req.body;
    // Hashing password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password_hash, salt);

    const newUser = await pool.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`, [email, hashPassword]);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({error: "Email already exists."});
    }
    res.status(500).json({ error: "Server error" });
  }
})

// Add challenge information
app.post("/create-challenge", async(req, res) => {
  try {
    const {user_id} = req.body;
    const {title} = req.body;
    const {intentions} = req.body;
    const {start_date} = req.body;
    const {end_date} = req.body;
    const {is_active} = req.body;
    const newChallenge = await pool.query(`INSERT INTO challenges (user_id, title, intentions, start_date, end_date, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [user_id, title, intentions, start_date, end_date, is_active]);
    res.status(201).json({ message: "Challenge created successfully"});
  } catch (err) {
    console.error(err.message);
  }
})

// Get all users 
app.get("/users", async(req,res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// Get a user by email
app.get("/users/:email", async(req, res) => {
  try {
    const { email } = req.params; // Stores the id recieved from the API call
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]); // Query sent to the database
    res.json(user.rows[0]); // Stores the results into a JSON
  } catch (err) {
    console.error(err.message);
  }
})

// Change user password
app.put("/users/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const { password_hash } = req.body;
    const updatedPassword = await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [password_hash, id]);
    res.json("User password was updated");
  } catch (err) {
    console.error(err.message);
  }
})

// Delete a user 
app.delete("/users/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json("User has been deleted");
  } catch (err) {
    console.error(err.message);
  }
})



app.post('/insert', async (req, res) => {
    const { email, pass } = req.body;
  
    if (!email || !pass) {
      return res.status(400).json({ error: 'Name and pass are required' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO users (name, password_hash) VALUES ($1, $2) RETURNING *',
        [email, pass]
      );
  
      res.status(201).json({ message: 'User added', user: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

// API Route to Insert Data

// Starting the server
app.listen(5000, () => console.log(`Server running on port 5000`));