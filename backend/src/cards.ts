import { Card } from "./card";
import { sortedCards } from "./helpers";

class Deck {
  private cards: Array<Card>;
  constructor() {
    this.cards = [];
  }

  readonly [Symbol.toStringTag] = "Deck";

  addCards(cards: Array<Card>): void {
    this.cards.push(...cards);
  }

  dealCard(): Card {
    if (this.size() === 0) {
      throw new Error("Deck is empty.");
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
    for (
      let currentIndex = this.cards.length - 1;
      currentIndex > 0;
      currentIndex--
    ) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      const temp = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }
}

class Hand {
  private _cards: Array<Card>;

  constructor() {
    this._cards = [];
  }

  add(card: Card): void {
    this._cards.push(card);
  }

  cards(): Array<Card> {
    return [...this._cards];
  }

  cardsRemaining(): number {
    return this._cards.length;
  }

  sorted(): Array<Card> {
    return sortedCards(this._cards);
  }
}

class Discard {
  private _cards: Array<Card>;

  constructor() {
    this._cards = [];
  }

  add(card: Card): void {
    this._cards.push(card);
  }

  top(): Card {
    if (this._cards.length === 0) throw new Error("Empty discard has no top.");
    return this._cards[this._cards.length - 1];
  }

  removeBottomCards(): Array<Card> {
    if (this._cards.length === 0) throw new Error("Empty discard has no bottom.");
    return this._cards.splice(0, this._cards.length - 1);
  }
}

export { Deck, Hand, Discard };
