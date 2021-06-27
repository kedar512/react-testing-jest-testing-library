import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";

import { useOrderDetails } from "../../contexts/OrderDetails";

const SummaryForm = () => {
  const [isTermsCheckboxChecked, setTermsCheckboxChecked] = useState(false);
  const [scoopItems, setScoopItems] = useState([]);
  const [toppingItems, setToppingItems] = useState([]);
  /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[_updateItemCount]" }, ]*/
  const [orderDetails, __updateItemCount, updateOrderPhase, updateOrderNumber] =
    useOrderDetails();

  useEffect(() => {
    const newScoopItems = [];
    const newToppingItems = [];
    orderDetails["scoops"].forEach((value, key) => {
      newScoopItems.push(
        <li key={key}>
          {value} {key}
        </li>
      );
    });
    orderDetails["toppings"].forEach((_, key) => {
      newToppingItems.push(<li key={key}>{key}</li>);
    });
    setScoopItems(newScoopItems);
    setToppingItems(newToppingItems);
  }, [orderDetails]);

  const handleTermsCheckboxChanged = (e) => {
    setTermsCheckboxChecked(e.target.checked);
  };

  const placeOrder = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/orders", { odersDetail: "test" })
      .then((response) => {
        updateOrderNumber(response.data.orderNumber);
        updateOrderPhase("complete");
      })
      .catch((error) => {
        console.log(error);
        //TODO
      });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
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
      <Form.Group controlId="scoops-summary">
        <h2>Scoops: {orderDetails.totals["scoops"]}</h2>
        <ul>{scoopItems}</ul>
      </Form.Group>
      <Form.Group controlId="toppings-summary">
        <h2>Toppings: {orderDetails.totals["toppings"]}</h2>
        <ul>{toppingItems}</ul>
      </Form.Group>
      <Form.Group controlId="total">
        <h2>Total: {orderDetails.totals["grandTotal"]}</h2>
      </Form.Group>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isTermsCheckboxChecked}
          onChange={handleTermsCheckboxChanged}
          label={termsLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!isTermsCheckboxChecked}
        onClick={placeOrder}
      >
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
