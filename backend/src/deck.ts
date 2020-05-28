import { Card } from "./card";
import { getFullDeck } from "./helpers"

class Deck {
  private cards: Array<Card>;
  constructor() {
    this.cards = [];
  }

  readonly [Symbol.toStringTag] = "Deck";

  addCards(cards: Array<Card>): void {
    this.cards.push(...cards);
  }

  deal(): Card {
    if (this.size() === 0) {
      throw new Error("Deck is empty");
    }
    return this.cards.pop()!;
  }

  size(): number {
    return this.cards.length;
  }

  empty(): boolean {
    return this.size() === 0;
  }

  shuffle(): void {
    for(let currentIndex = this.cards.length - 1; currentIndex > 0; currentIndex--){
      const randomIndex = Math.floor(Math.random() * currentIndex)
      const temp = this.cards[currentIndex]
      this.cards[currentIndex] = this.cards[randomIndex]
      this.cards[randomIndex] = temp
    }
  }
}

export default Deck;
