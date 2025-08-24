const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

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
  xss(), // Prevent XSS attacks
  mongoSanitize(), // Prevent NoSQL injection
  limiter // Rate limiting
];

module.exports = securityMiddleware;