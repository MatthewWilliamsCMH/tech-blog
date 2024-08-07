const router = require('express').Router();
const { User } = require('../../models');

//generic route to home page
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body); //create instance of User model and add it's values to userData

    req.session.save(() => {  //create a new session with the user's id and setting their logged-in status to true
      req.session.user_id = userData.id;
      req.session.logged_in = true; //not sure why we're setting their logged-in status to true here; they haven't logged in.

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//---------- POST Routes ----------//
//log user in
router.post ('/login', async (req, res) => {
  try {
    const userData = await User.findOne({where: {email:req.body.email}});
    if (!userData) {
      res.status(400).json({message: 'Incorrect username or password.'});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({message: 'Incorrect username or password.'})
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({user: userData, message: 'You\'re logged in.'});
    });
  }
  catch (err) {
    res.status(400).json({message: 'Error logging in.', error: err.message})
  }
});

//log user out
router.post ('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end()
  }
});

module.exports = router;