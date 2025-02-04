// Runs a server 
// Creates an API for my React Website to push and pull data from

require("dotenv").config();
const express = require("express"); // Framework 
const cors = require("cors");
const { Pool } = require("pg"); // Used to connect to React page

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// Login info to my local server
const pool = new Pool({
    user: "postgres",            
    host: "localhost",
    database: "flux",
    password: "Lemontree504",    
    port: 5432,
  });

// API Route to Get Data
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post('/insert', async (req, res) => {
    const { email, pass } = req.body;
  
    if (!email || !pass) {
      return res.status(400).json({ error: 'Name and pass are required' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO users (name, pass) VALUES ($1, $2) RETURNING *',
        [email, pass]
      );
  
      res.status(201).json({ message: 'User added', user: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

// API Route to Insert Data

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));