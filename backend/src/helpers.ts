import { Card, Color } from "./card";

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

export { canPlayOn };
