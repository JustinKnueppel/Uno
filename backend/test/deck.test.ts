import { expect } from "chai";
import Deck from "../src/deck";
import { getFullDeck } from "../src/helpers"

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
  });

  it("Starts with 0 cards", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).is.not.null;
    expect(deck.size()).to.equal(0);
  });

  it("Deck has deal function", () => {
    const deck: Deck = new Deck();
    expect(deck.deal).is.not.undefined;
  });

  it("Deals a card", () => {
    const deck: Deck = getFullDeck();
    expect(deck.deal()).to.be.a("Card");
  });

  it("Size decreases when card dealt", () => {
    const deck: Deck = getFullDeck();
    deck.deal();
    expect(deck.size()).to.equal(107);
  });

  it("Error thrown when dealing from empty deck", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).to.equal(0);
    expect(() => deck.deal()).to.throw();
  });

  it("Has empty function", () => {
    const deck: Deck = new Deck();
    expect(deck.empty).is.not.undefined;
  });

  it("Empty function returns true when empty", () => {
    const deck: Deck = new Deck();
    expect(deck.empty()).to.be.true
  })

  it("Empty returns false when not empty", () => {
    const deck: Deck = getFullDeck();
    expect(deck.empty()).to.be.false
  })
});
