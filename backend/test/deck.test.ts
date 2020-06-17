import { expect } from "chai";
import Deck from "../src/deck";
import { Card, Type, Color } from "../src/card";

describe("Deck", () => {
  it("Can be instantiated", () => {
    expect(new Deck()).is.not.null;
  });

  it("Starts with 0 cards", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).is.not.null;
    expect(deck.size()).to.equal(0);
  });

  it("Deals a card", () => {
    const deck: Deck = deckWithOneCard();
    expect(deck.dealCard()).to.be.a("Card");
  });

  it("Size decreases when card dealt", () => {
    const deck: Deck = deckWithOneCard();
    deck.dealCard();
    expect(deck.size()).to.equal(0);
  });

  it("Size increases when card is added", () => {
    const deck: Deck = new Deck();
    deck.addCards([getSingleCard()]);
    expect(deck.size()).to.equal(1);
  });

  it("Error thrown when dealing from empty deck", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).to.equal(0);
    expect(() => deck.dealCard()).to.throw();
  });

  it("Empty returns true when empty", () => {
    const deck: Deck = new Deck();
    expect(deck.empty()).to.be.true
  })

  it("Empty returns false when not empty", () => {
    const deck: Deck = deckWithOneCard();
    expect(deck.empty()).to.be.false
  })
});

const deckWithOneCard = (): Deck => {
  const deck = new Deck();
  deck.addCards([getSingleCard()])
  return deck;
}

const getSingleCard = (): Card => {
  return new Card(Type.ONE, Color.BLUE)
}