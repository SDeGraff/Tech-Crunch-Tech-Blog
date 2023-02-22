const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'title', 'post_text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id) 
        const post = postData.get({ plain: true });

        res.render('post', {post});
        } catch (err) {
            res.status(500).json(err);
    }
}); 

router.get('/post/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'title', 'post_text', 'created_at'],
            });

        const post = postData.get({ plain: true });
        res.render('edit-post', {post, loggedIn: true});

    } catch (err) {
        res.status(500).json(err);
    }   
});

router.get('/post/create', withAuth, async (req, res) => {
    try {
        const postData = await post.findAll({
            where: {user_id: req.session.user_id},
            attributes: ['id', 'title', 'post_text', 'created_at'],
            });
            const posts = postData.com((post) =>
            trip.get({ plain: true })
        );
        res.render('create-post', {posts, loggedIn: true});
    } catch (err) {
        res.status(500).json(err);

    }
});

module.exports = router;