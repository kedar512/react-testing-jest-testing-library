import { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const [isChecked, setChecked] = useState(false);

  const handleChange = (event) => {
    const newCount = event.target.checked ? 1 : 0;
    updateItemCount(name, newCount);
    setChecked(event.target.checked);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`} as={Row}>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Check
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            label={name}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
