import { expect } from "chai";
import * as Helpers from "../src/helpers";
import { Card, Type, Color } from "../src/card";
import Player from "../src/player";

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

  describe("score", () => {
    it("Score function exists", () => {
      expect(Helpers.score).is.not.undefined;
    });

    it("Score single player's hand", () => {
      const player = createPlayerWithCards(["b1", "b0", "gs", "W", "w"]);
      expect(Helpers.score(player)).to.equal(121);
    });
  });
});

const createPlayerWithCards = (cardStrings: Array<string>): Player => {
  const player = basicPlayer();
  const cards = cardStrings.map((cardString) => parseCardString(cardString));
  player.giveCards(cards);
  return player;
};

const basicPlayer = () => {
  const id = 0;
  const player = new Player(id);
  return player;
};

const parseCardString = (cardString: string): Card => {
  if (!/([wW])|([bygr][\dsrd])/.test(cardString)) throw new Error("Bad card string");
  if (cardString === "w") return new Card(Type.WILD, Color.WILD);
  if (cardString === "W") return new Card(Type.DRAW_FOUR, Color.WILD);

  const type = getTypeFromCardString(cardString);
  const color = getColorFromCardString(cardString);

  return new Card(type, color);
};

const getColorFromCardString = (cardString: string): Color => {
  switch (cardString[0]) {
    case "b":
      return Color.BLUE;
    case "y":
      return Color.YELLOW;
    case "g":
      return Color.GREEN;
    default:
      return Color.RED;
  }
};

const getTypeFromCardString = (cardString: string): Type => {
  switch (cardString[1]) {
    case "s":
      return Type.SKIP;
    case "r":
      return Type.REVERSE;
    case "d":
      return Type.DRAW_TWO;
    default:
      return getTypeFromNumber(parseInt(cardString[1]));
  }
};

const getTypeFromNumber = (number: number): Type => {
  if (number < 0 || number > 9) {
    throw new Error("Invalid number to get type");
  }
  switch (number) {
    case 0:
      return Type.ZERO;
    case 1:
      return Type.ONE;
    case 2:
      return Type.TWO;
    case 3:
      return Type.THREE;
    case 4:
      return Type.FOUR;
    case 5:
      return Type.FIVE;
    case 6:
      return Type.SIX;
    case 7:
      return Type.SEVEN;
    case 8:
      return Type.EIGHT;
    default:
      return Type.NINE;
  }
};
