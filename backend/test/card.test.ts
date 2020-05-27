import { expect } from "chai";
import { Card, Type, Color } from "../src/card";

describe("Card", () => {
  it("Card class exists", () => {
    expect(Card).is.not.undefined;
  });

  it("Type enum exists", () => {
    expect(Type).is.not.undefined;
  });

  it("Color enum exists", () => {
    expect(Color).is.not.undefined;
  });

  it("Card can be instantiated", () => {
    expect(new Card(Type.ZERO, Color.RED)).is.not.null;
  });
})
