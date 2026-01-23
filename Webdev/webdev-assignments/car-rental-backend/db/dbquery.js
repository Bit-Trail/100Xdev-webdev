const pool = require('./dbconfig');

// Test database connection
const con = pool.connect();
if (con) {
  console.log('Connected to the database successfully!');
} else {
  console.log('Failed to connect to the database.');
}

module.exports = pool;