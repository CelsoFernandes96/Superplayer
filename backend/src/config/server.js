const express = require('express')
const cors = require('cors')

const server = express()

// MIDDLEWARES
server.use(express.json())
server.use(cors())

/* CONTROLLERS */
const TaskController = require('../controllers/TaskController')
const ProjectController = require('../controllers/ProjectController')

/* ROUTES */
server.get(`/`, (req, res) => {
  res.status(200).json({
    'message': 'Api Portal de gerenciamento de projeto online.'
  })
})

/* TAREFAS */
server.get(`/task/index`, TaskController.index)
server.post(`/task/post`, TaskController.post)
server.put(`/task/put`, TaskController.put)

/* PROJETO */
server.get(`/project/index`, ProjectController.index)
server.post(`/project/post`, ProjectController.post)
server.put(`/project/put`, ProjectController.put)
server.delete(`/project/delete`, ProjectController.delete)


server.listen(3003)