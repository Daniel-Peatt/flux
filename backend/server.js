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
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({error: "Email already exists."});
    }
    res.status(500).json({ error: "Server error" });
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
app.get("/users/:id", async(req, res) => {
  try {
    const { id } = req.params; // Stores the id recieved from the API call
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]); // Query sent to the database
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