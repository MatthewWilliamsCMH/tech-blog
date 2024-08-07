const router = require('express').Router();
const { User } = require('../../models');

//generic route to home page
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {  //create a new session with the user's id and setting their logged-in status to true
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post ('/login', async (req, res) => {
  try {
    const userData = await User.findOne({where: {email:req. body.email}});
    if (!userData) {
      res.status(400).json({message: 'Incorrect username or password.'});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({message: 'Incorrect username or password.'});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({user: userData, message: 'You\'re logged in.'});
    });
  }
  catch (err) {
    res.status(400).json({message: 'Unable to log you in.', error: err.message})
  }
});

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