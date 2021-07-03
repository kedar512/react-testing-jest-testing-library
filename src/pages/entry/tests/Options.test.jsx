import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

describe("<Options />", () => {
  test("Scoop images are shown when component loads", async () => {
    render(<Options optionType="scoops" />);
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);
    const scoopAltTexts = scoopImages.map((elem) => elem.alt);
    expect(scoopAltTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
  test("Topping images are shown when component loads", async () => {
    render(<Options optionType="toppings" />);
    const toppingImages = await screen.findAllByRole("img", {
      name: /topping/i,
    });
    expect(toppingImages).toHaveLength(2);
    const toppingAltTexts = toppingImages.map((elem) => elem.alt);
    expect(toppingAltTexts).toEqual(["Cherries topping", "Mochi topping"]);
  });

  test("Scoops sub total is not updated when any invalid value in entered in scoops count", async () => {
    render(<Options optionType="scoops" />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");
    const scoopsTotal = screen.getByText(/scoops total/i);
    expect(scoopsTotal).toHaveTextContent("0.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1.4");
    const scoopsTotalFloatInput = screen.getByText(/scoops total/i);
    expect(scoopsTotalFloatInput).toHaveTextContent("0.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "15");
    const scoopsTotalHigherValue = screen.getByText(/scoops total/i);
    expect(scoopsTotalHigherValue).toHaveTextContent("0.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    const scoopsTotalValidValue = screen.getByText(/scoops total/i);
    expect(scoopsTotalValidValue).toHaveTextContent("4.00");
  });
});
