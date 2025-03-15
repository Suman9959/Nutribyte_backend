const express = require('express');
const { pool, connectDB } = require('./middleware/databaseConnection');
const user = require('./routes/users');
const cors = require('cors');
const port = 8080;
const app = express();
app.use((req, res, next) => {
    console.log(`CORS origin: ${req.headers.origin}`);
    next();
  });
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
 app.use((req, res, next) => {

  console.log(`CORS origin: ${req.headers.origin}`);

  next();

});
   
connectDB();
app.use("/users", user)
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});