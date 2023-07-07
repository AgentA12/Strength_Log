import { capitalizeFirstLetter } from "../functions";

describe("capitalizeFirstLetter works correctly", () => {
  it("caps the first letter of a string", () => {
    expect(capitalizeFirstLetter("andrew")).toEqual("Andrew");
    expect(capitalizeFirstLetter("andrew howran")).toEqual("Andrew howran");
    expect(capitalizeFirstLetter("andrew myles howran")).toEqual("Andrew myles howran");
  });
});
