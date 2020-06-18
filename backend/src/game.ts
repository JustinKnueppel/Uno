import Player from "./player";
import { Deck } from "./cards";
import { getFullDeck } from "./helpers";
import { Card } from "./card";

class Game {
  private static CARDS_PER_PERSON = 7;
  private players: Array<Player>;
  private deck: Deck;
  private discard: Deck;
  constructor(players: Array<Player>) {
    this.players = players;
    this.deck = getFullDeck();
    this.discard = new Deck();

    this.deck.shuffle();
  }

  cardsRemaining(): number {
    return this.deck.size();
  }

  dealCards(): void {
    this.players.forEach(player => {
      player.giveCards(this.deal7())
    })
  }

  private deal7(): Array<Card> {
    if (this.cardsRemaining() < 7) {
      throw new Error("Not enough cards in deck")
    }
    const cards: Array<Card> = [];
    for (let _ = 0; _ < 7; _++) {
      cards.push(this.deck.dealCard());
    }
    return cards;
  }
}

export default Game;
