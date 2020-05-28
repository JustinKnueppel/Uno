import { expect } from "chai";
import Game from "../src/game";
import Player from "../src/player";

describe("Game", () => {
  it("Class exists", () => {
    expect(Game).is.not.undefined;
  });

  it("Object created", () => {
    const game = createGameWithNPlayers(1)
    expect(game).is.not.null;
  })

  it("Has cardsRemaining method", () => {
    const game = createGameWithNPlayers(1)
    expect(game.cardsRemaining).is.not.undefined
  })

  it("Has 108 cards when initialized", () => {
    const game = createGameWithNPlayers(1);
    expect(game.cardsRemaining()).to.equal(108)
  })

  it("Has dealCards method", () => {
    const game = createGameWithNPlayers(1)
    expect(game.dealCards).is.not.undefined
  })

  it("Deals 7 cards to one player", () => {
    const game = createGameWithNPlayers(1);
    game.dealCards()
    expect(game.cardsRemaining()).to.equal(108-7)
  })

  it("Deals 7 cards per player", () => {
    const game = createGameWithNPlayers(3)
    game.dealCards();
    expect(game.cardsRemaining()).to.equal(108-3*7)
  })
});

const createGameWithNPlayers = (numberOfPlayers: number): Game => {
  const ids = [...Array(numberOfPlayers).keys()];
  const players = createPlayersFromIds(ids);
  return new Game(players);
}

const createPlayersFromIds = (ids: Array<number>): Array<Player> => {
  const players = ids.map(id => new Player(id));
  return players;
}