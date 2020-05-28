import { Card } from "./card"

class Player {
  readonly id: number;
  private points: number;
  private cards: Array<Card>;
  name: string;
  constructor(id: number, name?: string) {
    this.id = id;
    this.points = 0;
    this.cards = [];
    this.name = name || this.id.toString();
  }

  getPoints(): number {
    return this.points;
  }

  addPoints(points: number): void {
    this.points += points;
  }

  cardsRemaining(): number {
    return this.cards.length;
  }

  getCards(): Array<Card> {
    return [...this.cards];
  }

  giveCard(card: Card): void {
    this.cards.push(card);
  }
}

export default Player;
