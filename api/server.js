const express = require('express');
const server = express();
const cors = require('cors')
const projectsRouter = require('./projects/projects-router.js')
const actionsRouter = require('./actions/actions-router.js')

server.use(cors())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)


module.exports = server;
