const express = require('express');

const dbUser = require('./userDb');
const dbPost = require('../posts/postDb')

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id',validateUserId, getUserById);
userRouter.post('/', validateUser , postUser);
userRouter.delete('/:id',validateUserId, deleteUser);
userRouter.put('/:id', validateUserId, validateUser, editUser);
userRouter.get('/:id/posts',validateUserId,  getUsersPost);
userRouter.post('/:id/posts',validateUserId, validatePost, createUsersPost);

function createUsersPost(req, res) {
    dbPost.insert({text:req.body.text, user_id:req.user.id})
    .then(created => {
        res.status(201).json(created)
    })
    .catch(error => {
    
        res.status(500).json({
          message: 'Error : ' + error.message,
        });
      })
}

function getUsersPost(req, res) {
    dbUser.getUserPosts(req.user.id)
    .then(posts => {
        res.status(200).json({
            success: true,
            posts
        })
    })
    .catch(error => {
    
        res.status(500).json({
          message: 'Error : ' + error.message,
        });
      })
}

function editUser(req,res){
    dbUser.update(req.user.id, req.body)
    .then(() => {
        res.status(200).json({...req.user, ...req.body})
        
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not Update Post: " + error
        })
    })
}

function deleteUser(req, res){
    dbUser.remove(req.user.id)
    .then(() => {
        res.status(200).json({message:"Deleted succesfully"})
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Could not Delete, Server error: "+error})
    })
}

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
    if (Object.keys(req.body).length) {
        if(req.body.text){
            next();

        }
        else
        {
            res.status(400).json({ message: "missing required text field" });
        }
      } 
      else 
      {
        res.status(400).json({ message: "missing post data" });
      }
}

module.exports = userRouter;
