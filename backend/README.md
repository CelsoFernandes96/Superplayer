# Superplayer & Co

## Summary

<p>
This is an application made with Node.js technology, with the purpose of creating a project management api.
</p>

### Features

- [x] On the top of the page, there's the project name, a "project status" and a link to delete the project.
- [x] The "project status" is a count of the project's completed tasks / project's late tasks / project's total tasks. In the above example the project have one completed and one late task from a total of five: 1 / 1 / 5.
- [x] Each task is represented in single line with a checkbox, a description, its owner and its due date, in this order.
- [x] When a task's checkbox is checked, it is marked as completed.
- [x] Completed tasks are strikethrough and have a different color (try “#ccc”) from the others.
- [x] The task owner's name is preceded by an "@" to better identify it.
- [x] The task due date is the last information in the task line. In the example above it is a relative date. Use relative dates is not a requirement but it is much better. Try it ;)
- [x] Late tasks are red colored. This way is easy to check when a task is late or not.
- [x] After the list of tasks, there's a link to add a new task to the project.


## Prerequisites

Before you begin, you will need to have the following tools installed on your machine:
[Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/).
In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

### 🎲 Back End (server)

```bash
# Clone this repository
$ git clone <https://github.com/CelsoFernandes96/Superplayer/tree/master/backend>

# Access the project folder in the / cmd terminal
$ cd <project_name>

# go to the server folder
$ cd <project_name>

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev:server

# The server will start porta:3003 - acesse <http://localhost:3003>
