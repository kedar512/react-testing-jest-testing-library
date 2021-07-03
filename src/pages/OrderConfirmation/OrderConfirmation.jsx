import { Fragment } from "react";
import Button from "react-bootstrap/Button";

import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = () => {
  /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[_updateItemCount]" }, ]*/
  const [orderDetails, _updateItemCount, updateOrderPhase] = useOrderDetails();
  const orderConfirmationMessage =
    null != orderDetails["orderNumber"] ? (
      <div>
        <h3>Thank You!</h3>
        <p>Your order number is {orderDetails["orderNumber"]}</p>
      </div>
    ) : (
      <p>An error occured</p>
    );

  return (
    <Fragment>
      {orderConfirmationMessage}
      <p></p>
      <Button onClick={() => updateOrderPhase("inProgress")}>
        Create New Order
      </Button>
    </Fragment>
  );
};

export default OrderConfirmation;
