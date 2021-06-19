import { Fragment } from "react";

import Options from "./Options";

const OrderEntry = () => {
  return (
    <Fragment>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </Fragment>
  );
};

export default OrderEntry;
