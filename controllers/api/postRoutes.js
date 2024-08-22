const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get one post
router.get('/:id', async (req, res) => {
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

    //then render the post
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

//post a new blog post
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

//get post for updating
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {});

    //if nothing is returned
    if (!postData) {
      res.status(404).json({message: 'Unable to locate the blog post.'});
      return;
    }

    //if a post is found, get comments and commenter
    const post = postData.get({ plain: true });
    const thisUser = req.session.user_id

    //then render the post
    res.render('update', {
      post,
      thisUser,
      logged_in: req.session.logged_in
    });
  } 
  catch (err) {
    res.status(500).json({message: 'Error retrieving the blog post.', error: err.message});
  }
});

//update post
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const updPost = await Post.update({
      title: req.body.title,
      text: req.body.text
    }, 
    {
      where: {
        id: req.params.id
      }
    });
    if (updPost) {
      res.status(200).json(updPost);
    }
    else {
      res.status(404).json({message: 'Unable to find the post to update.', error: err.message});
    }
  }
  catch (err) {
    res.status(400).json({message: 'Unable to update the blog post', error: err.message})
  }
});

//delete a post
router.delete ('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    //if post not found
    if (!postData) {
      res.status(404).json({message: 'Unable to locate the blog post.'})
      return;
    }
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json({message: 'Error deleting the blog post.', error: err.message})
  }
});

//post a new comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    const { text, post_id } = req.body;
    const newComment = await Comment.create({
      text,
      post_id: post_id,
      user_id: req.session.user_id
    });
    res.status(200).json(newComment)
  } 
  catch (err) {
    res.status(500).json({ message: 'Error adding the comment.', error: err.message });
  }
});

module.exports = router;