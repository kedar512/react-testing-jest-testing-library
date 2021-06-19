import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

describe("<SummaryForm />", () => {
  test("Initial conditions for checkbox and button", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(termsCheckbox).not.toBeChecked();
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm Order",
    });
    expect(confirmOrderButton).toBeDisabled();
  });
  test("Confirm Order button is enabled when terms checkbox is checked and vce-versa", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm Order",
    });
    userEvent.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    expect(confirmOrderButton).toBeEnabled();
    userEvent.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();
  });
  test("popover responds to hover", async () => {
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.getByText(/no ice cream will actually be delivered/i)
    );
  });
});
