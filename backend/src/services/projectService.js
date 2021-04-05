const db = require('../config/database')
var ObjectId = require('mongodb').ObjectID;

const listProjects = async () => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('projects').find({}).toArray().
      then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
  })
}

const postProject = async (project_name) => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('projects').insertOne(
      {
        "project_name": project_name
      }
    ).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

const deleteProject = async (id_project) => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('projects').deleteOne(
      {
        "_id": ObjectId(id_project)
      }
    ).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

const deleteTasksPerProject = async (id_project) => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('tasks').deleteOne(
      {
        "id_project": id_project
      }
    ).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  listProjects,
  postProject,
  deleteProject,
  deleteTasksPerProject
}