export interface Point {
  x: number;
  y: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: Point;
  emoji: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}
