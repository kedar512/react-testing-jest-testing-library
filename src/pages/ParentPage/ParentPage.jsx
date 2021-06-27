import OrderEntry from "../../pages/entry/OrderEntry";
import SummaryForm from "../../pages/summary/SummaryForm";
import OrderConfirmation from "../../pages/OrderConfirmation/OrderConfirmation";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ParentPage = () => {
  const [orderDetails] = useOrderDetails();
  return "inProgress" === orderDetails["orderPhase"] ? (
    <OrderEntry />
  ) : "review" === orderDetails["orderPhase"] ? (
    <SummaryForm />
  ) : (
    <OrderConfirmation />
  );
};

export default ParentPage;
