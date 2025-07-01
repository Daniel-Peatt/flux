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
  const {email, password} = req.body;

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
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    // If password is invalid
    if(!isPasswordValid) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    // Creating token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, isActive: user.is_active }, 
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
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Splits token into just the .env code
  if (token == null) return res.status(401).json({ error: "Access token is missing" }); // Return JSON on error

  // Verifies that the token is still valid
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" }); // Return JSON on error
    req.user = user;
    next(); // moves on from our middleware
  })
}

// Check if challenge exist


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
app.post("/create-challenge", authenticateToken, async(req, res) => {
  try {
    const user_id = req.user.userId; // gets the user_id from the token
    const {title} = req.body;
    const {intentions} = req.body;
    const {start_date} = req.body;
    const {end_date} = req.body;
    const {is_active} = req.body;
    const {tasks} = req.body;
    const {checkedTasks} = req.body;
    const newChallenge = await pool.query(`INSERT INTO challenges (user_id, title, intentions, start_date, end_date, is_active, tasks, checkedTasks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [user_id, title, intentions, start_date, end_date, is_active, tasks, checkedTasks]);
    res.status(201).json({ message: "Challenge created successfully"});
  } catch (err) {
    console.error(err.message);
  }
})

// Get challenge based on users using a token
app.get("/challenge", authenticateToken, async(req, res) => {
  try {
  // Get all challange info from database
  const challenges = await pool.query("SELECT * FROM challenges");

  // Getting users challenge by comparing tokens id with id from the sql query above
  const userChallenges = challenges.rows.filter(challenge => challenge.user_id === req.user.userId);

  if (userChallenges.length === 0) {
    return res.json(null); // Return null if no challenges are found
  }

  res.json(userChallenges); // Otherwise, return the user challenges

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

// Update tasks array
app.put("/updateTasksArray", authenticateToken, async(req, res) => {
  try {
    const user_id = req.user.userId; // gets the user_id from the token
    const {indexOne, indexTwo} = req.body;

    console.log("Route hit");
    console.log("Body:", req.body);
    console.log("User:", req.user);

    // Convert from 0-based (JS) to 1-based (Postgres)
    const pgIndexOne = indexOne + 1;
    const pgIndexTwo = indexTwo + 1;
    
    // Toggles a BOOLEAN 2D array for the tasks completed on the current day
    const query = `
      UPDATE challenges
      SET checkedtasks[${pgIndexOne}][${pgIndexTwo}] =
      CASE
        WHEN checkedtasks[${pgIndexOne}][${pgIndexTwo}] = true THEN false
        ELSE true
      END
      WHERE user_id = $1
      RETURNING *;
      `;

    const results = await pool.query(query, [user_id]);

    res.status(200).json(results.rows[0]);
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

//Delete challenge
app.delete("/deleteChallenge",authenticateToken, async(req,res) => {
  try {
    // Delete user's challenge
    const deleteChallenges = await pool.query(`DELETE FROM challenges WHERE user_id = $1`, [req.user.userId]);
    res.json("Challenge has been deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error while deleting challenge" });
  }
});



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