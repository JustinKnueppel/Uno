class Card {
  readonly type: Type
  readonly color: Color
  constructor(type: Type, color: Color) {
    this.type = type;
    this.color = color;
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
