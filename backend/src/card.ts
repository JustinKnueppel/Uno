class Card {
  readonly type: Type
  readonly color: Color
  constructor(type: Type, color: Color) {
    this.type = type;
    this.color = color;
  }

  toString(): string {
    return `${this.color.name} ${this.type.name}`
  }

  readonly [Symbol.toStringTag] = "Card";
}

type Type = {
  name: string,
  id: number
}
interface Types {
  ZERO: Type;
  ONE: Type;
  TWO: Type;
  THREE: Type;
  FOUR: Type;
  FIVE: Type;
  SIX: Type;
  SEVEN: Type;
  EIGHT: Type;
  NINE: Type;
  SKIP: Type;
  REVERSE: Type;
  DRAW_TWO: Type;
  WILD: Type;
  DRAW_FOUR: Type;
}

type Color = {
  name: string,
  id: number
}

interface Colors {
  RED: Color;
  BLUE: Color;
  YELLOW: Color;
  GREEN: Color;
  WILD: Color;
}


const CardType: Types = {
  ZERO: {
    id: 0,
    name: "ZERO",
  },
  ONE: {
    id: 1,
    name: "ONE",
  },
  TWO: {
    id: 2,
    name: "TWO",
  },
  THREE: {
    id: 3,
    name: "THREE",
  },
  FOUR: {
    id: 4,
    name: "FOUR",
  },
  FIVE: {
    id: 5,
    name: "FIVE",
  },
  SIX: {
    id: 6,
    name: "SIX",
  },
  SEVEN: {
    id: 7,
    name: "SEVEN",
  },
  EIGHT: {
    id: 8,
    name: "EIGHT",
  },
  NINE: {
    id: 9,
    name: "NINE",
  },
  SKIP: {
    id: 10,
    name: "SKIP",
  },
  REVERSE: {
    id: 11,
    name: "REVERSE",
  },
  DRAW_TWO: {
    id: 12,
    name: "DRAW TWO",
  },
  WILD: {
    id: 13,
    name: "WILD",
  },
  DRAW_FOUR: {
    id: 14,
    name: "DRAW FOUR",
  },
}

const CardColor: Colors = {
  RED: {
    id: 0,
    name: "RED",
  },
  BLUE: {
    id: 1,
    name: "BLUE",
  },
  YELLOW: {
    id: 2,
    name: "YELLOW",
  },
  GREEN: {
    id: 3,
    name: "GREEN",
  },
  WILD: {
    id: 4,
    name: "WILD",
  },
}

export { Card, Color, Type, CardType, CardColor };
