import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
);

class SummaryForm extends React.Component {
  state = {
    isTermsCheckboxChecked: false,
  };

  handleTermsCheckboxChanged = (e) => {
    this.setState({ isTermsCheckboxChecked: e.target.checked });
  };
  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          No ice cream will actually be delivered
        </Popover.Content>
      </Popover>
    );
    const termsLabel = (
      <span>
        I agree to
        <OverlayTrigger placement="right" overlay={popover}>
          <span style={{ color: "blue" }}>Terms and Conditions</span>
        </OverlayTrigger>
      </span>
    );
    return (
      <Form>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={this.state.isTermsCheckboxChecked}
            onChange={this.handleTermsCheckboxChanged}
            label={termsLabel}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!this.state.isTermsCheckboxChecked}
        >
          Confirm Order
        </Button>
      </Form>
    );
  }
}

export default SummaryForm;
