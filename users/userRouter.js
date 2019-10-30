const express = require('express');

const dbUser = require('./userDb');

const userRouter = express.Router();

userRouter.post('/', (req, res) => {

});

userRouter.post('/:id/posts', (req, res) => {

});

userRouter.get('/', (req, res) => {

});

userRouter.get('/:id', (req, res) => {

});

userRouter.get('/:id/posts', (req, res) => {

});

userRouter.delete('/:id', (req, res) => {

});

userRouter.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = userRouter;
