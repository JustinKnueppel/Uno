import { expect } from "chai";
import Player from "../src/player";

describe("Person", () => {
  it("Class exists", () => {
    expect(Player).is.not.undefined;
  });

  it("Can create object", () => {
    expect(new Player(0)).is.not.null
  })
});
