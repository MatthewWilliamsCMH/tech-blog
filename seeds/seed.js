const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./users.json');
const postData = require('./posts.json');
const commentData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true
  });
  
  const comments = await Comment.bulkCreate(commentData, {
    returning: true
  });

  process.exit(0);
};

seedDatabase();