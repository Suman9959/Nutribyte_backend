const express = require('express');
const { pool, connectDB } = require('./middleware/databaseConnection');
const user = require('./routes/users');
const cors = require('cors');
require('dotenv').config();




//const port = 8080;
const port = process.env.PORT || 8080;
const app = express();


//Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log(`CORS origin: ${req.headers.origin}`);
    next();
  });

  // CORS configuration
  const allowedOrigins = [
    "http://localhost:5173",
  
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(
          new Error("CORS policy does not allow access from this origin"),
          false
        );
      },
    })
  
  );

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







//  app.use((req, res, next) => {

//   console.log(`CORS origin: ${req.headers.origin}`);

//   next();

// });
   

// Connect to database
connectDB();
// Routes
app.use("/users", user)
// Root route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
      error: 'Server error', 
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});




//Starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});