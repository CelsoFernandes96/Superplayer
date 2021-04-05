const db = require('../config/database')
var ObjectId = require('mongodb').ObjectID;

const listTasks = async () => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('tasks').find({}).sort({ duo_date: 1 }).toArray().
      then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
  })
}

const listTasksPerProject = async (id_project) => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('tasks').find({
      "id_project": `${id_project}`
    }).sort({ duo_date: 1 }).toArray().
      then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
  })
}

const postTask = async (description, duo_date, owner, id_project) => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('tasks').insertOne(
      {
        "id_project": id_project,
        "description": description,
        "duo_date": duo_date,
        "owner": owner,
        "status": "in time",
        "conclusion": false
      }
    ).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

const putTask = async (id_project) => {
  const connect = await db.connect()
  return new Promise((resolve, reject) => {
    connect.collection('tasks').update(
      { "_id": ObjectId(id_project) },

      {
        $set: { "status": "completed", "conclusion": true }
      }
    ).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  listTasks,
  listTasksPerProject,
  postTask,
  putTask
}