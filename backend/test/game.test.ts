import { expect } from "chai";
import Game from "../src/game";
import Player from "../src/player";

describe("Game", () => {
  it("Has 108 minus 7 cards per player cards when initialized", () => {
    const game = createGameWithNPlayers(1);
    expect(game.cardsRemaining()).to.equal(108 - 1*7)
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