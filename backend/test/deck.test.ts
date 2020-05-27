import { expect } from "chai";
import Deck from "../src/deck";

describe("Deck", () => {
  it("Class exists", () => {
    expect(Deck).is.not.undefined;
  });

  it("Can be instantiated", () => {
    expect(new Deck()).is.not.null;
  });

  it("Deck has size function", () => {
    const deck: Deck = new Deck();
    expect(deck.size).is.not.undefined;
  })

  it("Starts with 108 cards", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).is.not.null;
    expect(deck.size()).to.equal(108);
  });

  it("Deck has deal function", () => {
    const deck: Deck = new Deck();
    expect(deck.deal).is.not.undefined;
  })

  it("Deals a card", () => {
    const deck: Deck = new Deck();
    expect(deck.deal()).to.be.a("Card");
  });

  it("Size decreases when card dealt", () => {
    const deck: Deck = new Deck();
    deck.deal();
    expect(deck.size()).to.equal(107);
  });

  it("Error thrown when dealing from empty deck", () => {
    const deck: Deck = deckWith0Cards();
    expect(deck.size()).to.equal(0);
    expect(() => deck.deal()).to.throw();
  });
});

const deckWith0Cards = (): Deck => {
  const deck: Deck = new Deck();
  while (deck.size() !== 0) {
    deck.deal();
  }
  return deck;
};
