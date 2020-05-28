class Card {
  readonly type: Type
  readonly color: Color
  constructor(type: Type, color: Color) {
    this.type = type;
    this.color = color;
  }

  readonly [Symbol.toStringTag] = "Card";
}

enum Type {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  SKIP = 10,
  REVERSE = 11,
  DRAW_TWO = 12,
  WILD = 13,
  DRAW_FOUR = 14,
}

enum Color {
  RED,
  BLUE,
  YELLOW,
  GREEN,
  WILD
}

export { Card, Type, Color };
