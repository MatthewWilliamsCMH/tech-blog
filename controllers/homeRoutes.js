const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

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

    const posts = postData.map((post) => post.get({ plain: true })); // this serializes the data stripping out content that's not needed
    
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  }
  catch (err) {
    return res.status(500).json({message: 'Unable to get the blog posts.', error: err.message});
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, { //this uses the session ID to identify the logged-in user.
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
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) { //checks to see if the user is already logged in. If so, they're routed to posts
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;