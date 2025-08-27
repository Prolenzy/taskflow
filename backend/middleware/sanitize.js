// Custom middleware to prevent NoSQL injection
const sanitize = (req, res, next) => {
  // Sanitize request body
  if (req.body) {
    sanitizeObject(req.body);
  }
  
  // Sanitize query parameters
  if (req.query) {
    sanitizeObject(req.query);
  }
  
  // Sanitize URL parameters
  if (req.params) {
    sanitizeObject(req.params);
  }
  
  next();
};

// Recursively sanitize objects
function sanitizeObject(obj) {
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      // Check for MongoDB operator patterns
      if (key.startsWith('$') || key.includes('.')) {
        // Remove or rename potentially dangerous keys
        const safeKey = key.replace('$', '').replace('.', '_');
        obj[safeKey] = obj[key];
        delete obj[key];
        key = safeKey;
      }
      
      // Recursively sanitize nested objects
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
}

module.exports = sanitize;