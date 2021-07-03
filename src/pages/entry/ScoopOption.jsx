import { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isValidInput, setIsValidInput] = useState(true);
  const handleChange = (event) => {
    const integerPattern = /^[0-9]+$/;
    const input = parseInt(event.target.value);
    if (integerPattern.test(event.target.value) && input <= 10) {
      setIsValidInput(true);
      updateItemCount(name, event.target.value);
    } else {
      setIsValidInput(false);
      updateItemCount(name, "0");
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} scoop`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            isInvalid={!isValidInput}
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
export default ScoopOption;
