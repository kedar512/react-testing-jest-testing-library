import { Fragment } from "react";
import Button from "react-bootstrap/Button";

import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = () => {
  /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "_updateItemCount" }]*/
  const [orderDetails, _updateItemCount, updateOrderPhase] = useOrderDetails();
  const zeroCountPattern = /0.00/;
  const isDisabled = zeroCountPattern.test(orderDetails.totals["scoops"]);
  return (
    <Fragment>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
      <Button
        variant="primary"
        type="submit"
        disabled={isDisabled}
        onClick={() => updateOrderPhase("review")}
      >
        Order Summary
      </Button>
    </Fragment>
  );
};

export default OrderEntry;
