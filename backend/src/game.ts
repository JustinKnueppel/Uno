import Player from "./player";
import { Deck, Discard } from "./cards";
import { getFullDeck, canPlayOn } from "./helpers";
import { Card, CardColor } from "./card";

class Game {
  private static CARDS_PER_PERSON = 7;
  private players: Array<Player>;
  private deck: Deck;
  private discard: Discard;
  private currentPlayer: number;

  constructor(players: Array<Player>) {
    this.players = players;

    this.deck = getFullDeck();
    this.deck.shuffle();
    
    this.discard = new Discard();
    this.currentPlayer = 0;

    this.dealInitialCards();
    this.flipTopCard();
  }

  cardsRemaining(): number {
    return this.deck.size();
  }

  gameOver(): boolean {
    return this.players.some(player => player.cardsRemaining() === 0);
  }

  start(): Player {
    while (!this.gameOver()) {
      this.takeTurn();
    }
    return this.winner();
  }

  takeTurn(): void {
    const currentPlayer = this.players[this.currentPlayer]
    console.log(`${currentPlayer.name}'s turn`)
    console.log("Top card", this.discard.top())
    console.log(`Cards: ${currentPlayer.getCards()}`)
    let playedCard = null;
    if (currentPlayer.getCards().some(card => canPlayOn(card, this.discard.top()))) {
      console.log("Can play")
      const playableCard = currentPlayer.getCards().find(card => canPlayOn(card, this.discard.top()))!
      console.log("Playing", playableCard)
      currentPlayer.playCard(playableCard)
      playedCard = playableCard;
      this.discard.add(playableCard)
    } else {
      console.log("Cannot play, drawing card")
      const drawnCard = this.deck.dealCard()
      currentPlayer.giveCards([drawnCard])
      if (canPlayOn(drawnCard, this.discard.top())) {
        console.log("Can play card")
        console.log("PLaying", drawnCard)
        currentPlayer.playCard(drawnCard)
        playedCard = drawnCard;
      }
    }

    if (playedCard && playedCard.color === CardColor.WILD) {
      // TODO: How to artificially change color of wild without messing up discard
    }
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  }

  winner(): Player {
    if (!this.gameOver()) throw new Error("No one has won yet.")
    return this.players.find(player => player.cardsRemaining() === 0)!;
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

  private flipTopCard(): void {
    this.discard.add(this.deck.dealCard())
  }
}

export default Game;
