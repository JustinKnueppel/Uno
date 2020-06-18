import { Card } from "./card";
import { Hand } from "./cards";

class Player {
  readonly id: number;
  private points: number;
  private hand: Hand;
  name: string;
  constructor(id: number, name?: string) {
    this.id = id;
    this.points = 0;
    this.hand = new Hand();
    this.name = name || this.id.toString();
  }

  getPoints(): number {
    return this.points;
  }

  addPoints(points: number): void {
    this.points += points;
  }

  cardsRemaining(): number {
    return this.hand.cardsRemaining();
  }

  getCards(): Array<Card> {
    return this.hand.cards();
  }

  giveCards(cards: Array<Card>): void {
    cards.forEach((card) => {
      this.hand.add(card);
    });
  }

  sortedHand(): Array<Card> {
    return this.hand.sorted();
  }
}

export default Player;
