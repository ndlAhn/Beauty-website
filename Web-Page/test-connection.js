const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // Your MySQL host, usually 'localhost'
  user: 'root',   // Your MySQL username
  password: '', // Your MySQL password
  database: 'pre-thesis'   // The name of your database
});

// Open the MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the pre-thesis database.');
  
  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err.message);
      return;
    }
    console.log('Connection closed.');
  });
});
