import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("Update scoops subtotal when scoops are added or removed", async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Update toppings total when any topping is checked or unchecked", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent("0.00");
  const cherryToppingCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const mochiToppingCheckbox = await screen.findByRole("checkbox", {
    name: "Mochi",
  });
  userEvent.click(cherryToppingCheckbox);
  expect(toppingsSubTotal).toHaveTextContent("1.50");
  userEvent.click(mochiToppingCheckbox);
  expect(toppingsSubTotal).toHaveTextContent("3.00");
  userEvent.click(mochiToppingCheckbox);
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates when scoops are added", async () => {
    render(<OrderEntry />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("2.00");
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("6.00");
  });
  test("grand total updates when toppings are selected", async () => {
    render(<OrderEntry />);
    const cherryToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const mochiToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Mochi",
    });
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    userEvent.click(cherryToppingCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");
    userEvent.click(mochiToppingCheckbox);
    expect(grandTotal).toHaveTextContent("3.00");
  });
  test("grand total updates when both scoops and toppings are added", async () => {
    render(<OrderEntry />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    const cherryToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const mochiToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Mochi",
    });
    userEvent.click(cherryToppingCheckbox);
    userEvent.click(mochiToppingCheckbox);
    expect(grandTotal).toHaveTextContent("9.00");
    userEvent.click(cherryToppingCheckbox);
    expect(grandTotal).toHaveTextContent("7.50");
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "0");
    expect(grandTotal).toHaveTextContent("3.50");
  });
});
