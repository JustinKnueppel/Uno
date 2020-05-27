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

    it("Play wild on any color", () => {
      const wild = new Card(Type.WILD, Color.WILD);
      const blue = new Card(Type.ZERO, Color.BLUE);
      const red = new Card(Type.ZERO, Color.RED);
      const yellow = new Card(Type.ZERO, Color.YELLOW);
      const green = new Card(Type.ZERO, Color.GREEN);
      expect(Helpers.canPlayOn(wild, blue)).to.be.true;
      expect(Helpers.canPlayOn(wild, red)).to.be.true;
      expect(Helpers.canPlayOn(wild, yellow)).to.be.true;
      expect(Helpers.canPlayOn(wild, green)).to.be.true;
    });

    it("Cannot play non-wild card of different number and color", () => {
      const firstCard = new Card(Type.ZERO, Color.BLUE);
      const secondCard = new Card(Type.ONE, Color.RED);
      expect(Helpers.canPlayOn(firstCard, secondCard)).to.be.false;
    });

    it("Can play draw four on any color", () => {
      const drawFour = new Card(Type.DRAW_FOUR, Color.WILD);
      const blue = new Card(Type.ZERO, Color.BLUE);
      const red = new Card(Type.ZERO, Color.RED);
      const yellow = new Card(Type.ZERO, Color.YELLOW);
      const green = new Card(Type.ZERO, Color.GREEN);
      expect(Helpers.canPlayOn(drawFour, blue)).to.be.true;
      expect(Helpers.canPlayOn(drawFour, red)).to.be.true;
      expect(Helpers.canPlayOn(drawFour, yellow)).to.be.true;
      expect(Helpers.canPlayOn(drawFour, green)).to.be.true;
    });

    it("Can play number on correct colored wild", () => {
      const number = new Card(Type.ZERO, Color.BLUE);
      const wild = new Card(Type.WILD, Color.BLUE);
      expect(Helpers.canPlayOn(number, wild)).to.be.true;
    });
  });
});
