import { expect } from "chai";
import Player from "../src/player";
import { Card, Type, Color } from "../src/card";

describe("Player", () => {
  it("Class exists", () => {
    expect(Player).is.not.undefined;
  });

  it("Can create object", () => {
    expect(basicPlayer()).is.not.null;
  });

  it("Player has name", () => {
    const player = basicPlayer();
    expect(player.name).is.not.undefined;
  });

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

  it("Get points exists", () => {
    const player = basicPlayer();
    expect(player.getPoints).is.not.undefined;
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

  it("Can see number of cards", () => {
    const player = basicPlayer();
    expect(player.cardsRemaining).is.not.undefined;
  });

  it("Player has 0 cards when created", () => {
    const player = basicPlayer();
    expect(player.cardsRemaining()).to.equal(0);
  });

  it("Give card exists", () => {
    const player = basicPlayer();
    expect(player.giveCards).is.not.undefined;
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

  it("Get cards exists", () => {
    const player = basicPlayer();
    expect(player.getCards).is.not.undefined;
  });

  it("Can retrieve player's cards", () => {
    const player = basicPlayer();
    expect(player.getCards()).to.deep.equal([]);
  });
});

const basicPlayer = () => {
  const id = 0;
  const player = new Player(id);
  return player;
};
