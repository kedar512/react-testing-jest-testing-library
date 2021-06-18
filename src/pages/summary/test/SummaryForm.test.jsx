import { render, screen, fireEvent } from "@testing-library/react";

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
    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    expect(confirmOrderButton).toBeEnabled();
    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();
  });
});
