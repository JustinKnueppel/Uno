import { expect } from "chai";
import * as Helpers from "../src/helpers";
import { Card, Type, Color } from "../src/card";

describe("Helper functions", () => {
  describe("canPlayOn", () => {
    it("Has can play on function", () => {
      expect(Helpers.canPlayOn).is.not.undefined;
    });

    it("Play different number on same color", () => {
      const firstBlue: Card = new Card(Type.ZERO, Color.BLUE);
      const secondBlue: Card = new Card(Type.EIGHT, Color.BLUE);
      expect(Helpers.canPlayOn(firstBlue, secondBlue)).to.be.true;
    });

    it("Play same type on different color", () => {
      const firstZero = new Card(Type.ZERO, Color.BLUE);
      const secondZero = new Card(Type.ZERO, Color.RED);
      expect(Helpers.canPlayOn(firstZero, secondZero)).to.be.true;
    });
  });
});
