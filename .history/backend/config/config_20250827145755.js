const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_development_only';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp';
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// Only require these in production, not development
if (NODE_ENV === 'production') {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required in environment variables');
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is required in environment variables');
  }
}

module.exports = {
  JWT_SECRET,
  MONGODB_URI,
  NODE_ENV,
  PORT
};