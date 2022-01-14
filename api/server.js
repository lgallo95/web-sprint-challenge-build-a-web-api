const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router.js')
// const actionsRouter = require('./actions/actions-router.js')

server.use(express.json())

server.use('/api/projects', projectsRouter)
// server.use('/api/actions', actionsRouter)


module.exports = server;
