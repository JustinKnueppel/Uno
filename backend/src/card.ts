class Card {
  constructor() {
  }
}

enum Type {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  SKIP,
  REVERSE,
  DRAW_TWO,
  WILD,
  DRAW_FOUR,
}

enum Color {
  RED,
  BLUE,
  YELLOW,
  GREEN,
  WILD
}

export { Card, Type, Color };
