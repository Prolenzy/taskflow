const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required in environment variables');
}

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required in environment variables');
}

module.exports = {
  JWT_SECRET,
  MONGODB_URI,
  NODE_ENV,
  PORT
};