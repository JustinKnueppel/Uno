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

  it("Get points exists", () => {
    const player = basicPlayer();
    expect(player.getPoints).is.not.undefined
  })

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
    expect(player.giveCard).is.not.undefined;
  });

  it("Player can receive card", () => {
    const player = basicPlayer();
    const card: Card = new Card(Type.ONE, Color.BLUE);
    player.giveCard(card);
    expect(player.getCards()).to.deep.equal([card]);
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
