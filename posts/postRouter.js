const express = require('express');

const dbPost = require('./postDb')

const postRouter = express.Router();


postRouter.get('/', getAllPosts);
// postRouter.get('/:id', getPostById);
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

// custom middleware

function validatePostId(req, res, next) {

}

module.exports = postRouter;