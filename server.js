const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const app = express()
app.use(cors())
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    user:"sql12708536",
    password:"jdk7xMlAkl",
    database:"sql12708536"
})


app.listen(8081,() =>{
    console.log("Listening");
})

app.post('/register', async (req, res) => {
    const { name, email, user_password ,phone} = req.body;
  
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(user_password, 10); // 10 is the number of salt rounds
  
      // Insert user registration data into MySQL database
      const query = 'INSERT INTO passengers (name, email, user_password,phone) VALUES (?, ?, ?,?)';
      db.query(query, [name, email, hashedPassword,phone], (error) => {
        if (error) {
          console.error('Error registering user:', error);
          return;
        }
        res.status(201).json({ message: 'User registered successfully' });
      });

    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ message: 'Error hashing password' });
    }
    
  });

app.post('/dashboard',(req,res) => {
    console.log('entered email passwoord')
    const { email, user_password } = req.body;
    console.log({email,user_password},"can yi see")
try{
  // Query MySQL database to check if user exists
  db.query('SELECT id, name, user_password FROM passengers WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error querying MySQL: ', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const { id, name, user_password: hashedPassword } = results[0];
      
      // Compare the user's input password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(user_password, hashedPassword);
      
      if (passwordMatch) {
        // Passwords match, user is authenticated
        // Proceed with fetching user details and flights
        db.query('SELECT * FROM flights WHERE passenger_id = ?', [id], (err, flightResults) => {
          if (err) {
            console.error('Error querying flights: ', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
          }
          console.log(id, name, flightResults);
          // Return user and flight details upon successful login
          res.status(200).json({ success: true, passenger: { id, name }, flights: flightResults });
        });
      } else {
        // Passwords do not match, send error response
        console.error('Invalid password');
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      // User not found, send error response
      console.error('User not found');
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
} catch (error) {
  console.error('Error in login:', error);
  res.status(500).json({ success: false, message: 'Internal server error' });
}
});




