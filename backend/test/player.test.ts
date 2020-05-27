import { expect } from "chai";
import Player from "../src/player";

describe("Person", () => {
  it("Class exists", () => {
    expect(Player).is.not.undefined;
  });

  it("Can create object", () => {
    const id = 0;
    expect(new Player(id)).is.not.null;
  });

  it("Has 0 points when created", () => {
    const id = 0;
    const player = new Player(id);
    expect(player.getPoints()).to.equal(0);
  });

  it("Can add points to current score", () => {
    const id = 0;
    const player = new Player(id);
    player.addPoints(10);
    expect(player.getPoints()).to.equal(10);

  })
});
