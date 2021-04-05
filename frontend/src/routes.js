import Projects from './views/Projects/Projects'
import NewProject from './views/NewProject/NewProject'
import axios from 'axios'

const routes = [
  {
    path: "/newproject",
    name: "New Project",
    icon: "tim-icons icon-simple-add",
    component: NewProject,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "projects",
    icon: "tim-icons icon-chart-pie-36",
    layout: "/admin",
    state: "pagesCollapse",
    collapse: true,
    views: [],
  },

];

var config = {
  method: 'get',
  url: 'http://localhost:3003/project/index',
  headers: {}
};

let responseProject = []
axios(config)
  .then(function (response) {
    responseProject = response.data

    for (let i = 0; i < responseProject.length; i += 1) {
      routes[1].views.push({
        path: `/${responseProject[i]._id}`,
        name: responseProject[i].project_name,
        mini: "A",
        component: Projects,
        layout: "/admin"
      })
    }
  })
  .catch(function (error) {
    console.log(error);
  });

export default routes;
