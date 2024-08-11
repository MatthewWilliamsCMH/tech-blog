const router = require('express').Router();
const { text } = require('express');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

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

//update a post
router.get('/update', withAuth, (req, res) => {
  res.render('update')
})

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [newPost] = await Post.update({
      title: req.body.title,
      text: req.body.text
    },
    {
      where: {
        id: req.params.id,
        // user_id: req.session.user_id
      }
    });
      
    if (newPost) {
      const updatePost = await Post.findByPk(req.params.id);
      res.status(200).json(updatePost);
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

module.exports = router;