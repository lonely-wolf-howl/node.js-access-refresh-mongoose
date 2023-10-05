const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const database = [];

function login(req, res) {
  const username = req.body.username;
  const user = {
    name: username,
  };

  // create a new token
  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
  const refreshToken = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: '1d',
    }
  );

  database.push(refreshToken);

  // create a cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1일
  });

  res.json({ accessToken });
}

function refresh(req, res) {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookie.refreshToken;
  if (!database.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (error, user) => {
      if (error) return res.sendStatus(403);
      // create a new access token
      const accessToken = jwt.sign(
        { name: user.name },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
      console.log(refreshToken);

      res.json({ accessToken });
    }
  );
}

module.exports = {
  login,
  refresh,
};
