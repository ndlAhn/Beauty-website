const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',     // Change if your MySQL server is on a different host
  user: 'root', // Replace with your MySQL username
  password: 'anh22052002', // Replace with your MySQL password
  database: 'pre-thesis'
});

// Open the MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the pre-thesis database.');
  
  // Example query
  connection.query('SELECT * FROM your_table_name', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Results:', results);

    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err);
        return;
      }
      console.log('Connection closed.');
    });
  });
});
