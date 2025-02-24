// Runs a server 
// Creates an API for my React Website to push and pull data from

// Requirements 
const pool = require("./db");
const cors = require("cors");
const express = require("express"); // Framework 
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// ROUTES // 

// Create a user 
app.post("/CreateUser", async(req, res) => {
  try {
    const {email} = req.body;
    const {password_hash} = req.body;
    const newUser = await pool.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`, [email, password_hash]);

    res.json(newUser);
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

// Get a user
app.get("/users:id", async(req, res) => {
  try {
    
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