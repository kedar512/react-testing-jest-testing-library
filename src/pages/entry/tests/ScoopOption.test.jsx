import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScoopOption from "../ScoopOption";

test("Scoop count box borders turn red when invalid scoop count is enered", () => {
  render(
    <ScoopOption
      name="Vanilla"
      imagePath="/images"
      updateItemCount={jest.fn()}
    />
  );
  const vanillaInput = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "20");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
