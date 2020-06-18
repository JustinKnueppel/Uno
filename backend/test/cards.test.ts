import { expect } from "chai";
import { Deck, Hand, Discard } from "../src/cards";
import { Card, Type, Color } from "../src/card";

describe("Deck", () => {
  it("Can be instantiated", () => {
    expect(new Deck()).is.not.null;
  });

  it("Starts with 0 cards", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).to.equal(0);
  });

  it("Deals a card", () => {
    const deck: Deck = deckWithOneCard();
    expect(deck.dealCard()).to.be.a("Card");
  });

  it("Size decreases when card dealt", () => {
    const deck: Deck = deckWithOneCard();
    deck.dealCard();
    expect(deck.size()).to.equal(0);
  });

  it("Size increases when card is added", () => {
    const deck: Deck = new Deck();
    deck.addCards([getSingleCard()]);
    expect(deck.size()).to.equal(1);
  });

  it("Error thrown when dealing from empty deck", () => {
    const deck: Deck = new Deck();
    expect(deck.size()).to.equal(0);
    expect(() => deck.dealCard()).to.throw();
  });

  it("Empty returns true when empty", () => {
    const deck: Deck = new Deck();
    expect(deck.empty()).to.be.true;
  });

  it("Empty returns false when not empty", () => {
    const deck: Deck = deckWithOneCard();
    expect(deck.empty()).to.be.false;
  });
});

const deckWithOneCard = (): Deck => {
  const deck = new Deck();
  deck.addCards([getSingleCard()]);
  return deck;
};

const getSingleCard = (): Card => {
  return new Card(Type.ONE, Color.BLUE);
};

describe("Hand", () => {
  it("Cards remaining returns 0 for empty hand", () => {
    const hand = new Hand();
    expect(hand.cardsRemaining()).to.equal(0);
  });

  it("Cards remaining increases when card added", () => {
    const hand = new Hand();
    const card = getSingleCard();
    hand.add(card);
    expect(hand.cardsRemaining()).to.equal(1);
  });

  it("Cards returns empty when hand is empty", () => {
    const hand = new Hand();
    expect(hand.cards()).to.deep.equal([]);
  });

  it("Cards returns cards given to it", () => {
    const hand = new Hand();
    const card = getSingleCard();
    hand.add(card);
    expect(hand.cards()).to.deep.equal([card]);
  });

  it("Sorted hand does not affect hand", () => {
    const hand = new Hand();
    const blue0 = new Card(Type.ZERO, Color.BLUE);
    const blue1 = new Card(Type.ONE, Color.BLUE);
    const blue2 = new Card(Type.TWO, Color.BLUE);
    hand.add(blue1);
    hand.add(blue2);
    hand.add(blue0);
    expect(hand.sorted()).to.deep.equal([blue0, blue1, blue2]);
    expect(hand.cards()).to.deep.equal([blue1, blue2, blue0]);
  });
});

describe("Discard", () => {
  describe("Top", () => {
    it("Throws error on empty discard", () => {
      const discard = new Discard();
      expect(() => discard.top()).to.throw()
    })
  
    it("Gives only card when discard has one card", () => {
      const discard = new Discard();
      const card = getSingleCard();
      discard.add(card)
      expect(discard.top()).to.equal(card);
    })
  
    it("Gives most recent card", () => {
      const discard = new Discard();
      const card1 = new Card(Type.ZERO, Color.GREEN)
      const card2 = new Card(Type.TWO, Color.GREEN)
      const card3 = new Card(Type.THREE, Color.GREEN)
      discard.add(card1)
      discard.add(card2)
      discard.add(card3)
      expect(discard.top()).to.equal(card3)
    })
  })

  describe("Remove bottom cards", () => {
    it("Throws error when size is 0", () => {
      const discard = new Discard();
      expect(() => discard.removeBottomCards()).to.throw()
    })
  
    it("Returns empty when size is 1", () => {
      const discard = new Discard();
      discard.add(getSingleCard())
      expect(discard.removeBottomCards()).to.deep.equal([])
    })
    
    it("Returns n - 1 cards", () => {
      const discard = new Discard();
      const card1 = new Card(Type.ZERO, Color.GREEN)
      const card2 = new Card(Type.TWO, Color.GREEN)
      const card3 = new Card(Type.THREE, Color.GREEN)
      discard.add(card1)
      discard.add(card2)
      discard.add(card3)
      expect(discard.removeBottomCards().length).to.equal(2)
    })

    it("Returns first n - 1 added", () => {
      const discard = new Discard();
      const card1 = new Card(Type.ZERO, Color.GREEN)
      const card2 = new Card(Type.TWO, Color.GREEN)
      const card3 = new Card(Type.THREE, Color.GREEN)
      discard.add(card1)
      discard.add(card2)
      discard.add(card3)
      expect(discard.removeBottomCards()).to.deep.equal([card1, card2])
    })
  })
})

