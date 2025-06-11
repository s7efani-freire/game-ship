export type GameState = 'menu' | 'playing' | 'gameOver';

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export interface Meteor extends GameObject {
  type: 'small' | 'medium' | 'large';
  points: number;
  rotationSpeed: number;
}

export interface Bullet extends GameObject {
  // Additional bullet properties can be added here if needed
}