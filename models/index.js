const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Post.belongsTo(User, {foreignKey: 'user_id'});

Post.hasMany(Comment, {foreignKey: 'post_id'});
Comment.belongsTo(Post, {foreignKey: 'post_id'});

Comment.belongsTo(User, {foreignKey: 'user_id', as: 'commenter'});
User.hasMany(Comment, {foreignKey: 'user_id', as: 'comments'});

module.exports = { User, Post, Comment };