const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const examRoutes = require('./routes/examRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const autheticate = require("./middlewares/authenticate")
const app = express();

// Connect to the database
connectDB();


app.use(morgan("combined"));


// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Use the auth routes


app.use('/api/auth', authRoutes);


app.use(autheticate)
app.use('/api/teacher', teacherRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/payments', paymentRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)});
