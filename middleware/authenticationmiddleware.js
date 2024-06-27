

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No authentication token provided' });
  }

  jwt.verify(token,process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired.' });
      }
      return res.status(401).json({ message: 'Failed to authenticate with this token.' });
    }

  
   req.role=decoded.role ;
   req.userId=decoded.id ;
  

    next(); 
  });
}

module.exports = verifyToken;