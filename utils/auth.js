const withAuth = (req, res, next) => {
  if (!req.session.logged_in) { //direct users not logged in to the login pages
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;