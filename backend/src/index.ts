import Game from "./game";
import Player from "./player";

const players = [
  new Player(0),
  new Player(1)
]
const game = new Game(players)
game.start();