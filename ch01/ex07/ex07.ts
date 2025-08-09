class Point {
  constructor(
    public x: number,
    public y: number,
  ) {
    this.x = x;
    this.y = y;
  }

  distance(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(p: Point): Point {
    this.x += p.x;
    this.y += p.y;
    return this;
  }
}

const myPoint = new Point(3, 4);
const newPoint = new Point(1, 2);
console.log(myPoint.add(newPoint));
