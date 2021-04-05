import React from "react";
import axios from 'axios';

import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Label
} from "reactstrap";

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ description: "", owner: "", duo_date: "" }],
      idProject: "",
      value: ""
    };

    this.handleSubmitProject = this.handleSubmitProject.bind(this)
    this.handleChangeProject = this.handleChangeProject.bind(this)
  }

  handleShareholderNameChange = (idx, event) => evt => {
    if (event === 'description') {
      const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return {
          ...shareholder,
          description: evt.target.value,
        };
      });

      this.setState({ shareholders: newShareholders });
    } else if (event === 'owner') {
      const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return {
          ...shareholder,
          owner: evt.target.value
        };
      });

      this.setState({ shareholders: newShareholders });
    } else if (event === 'duo_date') {
      const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return {
          ...shareholder,
          duo_date: evt.target.value
        };
      });

      this.setState({ shareholders: newShareholders });
    }
  };

  handleSubmit = async evt => {
    if (this.state.idProject) {
      const { shareholders } = this.state;
      console.log(shareholders)
      shareholders.map((item, key) => {
        shareholders[key].id_project = this.state.idProject

        return 0
      })
      console.log(shareholders)
      const responseProject = await axios.post(`http://localhost:3003/task/post`, shareholders)
      console.log(responseProject.data)
      if (responseProject.status === 200) {
        window.location.reload()
      }
    }
  };

  handleSubmitProject = async e => {
    e.preventDefault();
    if (this.state.value) {
      const body = {
        "project_name": this.state.value
      }
      const responseProject = await axios.post(`http://localhost:3003/project/post`, body)
      this.setState({ idProject: responseProject.data.id_project });
    }
  };

  handleChangeProject(event) {
    this.setState({ value: event.target.value });
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ description: "", owner: "", duo_date: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              {this.state.idProject === "" ? (
                <form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="project_name">Project Name</Label>
                        <Input
                          type="text"
                          name="project_name"
                          id="project_name"
                          placeholder="Project name"
                          value={this.state.value}
                          onChange={this.handleChangeProject}
                        />
                      </FormGroup>
                      <hr></hr>
                      <Button onClick={this.handleSubmitProject} className="btn-simple" color="primary" type="submit">
                        Create project
                      </Button>
                    </Col>
                  </Row>
                </form>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  {/* ... */}
                  <h4>Tasks</h4>
                  <FormGroup>
                    {this.state.shareholders.map((shareholder, idx) => (
                      <Row>
                        <Col md="2">
                          <Input
                            style={{ "margin": "5px auto" }}
                            type="text"
                            placeholder={`description #${idx + 1} name`}
                            value={shareholder.description}
                            onChange={this.handleShareholderNameChange(idx, 'description')}
                          /></Col>
                        <Col md="2">
                          <Input
                            style={{ "margin": "5px auto" }}
                            type="text"
                            placeholder={`owner #${idx + 1} name`}
                            value={shareholder.owner}
                            onChange={this.handleShareholderNameChange(idx, 'owner')}
                          /></Col>
                        <Col md="2">
                          <Input
                            style={{ "margin": "5px auto" }}
                            type="date"
                            placeholder={`duo_date #${idx + 1} name`}
                            value={shareholder.duo_date}
                            onChange={this.handleShareholderNameChange(idx, 'duo_date')}
                          /></Col>
                        <Col md="6">
                          <Button
                            type="button"
                            onClick={this.handleRemoveShareholder(idx)}
                            className="btn-simple"
                          >
                            -
                      </Button></Col>
                      </Row>
                    ))}
                  </FormGroup>
                  <Button onClick={this.handleAddShareholder} className="btn-simple" color="primary">
                    Add task
                </Button>
                  <Button onClick={this.handleSubmit} className="btn-simple">Create task</Button>
                </form>
              )}
            </Col>
          </Row>
        </div >
      </>
    );
  }
}

export default Index;
