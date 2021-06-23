import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { pricePerItem } from "../constants/index";
import { formatCurrency } from "../utilities";

const OrderDetails = createContext();

const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be use within OrderDetailsProvider only"
    );
  }
  return context;
};

const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroFomatted = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroFomatted,
    toppings: zeroFomatted,
    grandTotal: zeroFomatted,
  });

  useEffect(() => {
    const scoopsTotal = calculateTotals("scoops", optionCounts);
    const toppingsTotal = calculateTotals("toppings", optionCounts);
    const grandTotal = scoopsTotal + toppingsTotal;
    setTotals({
      scoops: formatCurrency(scoopsTotal),
      toppings: formatCurrency(toppingsTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);
  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionsCounts = { ...optionCounts };

      const optionCountMap = newOptionsCounts[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionsCounts);
    };
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};

const calculateTotals = (type, optionCounts) => {
  let total = 0;

  for (const value of optionCounts[type].values()) {
    total += value;
  }
  return total * pricePerItem[type];
};

export { useOrderDetails, OrderDetailsProvider };
