const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI, PORT } = require('./config/config');
const securityMiddleware = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(securityMiddleware);

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const taskRoutes = require('./routes/tasks'); 
app.use('/api/tasks', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MERN API is working!' });
});

// Error handling middleware (must be after routes)
app.use(errorHandler);

// REMOVE THIS LINE - it's a duplicate declaration:
// const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});