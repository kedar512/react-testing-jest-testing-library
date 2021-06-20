import { render, screen } from "../../../test-utils/testing-library-utils";

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
});
