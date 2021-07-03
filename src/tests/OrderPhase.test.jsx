import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import App from "../App";
import { server } from "../mocks/server";

describe("<App />", () => {
  test("Order phase happy path", async () => {
    // render app
    render(<App />);
    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    const cherryToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const mochiToppingCheckbox = screen.getByRole("checkbox", {
      name: "Mochi",
    });
    userEvent.click(cherryToppingCheckbox);
    userEvent.click(mochiToppingCheckbox);
    // find and click order summary button
    const orderSummary = screen.getByRole("button", {
      name: "Order Summary",
    });
    userEvent.click(orderSummary);
    // check summary information based on order
    const scoopsSubTotal = screen.getByRole("heading", {
      name: /^scoops/i,
    });
    const toppingsSubTotal = screen.getByRole("heading", {
      name: /^toppings/i,
    });
    const grandTotal = screen.getByRole("heading", { name: /^total/i });
    expect(scoopsSubTotal).toHaveTextContent("2.00");
    expect(toppingsSubTotal).toHaveTextContent("3.00");
    expect(grandTotal).toHaveTextContent("5.00");
    const vanillaCount = screen.getByText(/1 Vanilla/i);
    const cherries = screen.getByText(/Cherries/i);
    const mochi = screen.getByText(/Mochi/i);
    expect(vanillaCount).toBeInTheDocument();
    expect(cherries).toBeInTheDocument();
    expect(mochi).toBeInTheDocument();
    // accept terms and conditions and click confirm order button
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm Order",
    });
    userEvent.click(termsCheckbox);
    userEvent.click(confirmOrderButton);
    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
    // click "new order" button on confirmation page
    const orderConfirmationMessage = await screen.findByText(
      /Your order number is/i
    );
    const createNewOrderButton = screen.getByRole("button", {
      name: "Create New Order",
    });
    expect(orderConfirmationMessage).toBeInTheDocument();
    userEvent.click(createNewOrderButton);
    // check scoops and toppings sub totals are reset to default
    const scoopsSubtotalNewOrder = screen.getByText("Scoops total: $", {
      exact: false,
    });
    const toppingsSubTotalNewOrder = screen.getByText("Toppings total: $", {
      exact: false,
    });
    const grandTotalNewOrder = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(scoopsSubtotalNewOrder).toHaveTextContent("0.00");
    expect(toppingsSubTotalNewOrder).toHaveTextContent("0.00");
    expect(grandTotalNewOrder).toHaveTextContent("0.00");

    // Wait for items to appear so that 'Log after tests are done' does not appear
    await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await screen.findByRole("checkbox", {
      name: "Cherries",
    });
  });
  test("Order phase happy path without toppings", async () => {
    // render app
    render(<App />);
    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    // find and click order summary button
    const orderSummary = screen.getByRole("button", {
      name: "Order Summary",
    });
    userEvent.click(orderSummary);
    // check summary information based on order
    const scoopsSubTotal = screen.getByRole("heading", {
      name: /^scoops/i,
    });
    const toppingsSubTotal = screen.queryByRole("heading", {
      name: /^toppings/i,
    });
    const grandTotal = screen.getByRole("heading", { name: /^total/i });
    expect(scoopsSubTotal).toHaveTextContent("2.00");
    expect(toppingsSubTotal).not.toBeInTheDocument();
    expect(grandTotal).toHaveTextContent("2.00");
    const vanillaCount = screen.getByText(/1 Vanilla/i);
    expect(vanillaCount).toBeInTheDocument();
  });
  test("there is an error message shown on order confirmation page when there is an error in placing order", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(
          ctx.json([
            { name: "Chocolate", imagePath: "/images/chocolate.png" },
            { name: "Vanilla", imagePath: "/images/vanilla.png" },
          ])
        );
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(
          ctx.json([
            { name: "Cherries", imagePath: "/images/cherries.png" },
            { name: "Mochi", imagePath: "images/mochi.png" },
          ])
        );
      }),
      rest.post("http://localhost:3030/orders", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    // render app
    render(<App />);
    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    const cherryToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const mochiToppingCheckbox = screen.getByRole("checkbox", {
      name: "Mochi",
    });
    userEvent.click(cherryToppingCheckbox);
    userEvent.click(mochiToppingCheckbox);
    // find and click order summary button
    const orderSummary = screen.getByRole("button", {
      name: "Order Summary",
    });
    userEvent.click(orderSummary);
    // check summary information based on order
    const scoopsSubTotal = screen.getByRole("heading", {
      name: /^scoops/i,
    });
    const toppingsSubTotal = screen.getByRole("heading", {
      name: /^toppings/i,
    });
    const grandTotal = screen.getByRole("heading", { name: /^total/i });
    expect(scoopsSubTotal).toHaveTextContent("2.00");
    expect(toppingsSubTotal).toHaveTextContent("3.00");
    expect(grandTotal).toHaveTextContent("5.00");
    const vanillaCount = screen.getByText(/1 Vanilla/i);
    const cherries = screen.getByText(/Cherries/i);
    const mochi = screen.getByText(/Mochi/i);
    expect(vanillaCount).toBeInTheDocument();
    expect(cherries).toBeInTheDocument();
    expect(mochi).toBeInTheDocument();
    // accept terms and conditions and click confirm order button
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm Order",
    });
    userEvent.click(termsCheckbox);
    userEvent.click(confirmOrderButton);
    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
    // click "new order" button on confirmation page
    const orderConfirmationMessage = await screen.findByText(
      /An error occured/i
    );
    expect(orderConfirmationMessage).toBeInTheDocument();
  });
});
