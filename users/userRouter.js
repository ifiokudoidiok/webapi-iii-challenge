const express = require('express');

const dbUser = require('./userDb');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id',validateUserId, getUserById);
// userRouter.post('/', postUser);
// userRouter.post('/:id/posts', createUsersPost);
// userRouter.get('/:id/posts', getUsersPost);
// userRouter.delete('/:id', deleteUser);
// userRouter.put('/:id', editUser);

function getUserById(req, res){
    res.json(req.user);
}

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
    const id = req.params.id;
    dbUser.getById(id)
    .then(user => {
        if(user){
            req.user = user;
            next()
        }else{
            res.status(404).json({ message: 'Post id does not correspond with an actual post' });
        }
    })
    .catch(error => {
        res.status(404).json({ message: 'Something terrible happend while checking hub id: ' + error.message,})
    })
}

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = userRouter;
