const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

//get all posts (the 'home' page)
router.get('/home', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    let userName = 'Guest'; // Default value if not logged in
    if (req.session.logged_in && req.session.user_id) {
      const user = await User.findByPk(req.session.user_id);
      userName = user ? user.name : 'Guest';
    }

    const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', {
      posts,
      logged_in: req.session.logged_in,
      user_name: userName
    });
  }
  catch (err) {
    return res.status(500).json({message: 'Error retrieving the blog posts.', error: err.message});
  }
});

//get the login page
router.get('/', (req, res) => {
  if (req.session.logged_in) { //if user is already logged in, routed to posts
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//get user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    if (req.session.logged_in) {
      res.render('dashboard', {
        ...user,
        logged_in: true
      })
    }
    else {
      res.render('login')
    };
  }
  catch (err) {
    res.status(500).json({message: 'Error retrieving the user\'s dashboard.', error: err.message});
  }
});

module.exports = router;