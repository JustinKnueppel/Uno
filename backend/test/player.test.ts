import { expect } from "chai";
import Player from "../src/player";
import { Card, Type, Color } from "../src/card";
import { parseCardString } from "../src/helpers";

describe("Player", () => {
  it("Name defaults to id", () => {
    const player = basicPlayer();
    expect(player.name).to.equal(player.id.toString());
  });

  it("Name can be set", () => {
    const player = basicPlayer();
    const name = "John";
    player.name = name;
    expect(player.name).to.equal(name);
  });

  it("Name can be set in constructor", () => {
    const id = 0;
    const name = "John";
    const player = new Player(id, name);
    expect(player.name).to.equal(name);
  });

  it("Has 0 points when created", () => {
    const player = basicPlayer();
    expect(player.getPoints()).to.equal(0);
  });

  it("Can add points to current score", () => {
    const player = basicPlayer();
    player.addPoints(10);
    expect(player.getPoints()).to.equal(10);
  });

  it("Player has 0 cards when created", () => {
    const player = basicPlayer();
    expect(player.cardsRemaining()).to.equal(0);
  });

  it("Player can receive a single card", () => {
    const player = basicPlayer();
    const card: Card = new Card(Type.ONE, Color.BLUE);
    player.giveCards([card]);
    expect(player.getCards()).to.deep.equal([card]);
  });

  it("Player can recieve multiple cards", () => {
    const player = basicPlayer();
    const cards = [
      new Card(Type.ONE, Color.BLUE),
      new Card(Type.THREE, Color.GREEN),
      new Card(Type.DRAW_FOUR, Color.WILD),
    ];
    player.giveCards(cards);
    expect(player.getCards()).to.deep.equal(cards);
  });

  it("Can retrieve player's cards", () => {
    const player = basicPlayer();
    expect(player.getCards()).to.deep.equal([]);
  });

  it("Sort empty hand", () => {
    const person = basicPlayer();
    expect(person.sortedHand()).to.deep.equal([]);
  });

  it("Sort hand with one card", () => {
    const cardStrings = ["b1"];
    const person = playerWithCards(cardStrings);
    const expectedHand = getCardsFromCardStrings(cardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  });

  it("Sort hand with two cards out of order", () => {
    const cardStrings = ["b1", "b0"];
    const person = playerWithCards(cardStrings);
    const sortedCardStrings = ["b0", "b1"]
    const expectedHand = getCardsFromCardStrings(sortedCardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  })

  it("Sort hand with three cards out of order", () => {
    const cardStrings = ["b3", "b0", "b1"];
    const person = playerWithCards(cardStrings);
    const sortedCardStrings = ["b0", "b1", "b3"]
    const expectedHand = getCardsFromCardStrings(sortedCardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  })

  it("Sort hand with number and wild", () => {
    const cardStrings = ["w", "b5"];
    const person = playerWithCards(cardStrings);
    const sortedCardStrings = ["b5", "w"]
    const expectedHand = getCardsFromCardStrings(sortedCardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  })

  it("Sort hand based on color", () => {
    const cardStrings = ["g5", "b5", "r5", "y5", "W"];
    const person = playerWithCards(cardStrings);
    const sortedCardStrings = ["r5", "b5", "y5", "g5", "W"]
    const expectedHand = getCardsFromCardStrings(sortedCardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  })

  it("Sort special cards", () => {
    const cardStrings = ["w", "bs", "bd", "br", "W"];
    const person = playerWithCards(cardStrings);
    const sortedCardStrings = ["bs", "br", "bd", "w", "W"]
    const expectedHand = getCardsFromCardStrings(sortedCardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  })

  it("Sort hand on color and number", () => {
    const cardStrings = ["g5", "b4", "g3", "r5", "w", "ys", "y5", "W"];
    const person = playerWithCards(cardStrings);
    const sortedCardStrings = ["r5", "b4", "y5", "ys", "g3", "g5", "w", "W"]
    const expectedHand = getCardsFromCardStrings(sortedCardStrings);
    expect(person.sortedHand()).to.deep.equal(expectedHand);
  })
});

const basicPlayer = () => {
  const id = 0;
  const player = new Player(id);
  return player;
};

const playerWithCards = (cardStrings: Array<string>): Player => {
  const player = basicPlayer();
  const cards = getCardsFromCardStrings(cardStrings);
  player.giveCards(cards);

  return player;
};

const getCardsFromCardStrings = (cardStrings: Array<string>): Array<Card> => {
  const cards: Array<Card> = cardStrings.map((cardString) =>
    parseCardString(cardString)
  );
  return cards;
};
