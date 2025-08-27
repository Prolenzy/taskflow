const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('./sanitize'); // Import our custom sanitizer

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later'
  }
});

// Security middleware array
const securityMiddleware = [
  helmet(), // Set security headers
  sanitize, // Custom NoSQL injection protection
  limiter // Rate limiting
];

module.exports = securityMiddleware;