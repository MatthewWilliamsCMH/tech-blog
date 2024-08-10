const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  }
  catch (err) {
    return res.status(500).json({message: 'Error retrieving the blog posts.', error: err.message});
  }
});

//get one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          include: [{model: User, as: 'commenter', attributes: ['name']}],
        }
      ]
    });

    //if nothing is returned
    if (!postData) {
      res.status(404).json({message: 'Unable to locate the blog post.'});
      return;
    }

    //if a post is found, get comments and commenter
    const post = postData.get({ plain: true });
    const comments = post.comments.map(comment => ({
      ...comment,
      commenterName: comment.commenter ? comment.commenter.name : 'Unknown'
    }));
    const thisUser = req.session.user_id
    //and render the post
    res.render('post', {
      post,
      comments,
      thisUser,
      logged_in: req.session.logged_in
    });
  } 
  catch (err) {
    res.status(500).json({message: 'Error retrieving the blog post.', error: err.message});
  }
});

//get user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } 
  catch (err) {
    res.status(500).json({message: 'Error retrieving the user\'s dashboard.', error: err.message});
  }
});

//get the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) { //if user is already logged in, routed to posts
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;