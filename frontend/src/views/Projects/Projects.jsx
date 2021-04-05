import React from "react";
import axios from "axios";
import { PulseLoader, ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody
} from "reactstrap";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: [],
      tasks: [],
      disabled: false,
      conclusion: '',
      late: '',
      total: '',
      loading: true,
      modalClassic: false,
      description: "",
      owner: "",
      duo_date: ""
    }

    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
  }

  async componentDidMount() {
    const url = window.location.href
    const idProject = url.split('admin/')[1]
    const responseTasks = await axios.get(`http://localhost:3003/task/index?id_project=${idProject}`, {})
    let conclusion = 0
    let late = 0
    let total = 0
    for (let i = 0; i < responseTasks.data.length; i += 1) {
      if (responseTasks.data[i].conclusion === true) {
        conclusion += 1
      } else {
        if (responseTasks.data[i].statusTask === 'late') {
          late += 1
        }
      }

      total += 1
    }

    this.setState({ conclusion: conclusion })
    this.setState({ late: late })
    this.setState({ total: total })
    this.setState({ loading: false })
    this.setState({ tasks: responseTasks.data })
  }

  async handleChangeChk(e) {
    if (document.getElementById(e).checked === true) {
      var box1 = window.confirm("Do you want to complete the task? ?");
      if (box1 === true) {
        await axios.put(`http://localhost:3003/task/put?id_project=${e}`, {})
        document.getElementById(e).disabled = true;
        return true;
      } else {
        document.getElementById(e).checked = false;
      }
    }
  }

  async handleDeleteProject(e) {
    const resposne = await axios.delete(`http://localhost:3003/project/delete?id_project=${e}`, {})
    console.log(resposne)
    window.location.reload()
  }

  async handleSubmitTask(e) {
    e.preventDefault();
    const url = window.location.href
    const idProject = url.split('admin/')[1]
    const body = {
      "description": this.state.description,
      "duo_date": this.state.duo_date,
      "owner": this.state.owner,
      "id_project": `${idProject}`
    }
    const responseTask = await axios.post(`http://localhost:3003/task/post`, body)
    console.log(responseTask)
    if (responseTask.status === 200) {
      window.location.reload()
    }
  }

  handleChangeTask(event, field) {
    if (field === 'description') {
      this.setState({ description: event.target.value });
    }

    if (field === 'owner') {
      this.setState({ owner: event.target.value });
    }

    if (field === 'duo_date') {
      this.setState({ duo_date: event.target.value });
    }
  }

  /* MODAL */
  toggleModalClassic = () => {
    console.log('clicou aqui')
    this.setState({
      modalClassic: !this.state.modalClassic
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              {this.state.loading === true ? (
                <PulseLoader
                  css={override}
                  sizeUnit={"px"}
                  size={10}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              ) : (
                <p>{this.state.conclusion}/{this.state.late}/{this.state.total} -
                  <Button style={{ height: "35px" }} onClick={() => {
                    if (window.confirm('Do you want to delete the project?')) {
                      const url = window.location.href
                      const idProject = url.split('admin/')[1]
                      this.handleDeleteProject(idProject)
                    }
                  }} className="btn-link btn-danger" color="danger">
                    <i style={{ margin: "0px 3px 4px 0px" }} className="tim-icons icon-simple-remove" /> Delete Project
                              </Button></p>
              )}
            </Col>
          </Row>
          <hr></hr>
          <Row>
            {this.state.loading === true ? (
              <Col md="12">
                <ClipLoader
                  css={override}
                  sizeUnit={"px"}
                  size={50}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              </Col>
            ) : (
              <Col md="12">
                {this.state.tasks.map((object) =>
                  <FormGroup
                    check key={object._id}>
                    <Label check >
                      {object.conclusion === true ? (
                        <Input type="checkbox"
                          id={object._id}
                          value={object._id}
                          defaultChecked={true}
                          onChange={() =>
                            this.handleChangeChk(object._id)
                          }
                          disabled={true}
                        />
                      ) : (
                        <Input type="checkbox"
                          id={object._id}
                          value={object._id}
                          checked={this.state.check[object._id]}
                          onChange={() =>
                            this.handleChangeChk(object._id)
                          }
                          disabled={this.state.disabled}
                        />
                      )}
                      < span className="form-check-sign" >
                        <span className="check"></span>
                      </span>
                      {object.statusTask === 'late' ? (
                        <p style={{ color: "red" }}>{object.description} <b style={{ color: "#ccc" }}>@{object.owner}</b> {object.duo_date}</p>
                      ) : (
                        <p>{object.description} <b style={{ color: "#ccc" }}>@{object.owner}</b> {object.duo_date}</p>
                      )}
                    </Label>
                  </FormGroup>
                )}
                <hr></hr>
                <Button onClick={this.toggleModalClassic} style={{ height: "35px" }} className="btn-link" color="info">
                  <i style={{ margin: "0px 3px 4px 0px" }} className="fa fa-plus" /> Add Task
                  </Button>
              </Col>
            )}
          </Row>
          <Modal
            isOpen={this.state.modalClassic}
            toggle={this.toggleModalClassic}
          >
            <div className="modal-header justify-content-center">
              <button
                aria-hidden={true}
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleModalClassic}
              >
                <i className="tim-icons icon-simple-remove" />
              </button>
              <h6 className="title title-up">Add Task</h6>
            </div>
            <ModalBody className="text-center">
              <Row>
                <form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Project name"
                          value={this.state.description}
                          onChange={(e) => this.handleChangeTask(e, 'description')}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="owner">Owner</Label>
                        <Input
                          type="text"
                          name="owner"
                          id="owner"
                          placeholder="Owner"
                          value={this.state.owner}
                          onChange={(e) => this.handleChangeTask(e, 'owner')}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="duo_date">Duo Date</Label>
                        <Input
                          type="date"
                          name="duo_date"
                          id="duo_date"
                          placeholder="Duo Date"
                          value={this.state.value}
                          onChange={(e) => this.handleChangeTask(e, 'duo_date')}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </Row>
              <hr></hr>
            </ModalBody>
            <div className="modal-footer">
              <Button
                color="danger"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleModalClassic}
                className="btn-simple"
              >
                Fechar
            </Button>
              <Button
                color="info"
                type="button"
                onClick={this.handleSubmitTask}
                className="btn-simple"
              >
                Enviar
            </Button>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

export default Projects;
