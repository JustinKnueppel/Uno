import { Card, Color, Type, CardColor, CardType } from "./card";
import Player from "./player";
import { Deck } from "./cards";

const canPlayOn = (nextCard: Card, currentCard: Card): boolean => {
  if (nextCard.color === CardColor.WILD) {
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
    case CardType.SKIP:
    case CardType.REVERSE:
    case CardType.DRAW_TWO:
      return 20;
    case CardType.WILD:
    case CardType.DRAW_FOUR:
      return 50;
    default:
      return card.type.id;
  }
};

const getFullDeck = (): Deck => {
  const deck = new Deck();
  const cards = getAllCards();
  deck.addCards(cards);
  return deck;
};

const sortedCards = (cards: Array<Card>): Array<Card> => {
  const sorted = [...cards]
  return sorted.sort(compareCards)
}

const compareCards = (card1: Card, card2: Card): number => {
  if (card1.color === card2.color) {
    return compareTypes(card1, card2);
  }
  return compareColors(card1, card2);
};

const compareTypes = (card1: Card, card2: Card): number => {
  return card1.type.id - card2.type.id;
};

const compareColors = (card1: Card, card2: Card): number => {
  return card1.color.id - card2.color.id;
};

const getAllCards = (): Array<Card> => {
  const cards = [];
  const colors = [CardColor.RED, CardColor.YELLOW, CardColor.BLUE, CardColor.GREEN];
  const twoOfEachColor = [
    CardType.ONE,
    CardType.TWO,
    CardType.THREE,
    CardType.FOUR,
    CardType.FIVE,
    CardType.SIX,
    CardType.SEVEN,
    CardType.EIGHT,
    CardType.NINE,
    CardType.SKIP,
    CardType.REVERSE,
    CardType.DRAW_TWO,
  ];
  colors.forEach((color) => {
    twoOfEachColor.forEach((type) => {
      const card = new Card(type, color);
      cards.push(...getNCopiesOfCard(card, 2));
    });
    cards.push(new Card(CardType.ZERO, color));
  });

  cards.push(...getNCopiesOfCard(new Card(CardType.WILD, CardColor.WILD), 4));
  cards.push(...getNCopiesOfCard(new Card(CardType.DRAW_FOUR, CardColor.WILD), 4));

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
  if (cardString === "w") return new Card(CardType.WILD, CardColor.WILD);
  if (cardString === "W") return new Card(CardType.DRAW_FOUR, CardColor.WILD);

  const type = getTypeFromCardString(cardString);
  const color = getColorFromCardString(cardString);

  return new Card(type, color);
};

const getColorFromCardString = (cardString: string): Color => {
  switch (cardString[0]) {
    case "b":
      return CardColor.BLUE;
    case "y":
      return CardColor.YELLOW;
    case "g":
      return CardColor.GREEN;
    default:
      return CardColor.RED;
  }
};

const getTypeFromCardString = (cardString: string): Type => {
  switch (cardString[1]) {
    case "s":
      return CardType.SKIP;
    case "r":
      return CardType.REVERSE;
    case "d":
      return CardType.DRAW_TWO;
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
      return CardType.ZERO;
    case 1:
      return CardType.ONE;
    case 2:
      return CardType.TWO;
    case 3:
      return CardType.THREE;
    case 4:
      return CardType.FOUR;
    case 5:
      return CardType.FIVE;
    case 6:
      return CardType.SIX;
    case 7:
      return CardType.SEVEN;
    case 8:
      return CardType.EIGHT;
    default:
      return CardType.NINE;
  }
};

export { canPlayOn, score, parseCardString, getFullDeck, sortedCards };
