const serviceProject = require('../services/projectService')

class ProjectController {
  async index(req, res) {
    try {
      const tasks = await serviceProject.listProjects()
      res.status(200).json(tasks)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }

  /*
    @project_name type string
  */
  async post(req, res) {
    try {
      let { project_name } = req.body

      if (!project_name) {
        throw "O nome do projeto é obrigatório"
      }

      const postProject = await serviceProject.postProject(
        project_name
      )

      if (postProject.ops.length > 0) { //VERIFICA SE DEU SUCESSO A INSERÇÃO DO REGISTRO NO BANCO
        res.status(200).json({ message: "Sucesso", id_project: postProject.ops[0]._id })
      } else {
        res.status(200).json({})
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }

  async put(req, res) {
    res.json({
      "message": "Sucesso."
    })
  }


  /*
    @id_project type string
  */
  async delete(req, res) {
    try {
      let { id_project } = req.query

      if (!id_project) {
        throw "O id_project é obrigatório"
      }

      const resultDeleteProject = await serviceProject.deleteProject(
        id_project
      )

      const resultDeleteTask = await serviceProject.deleteTasksPerProject(
        id_project
      )

      console.log(resultDeleteTask)

      res.json({
        "message": "Sucesso."
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }
}

module.exports = new ProjectController()