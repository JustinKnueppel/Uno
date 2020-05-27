import { Card, Type, Color } from "./card";

class Deck {
  private cards: Array<Card>;
  constructor() {
    this.cards = getFullDeck();
  }

  size(): number {
    return this.cards.length;
  }
}

const getFullDeck = () => {
  const cards = [];
  const colors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN];
  const twoOfEachColor = [
    Type.ONE,
    Type.TWO,
    Type.THREE,
    Type.FOUR,
    Type.FIVE,
    Type.SIX,
    Type.SEVEN,
    Type.EIGHT,
    Type.NINE,
    Type.SKIP,
    Type.REVERSE,
    Type.DRAW_TWO,
  ];
  colors.forEach((color) => {
    twoOfEachColor.forEach((type) => {
      const card = new Card(type, color);
      cards.push(...getNCopiesOfCard(card, 2));
    });
    cards.push(new Card(Type.ZERO, color));
  });

  cards.push(...getNCopiesOfCard(new Card(Type.WILD, Color.WILD), 4));
  cards.push(...getNCopiesOfCard(new Card(Type.DRAW_FOUR, Color.WILD), 4));

  return cards;
};

const getNCopiesOfCard = (card: Card, copies: number): Array<Card> => {
  const cards = [];
  for (let _ = 0; _ < copies; _++) {
    cards.push(new Card(card.type, card.color));
  }
  return cards;
};

export default Deck;
