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

  describe("parseCardString", () => {
    it("Creates red number card", () => {
      const cardString = "r2"
      const expectedCard = new Card(Type.TWO, Color.RED)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates blue skip", () => {
      const cardString = "bs"
      const expectedCard = new Card(Type.SKIP, Color.BLUE)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates green reverse", () => {
      const cardString = "gr"
      const expectedCard = new Card(Type.REVERSE, Color.GREEN)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates yellow draw two", () => {
      const cardString = "yd"
      const expectedCard = new Card(Type.DRAW_TWO, Color.YELLOW)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates wild", () => {
      const cardString = "w"
      const expectedCard = new Card(Type.WILD, Color.WILD)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates draw four", () => {
      const cardString = "W"
      const expectedCard = new Card(Type.DRAW_FOUR, Color.WILD)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })
  })

  describe("score", () => {
    it("Score function exists", () => {
      expect(Helpers.score).is.not.undefined;
    });

    it("Score number cards", () => {
      const player = createPlayerWithCards(["b0", "g1", "r2", "y3", "b4", "g5", "r6", "y7", "b8", "g9"])
      expect(Helpers.score(player)).to.equal(45)
    })

    it("Score special cards", () => {
      const player = createPlayerWithCards(["bs", "gr", "yd", "w", "W"])
      expect(Helpers.score(player)).to.equal(160)
    })

    it("Score single player's hand", () => {
      const player = createPlayerWithCards(["b1", "b0", "gs", "W", "w"]);
      expect(Helpers.score(player)).to.equal(121);
    });
  });

  describe('getFullDeck', () => {
    it("exists", () => {
      expect(Helpers.getFullDeck).is.not.undefined
    })

    it("Returns a deck", () => {
      expect(Helpers.getFullDeck()).to.be.a("Deck")
    })
  })
  
});

const createPlayerWithCards = (cardStrings: Array<string>): Player => {
  const player = basicPlayer();
  const cards = cardStrings.map((cardString) => Helpers.parseCardString(cardString));
  player.giveCards(cards);
  return player;
};

const basicPlayer = () => {
  const id = 0;
  const player = new Player(id);
  return player;
};
