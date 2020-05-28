import { Card, Color } from "./card";
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

export { canPlayOn, score };
