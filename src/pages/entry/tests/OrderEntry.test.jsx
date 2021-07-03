import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

describe("<OrderEntry />", () => {
  test("Alert is shown when there is any error in fetching scoops and toppings", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<OrderEntry />);
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
  test("Order button is disabled when there are not scoops and enabled when there is at least 1 scoop", async () => {
    render(<OrderEntry />);
    const orderButton = screen.getByRole("button", { name: "Order Summary" });
    expect(orderButton).toBeDisabled();
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();
  });
});
