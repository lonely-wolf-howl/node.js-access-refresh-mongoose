const posts = require('../models/posts.model');

function getPosts(req, res) {
  res.json(posts);
}

module.exports = {
  getPosts,
};
