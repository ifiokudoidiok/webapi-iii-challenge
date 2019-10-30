const express = require('express');

const dbUser = require('./userDb');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id',validateUserId, getUserById);
userRouter.post('/', validateUser , postUser);
// userRouter.post('/:id/posts', createUsersPost);
// userRouter.get('/:id/posts', getUsersPost);
// userRouter.delete('/:id', deleteUser);
// userRouter.put('/:id', editUser);

function postUser(req, res) {
    dbUser.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
    
        res.status(500).json({
          message: 'Error adding the new user: ' + error.message,
        });
      })
}

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
            res.status(404).json({ message: 'User id does not correspond with an actual User' });
        }
    })
    .catch(error => {
        res.status(404).json({ message: "invalid user id: "  + error.message})
    })

}


function validateUser(req, res, next) {
    if (Object.keys(req.body).length) {
        if(req.body.name){
            next();

        }
        else
        {
            res.status(400).json({ message: "missing required name field" });
        }
      } 
      else 
      {
        res.status(400).json({ message: "missing user data" });
      }
}

function validatePost(req, res, next) {

};

module.exports = userRouter;
