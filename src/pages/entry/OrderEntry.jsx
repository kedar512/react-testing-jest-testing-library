import { Fragment } from "react";

import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();
  return (
    <Fragment>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
    </Fragment>
  );
};

export default OrderEntry;
