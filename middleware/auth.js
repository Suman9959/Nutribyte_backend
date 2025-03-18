const { Clerk } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

// Initialize Clerk with your secret key
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

// Middleware to verify JWT token from Clerk
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token with Clerk
    const { sub: userId } = await clerk.verifyToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    // Add the userId to the request object
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyToken };