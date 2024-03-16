import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user.model';
import Admin from '../models/adminUser.model';

const isLoggedIn = async  (req, res, next) => {
    const { token } = req.cookies;
    // const token = (req.cookies && req.cookies.token) || null;
    console.log("token is ", token)
    if (!token) {
        return next(new AppError("Unauthenticated ,please login again", 401));
    }

    const userDetails = await JWT.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;
    console.log("req.user is",req.user);
    next();
}

// Middleware to protect routes - checks for a valid JWT token in the request header
const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    // Check if Authorization header with 'Bearer' token is present
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Extract token from the header
        token = req.headers.authorization.split(' ')[1];
  
        // Verify the token using JWT
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
  
        // Find the user in the database using the decoded token
        req.user =
          (await User.findById(decoded.id).select('-password')) ||
          (await Admin.findById(decoded.id).select('-password'));
  
        // Continue to the next middleware
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not Authorized, Token Failed!');
      }
    }
  
    // If no token is present
    if (!token) {
      res.status(401);
      throw new Error('Not Authorized, No Token!');
    }
  });
  
// Middleware to check if the user is an admin
const admin = asyncHandler(async (req, res, next) => {
    // Check if the user is authenticated and has admin privileges
    if (req.user && req.user.role === 'admin') {
        // User is an admin, continue to the next middleware
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized As An Admin!');
    }
});
  
exports = { protect, admin };