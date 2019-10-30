const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(helmet());

server.use(express.json());
server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/users', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
server.get('/posts', (req, res) => {
  res.send('Posts api is running')
})
server.get('/users', (req, res) => {
  res.send('Users api is running')
})

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
