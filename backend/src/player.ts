import { Card } from "./card";

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

  giveCards(cards: Array<Card>): void {
    this.cards.push(...cards);
  }

  sortHand(): void {
    this.cards.sort(compareCards);
  }
}

const compareCards = (card1: Card, card2: Card): number => {
  if (card1.color === card2.color) {
    return compareTypes(card1, card2);
  }
  return compareColors(card1, card2);
};

const compareTypes = (card1: Card, card2: Card): number => {
  return card1.type - card2.type;
};

const compareColors = (card1: Card, card2: Card): number => {
  return card1.color - card2.color;
};

export default Player;
