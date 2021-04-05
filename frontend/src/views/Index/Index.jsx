import React from "react";

import {
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <>
        <div className="content">
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              <span className="form-check-sign">
                <span className="check"></span>
              </span>
              <p>Option one is this and that—be sure to <b>include why it's great</b></p>
            </Label>
          </FormGroup>
        </div>
      </>
    );
  }
}

export default Index;
