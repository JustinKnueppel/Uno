import { expect } from "chai";
import * as Helpers from "../src/helpers";
import { Card, CardType, CardColor } from "../src/card";
import Player from "../src/player";

describe("Helper functions", () => {
  describe("canPlayOn", () => {
    it("Play different number on same color", () => {
      const firstBlue: Card = new Card(CardType.ZERO, CardColor.BLUE);
      const secondBlue: Card = new Card(CardType.EIGHT, CardColor.BLUE);
      expect(Helpers.canPlayOn(firstBlue, secondBlue)).to.be.true;
    });

    it("Play same type on different color", () => {
      const firstZero = new Card(CardType.ZERO, CardColor.BLUE);
      const secondZero = new Card(CardType.ZERO, CardColor.RED);
      expect(Helpers.canPlayOn(firstZero, secondZero)).to.be.true;
    });

    it("Play wild on any color", () => {
      const wild = new Card(CardType.WILD, CardColor.WILD);
      const blue = new Card(CardType.ZERO, CardColor.BLUE);
      const red = new Card(CardType.ZERO, CardColor.RED);
      const yellow = new Card(CardType.ZERO, CardColor.YELLOW);
      const green = new Card(CardType.ZERO, CardColor.GREEN);
      expect(Helpers.canPlayOn(wild, blue)).to.be.true;
      expect(Helpers.canPlayOn(wild, red)).to.be.true;
      expect(Helpers.canPlayOn(wild, yellow)).to.be.true;
      expect(Helpers.canPlayOn(wild, green)).to.be.true;
    });

    it("Cannot play non-wild card of different number and color", () => {
      const firstCard = new Card(CardType.ZERO, CardColor.BLUE);
      const secondCard = new Card(CardType.ONE, CardColor.RED);
      expect(Helpers.canPlayOn(firstCard, secondCard)).to.be.false;
    });

    it("Can play draw four on any color", () => {
      const drawFour = new Card(CardType.DRAW_FOUR, CardColor.WILD);
      const blue = new Card(CardType.ZERO, CardColor.BLUE);
      const red = new Card(CardType.ZERO, CardColor.RED);
      const yellow = new Card(CardType.ZERO, CardColor.YELLOW);
      const green = new Card(CardType.ZERO, CardColor.GREEN);
      expect(Helpers.canPlayOn(drawFour, blue)).to.be.true;
      expect(Helpers.canPlayOn(drawFour, red)).to.be.true;
      expect(Helpers.canPlayOn(drawFour, yellow)).to.be.true;
      expect(Helpers.canPlayOn(drawFour, green)).to.be.true;
    });

    it("Can play number on correct colored wild", () => {
      const number = new Card(CardType.ZERO, CardColor.BLUE);
      const wild = new Card(CardType.WILD, CardColor.BLUE);
      expect(Helpers.canPlayOn(number, wild)).to.be.true;
    });
  });

  describe("parseCardString", () => {
    it("Creates red number card", () => {
      const cardString = "r2"
      const expectedCard = new Card(CardType.TWO, CardColor.RED)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates blue skip", () => {
      const cardString = "bs"
      const expectedCard = new Card(CardType.SKIP, CardColor.BLUE)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates green reverse", () => {
      const cardString = "gr"
      const expectedCard = new Card(CardType.REVERSE, CardColor.GREEN)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates yellow draw two", () => {
      const cardString = "yd"
      const expectedCard = new Card(CardType.DRAW_TWO, CardColor.YELLOW)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates wild", () => {
      const cardString = "w"
      const expectedCard = new Card(CardType.WILD, CardColor.WILD)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })

    it("Creates draw four", () => {
      const cardString = "W"
      const expectedCard = new Card(CardType.DRAW_FOUR, CardColor.WILD)
      expect(Helpers.parseCardString(cardString)).to.deep.equal(expectedCard);
    })
  })

  describe("score", () => {
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
    it("Returns a deck", () => {
      expect(Helpers.getFullDeck()).to.be.a("Deck")
    })

    it("Has 108 cards", () => {
      expect(Helpers.getFullDeck().size()).to.equal(108)
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
