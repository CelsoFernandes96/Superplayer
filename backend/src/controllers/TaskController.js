const serviceTask = require('../services/taskService')
const moment = require('moment')

class TaskController {
  /*
    @id_project type string
  */
  async index(req, res) {
    try {
      let { id_project } = req.query

      if (id_project) {
        const tasks = await serviceTask.listTasksPerProject(id_project)
        const listTasks = tasks.map(item => {
          const date1 = new Date(`${item.duo_date}`)
          const today = moment().format('YYYY-MM-DD')
          const date2 = new Date(today)

          let diffDays = ''
          if (date1 > date2) {
            const diffTime = Math.abs(date1 - date2);
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays)
          } else {
            const diffTime = Math.abs(date1 - date2);
            diffDays = Math.ceil(diffTime * (-1) / (1000 * 60 * 60 * 24));
            console.log(diffDays)
          }

          let duoDate = ''
          let statusTask = ''
          if (diffDays > 0) {
            if (diffDays === 1) {
              duoDate = 'tomorrow'
            } else {
              duoDate = moment(item.duo_date).format('DD/MM')
            }

            statusTask = 'in time'
          } else if (diffDays === 0) {
            duoDate = 'today'
            statusTask = 'in time'
          } else {
            if (diffDays === -1) {
              duoDate = 'yesterday'
            } else {
              duoDate = moment(item.duo_date).format('DD/MM')
            }
            statusTask = 'late'
          }

          return {
            "_id": item._id,
            "id_project": item.id_project,
            "description": item.description,
            "duo_date": duoDate,
            "owner": item.owner,
            "status": item.status,
            "conclusion": item.conclusionm,
            "statusTask": statusTask,
            "conclusion": item.conclusion
          }
        })
        res.status(200).json(listTasks)
      } else {
        const tasks = await serviceTask.listTasks()
        res.status(200).json(tasks)
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }

  /*
    @description type string
    @duo_date type string
    @owner type string
  */
  async post(req, res) {
    try {
      const isArray = Array.isArray(req.body);
      let postLote = []
      if (isArray === true) {
        for (let i = 0; i < req.body.length; i += 1) {
          const postProject = await serviceTask.postTask(
            req.body[i].description,
            req.body[i].duo_date,
            req.body[i].owner,
            req.body[i].id_project
          )
          postLote.push(postProject.ops)
        }
        console.log(postLote)
        if (postLote.length > 0) { //VERIFICA SE DEU SUCESSO A INSERÇÃO DO REGISTRO NO BANCO
          res.status(200).json({ message: "Sucesso" })
        } else {
          res.status(200).json({})
        }
      } else {
        let { description, duo_date, owner, id_project } = req.body

        if (!description) {
          throw "A descrição da tarefa é obrigatório"
        }

        if (!duo_date) {
          throw "data de vencimento é obrigatório"
        }

        if (!owner) {
          throw "Author da tarefa é obrigatório"
        }

        if (!id_project) {
          throw "id_project é obrigatório"
        }

        const postProject = await serviceTask.postTask(
          description,
          duo_date,
          owner,
          id_project
        )

        if (postProject.ops.length > 0) { //VERIFICA SE DEU SUCESSO A INSERÇÃO DO REGISTRO NO BANCO
          res.status(200).json({ message: "Sucesso" })
        } else {
          res.status(200).json({})
        }
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }

  async put(req, res) {
    try {
      let { id_project } = req.query

      const putProject = await serviceTask.putTask(
        id_project
      )
      console.log(putProject)
      res.status(200).json({ message: "Sucesso" })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }
}

module.exports = new TaskController()