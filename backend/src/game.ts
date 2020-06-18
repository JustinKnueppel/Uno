import Player from "./player";
import { Deck, Discard } from "./cards";
import { getFullDeck } from "./helpers";
import { Card } from "./card";

class Game {
  private static CARDS_PER_PERSON = 7;
  private players: Array<Player>;
  private deck: Deck;
  private discard: Discard;
  constructor(players: Array<Player>) {
    this.players = players;

    this.deck = getFullDeck();
    this.deck.shuffle();
    
    this.discard = new Discard();

    this.dealInitialCards();
  }

  cardsRemaining(): number {
    return this.deck.size();
  }

  private dealInitialCards(): void {
    this.players.forEach(player => {
      const cards: Array<Card> = []
      for (let _ = 0; _ < Game.CARDS_PER_PERSON; _++) {
        cards.push(this.deck.dealCard())
      }
      player.giveCards(cards)
    })
  }
}

export default Game;
