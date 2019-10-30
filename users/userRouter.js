const express = require('express');

const dbUser = require('./userDb');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
// userRouter.post('/', postUser);
// userRouter.post('/:id/posts', createUsersPost);
// userRouter.get('/:id', getUserById);
// userRouter.get('/:id/posts', getUsersPost);
// userRouter.delete('/:id', deleteUser);
// userRouter.put('/:id', editUser);

function getAllUsers(req, res) {
 dbUser.get().then(users => {
     res.status(200).json(users)
 })
 .catch(error => {
    res.status(500).json({
        errorMessage: "info not available: " + error 
    })
})
}

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = userRouter;
