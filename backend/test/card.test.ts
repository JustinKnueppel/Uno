import { expect } from "chai";
import Card from "../src/card";

describe("Card has class Card", () => {
  it("Should exist", () => {
    const card = new Card();
    expect(card).to.not.be.null;
  });
});
