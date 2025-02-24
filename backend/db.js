const Pool = require("pg").Pool; // Used to connect to React page

// Login info to my local server
const pool = new Pool({
    user: "postgres",            
    host: "localhost",
    database: "flux",
    password: "Lemontree504",    
    port: 5432,
  });

  module.exports = pool; 