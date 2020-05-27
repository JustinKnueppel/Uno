class Player {
  readonly id: number;
  private points: number;
  constructor(id: number) {
    this.id = id;
    this.points = 0;
  }

  getPoints(): number {
    return this.points;
  }

  addPoints(points: number): void {
    this.points += points;
  }
}

export default Player;
