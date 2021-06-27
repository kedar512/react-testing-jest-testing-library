import Container from "react-bootstrap/Container";

import { OrderDetailsProvider } from "./contexts/OrderDetails";
import ParentPage from "./pages/ParentPage/ParentPage";

function App() {
  // const [orderDetails] = useOrderDetails();
  // const currentComponent =
  //   "inProgress" === orderDetails["orderPhase"] ? (
  //     <OrderEntry />
  //   ) : "review" === orderDetails["orderPhase"] ? (
  //     <SummaryForm />
  //   ) : (
  //     <OrderConfirmation />
  //   );
  return (
    <Container>
      <OrderDetailsProvider>
        <ParentPage />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
