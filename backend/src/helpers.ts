import { Card, Color, Type } from "./card";
import Player from "./player";
import Deck from "./deck";

const canPlayOn = (nextCard: Card, currentCard: Card): boolean => {
  if (nextCard.color === Color.WILD) {
    return true;
  }
  if (nextCard.color === currentCard.color) {
    return true;
  }
  if (nextCard.type === currentCard.type) {
    return true;
  }
  return false;
};

const score = (player: Player): number => {
  const cards = player.getCards();
  const points = cards.map((card) => getScoreOfCard(card));
  const total = points.reduce((total, current) => total + current);
  return total;
};

const getScoreOfCard = (card: Card): number => {
  switch (card.type) {
    case Type.SKIP:
    case Type.REVERSE:
    case Type.DRAW_TWO:
      return 20;
    case Type.WILD:
    case Type.DRAW_FOUR:
      return 50;
    default:
      return card.type;
  }
};

const getFullDeck = (): Deck => {
  const deck = new Deck();
  const cards = getAllCards();
  deck.addCards(cards);
  return deck;
};

const getAllCards = (): Array<Card> => {
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

const parseCardString = (cardString: string): Card => {
  if (!/([wW])|([bygr][\dsrd])/.test(cardString))
    throw new Error("Bad card string");
  if (cardString === "w") return new Card(Type.WILD, Color.WILD);
  if (cardString === "W") return new Card(Type.DRAW_FOUR, Color.WILD);

  const type = getTypeFromCardString(cardString);
  const color = getColorFromCardString(cardString);

  return new Card(type, color);
};

const getColorFromCardString = (cardString: string): Color => {
  switch (cardString[0]) {
    case "b":
      return Color.BLUE;
    case "y":
      return Color.YELLOW;
    case "g":
      return Color.GREEN;
    default:
      return Color.RED;
  }
};

const getTypeFromCardString = (cardString: string): Type => {
  switch (cardString[1]) {
    case "s":
      return Type.SKIP;
    case "r":
      return Type.REVERSE;
    case "d":
      return Type.DRAW_TWO;
    default:
      return getTypeFromNumber(parseInt(cardString[1]));
  }
};

const getTypeFromNumber = (number: number): Type => {
  if (number < 0 || number > 9) {
    throw new Error("Invalid number to get type");
  }
  switch (number) {
    case 0:
      return Type.ZERO;
    case 1:
      return Type.ONE;
    case 2:
      return Type.TWO;
    case 3:
      return Type.THREE;
    case 4:
      return Type.FOUR;
    case 5:
      return Type.FIVE;
    case 6:
      return Type.SIX;
    case 7:
      return Type.SEVEN;
    case 8:
      return Type.EIGHT;
    default:
      return Type.NINE;
  }
};

export { canPlayOn, score, parseCardString, getFullDeck };
