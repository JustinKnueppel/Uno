import { Card } from "./card";

const canPlayOn = (nextCard: Card, currentCard: Card): boolean => {
  if (nextCard.color === currentCard.color) {
    return true;
  }
  return false;
};

export { canPlayOn };
