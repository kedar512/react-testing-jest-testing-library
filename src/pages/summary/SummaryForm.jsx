import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SummaryForm extends React.Component {
  state = {
    isTermsCheckboxChecked: false,
  };

  handleTermsCheckboxChanged = (e) => {
    this.setState({ isTermsCheckboxChecked: e.target.checked });
  };
  render() {
    const termsLabel = (
      <span>
        I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
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
