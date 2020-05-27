import { expect } from "chai";
import * as Card from "../src/card";

describe("Card", () => {
  it("Card class exists", () => {
    expect(Card.Card).is.not.undefined;
  });

  it("Type enum exists", () => {
    expect(Card.Type).is.not.undefined;
  });

  it("Color enum exists", () => {
    expect(Card.Color).is.not.undefined;
  });

  it("Card can be instantiated", () => {
    expect(new Card.Card(Card.Type.ZERO, Card.Color.RED)).is.not.null;
  });

})
