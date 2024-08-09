const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//post a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    const { text, post_id } = req.body;
    const newComment = await Comment.create({
      text,
      post_id: post_id,
      user_id: req.session.user_id
    });
    // res.redirect(`/post/${req.params.id}`);
    res.status(200).json(newComment)
  } 
  catch (err) {
    res.status(500).json({ message: 'Error adding the comment.', error: err.message });
  }
});

module.exports = router;
