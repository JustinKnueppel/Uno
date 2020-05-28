import { Card, Color, Type } from "./card";
import Player from "./player";

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
  return card.type;
};

const parseCardString = (cardString: string): Card => {
  if (!/([wW])|([bygr][\dsrd])/.test(cardString)) throw new Error("Bad card string");
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


export { canPlayOn, score, parseCardString };
