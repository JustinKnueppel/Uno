import { expect } from "chai";
import * as Card from "../src/card";

describe("Card has class Card", () => {
  it("Should exist", () => {
    expect(Card.Card).is.not.undefined;
  });
});

describe("Card has Type enum", () => {
  it("Should exist", () => {
    expect(Card.Type).is.not.undefined;
  });
});

describe("Card has Color enum", () => {
  it("Should exist", () => {
    expect(Card.Color).is.not.undefined;
  });
});

describe("Card can be instantiated", () => {
  it("Should create an object", () => {
    expect(new Card.Card(Card.Type.ZERO, Card.Color.RED)).is.not.null;
  });
});
