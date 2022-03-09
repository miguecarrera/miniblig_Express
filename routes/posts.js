let express = require('express');
let router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')

router.post('/add', function (req, res, next) {
    const { title, content, userId } = req.body;
    User.findById(userId, (err, u) => {
        let post = new Post({
            user: u,
            title,
            description: content,
        })
        u.posts.push(post);
        u.save(function (err) {
            if (err) return res.status(500).send(err);
            post.save(function (err) {
                if (err) return res.status(500).send(err);
                res.send('Post added');
            })
        });
    })
})

router.post('/all', function (req, res) {
    Post.find().sort('-creationdate').exec(function (err, posts) {
        if (err) return res.status(500).send(err);
        res.json(posts);
    })
})

router.post('/all/:id', function (req, res) {
    const { id } = req.params;
    Post.find({ user: id }).sort('-creationdate').exec(function (err, posts) {
        if (err) return res.status(500).send(err);
        res.json(posts);
    })
})

router.post('/:id', function (req, res) {
    const { id } = req.params;
    Post.findById(id, (err, p) => {
        if (err) return res.status(500).send(err);
        res.json(p);
    })
})

router.put('/:id', function (req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    Post.findByIdAndUpdate(id, {
        title,
        description: content
    }, (err, post) => {
        if (err) return res.status(500).send(err);
        res.send('Post updated');
    })
})


router.delete('/:id', function (req, res) {
    const { id } = req.params;
    Post.findByIdAndDelete(id, (err, post) => {
        if (err) return res.status(500).send(err);
        User.findOneAndUpdate(id, { $pull: { posts: post._id } }, function (err, posts) {
            if (err) return res.status(500).send(err);
            res.send('Post deleted');
        })
    })
})

module.exports = router;