const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
        },
        User
      ]
    });
    if (!post) {
      res.status(404).json({message: 'Unable to locate the post.'});
      return;
    }
    const comments = post.Comments.map(comment => comment.get({plain: true}));
    res.render('post', {
      post: post.get({plain: true}),
      comments: comments,
      logged_in: req.session.logged_in
    });
  } 
  catch (err) {
    res.status(500).json({message: 'Unable to retreive the post.', error: err.message});
  }
});

// Create a new comment
router.post('/:id/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.params.id,
      userId: req.session.user_id
    });
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    res.status(500).json({ message: 'Unable to add the comment.', error: err.message });
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    })
    res.status(200).json(newPost);
  }
  catch (err) {
    res.status(400).json({message: 'Unable to add the blog post', error: err.message})
  }
});

router.delete ('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!postData) {
      res.status(404).json({message: 'Unable to locate the blog post.'})
      return;
    }
    res.status(200).json(postData);
  }

  catch (err) {
    res.status(500).json({message: 'Unable to delete the blog post.', error: err.message})
  }
});

module.exports = router;