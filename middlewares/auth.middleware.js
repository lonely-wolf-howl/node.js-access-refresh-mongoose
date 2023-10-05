const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (error, user) => {
      if (error) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}

module.exports = authMiddleware;
