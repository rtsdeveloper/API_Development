import jwt from 'jsonwebtoken';

/**
 * Authentication middleware
 */
export function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Unauthorized - No token provided' 
    });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
}
