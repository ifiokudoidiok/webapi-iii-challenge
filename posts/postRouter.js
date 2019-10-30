const express = require('express');

const dbPost = require('./postDb')

const postRouter = express.Router();


postRouter.get('/', getAllPosts);
postRouter.get('/:id', validatePostId, getPostById);
// postRouter.delete('/:id', deletePost);
// postRouter.put('/:id', editPost);

function getAllPosts(req, res) {
    dbPost.get().then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "info not available: " + error 
        })
    })
}

function getPostById(req, res) {
res.json(req.post);
}

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;
    dbPost.getById(id)
    .then(post => {
        if(post){
            req.post = post;
            next()
        }else{
            res.status(404).json({ message: 'Post id does not correspond with an actual post' });
        }
    })
    .catch(error => {
        res.status(404).json({ message: 'Something terrible happend while checking hub id: ' + error.message,})
    })

}

module.exports = postRouter;