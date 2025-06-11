import { GameObject, Meteor, Bullet } from '../types/game';

export const createMeteor = (gameWidth: number): Meteor => {
  const types = [
    { type: 'small' as const, width: 20, height: 20, points: 10, speed: 2 },
    { type: 'medium' as const, width: 35, height: 35, points: 25, speed: 1.5 },
    { type: 'large' as const, width: 50, height: 50, points: 50, speed: 1 }
  ];
  
  const meteorType = types[Math.floor(Math.random() * types.length)];
  
  return {
    x: Math.random() * (gameWidth - meteorType.width),
    y: -meteorType.height,
    width: meteorType.width,
    height: meteorType.height,
    speed: meteorType.speed + Math.random() * 0.5,
    type: meteorType.type,
    points: meteorType.points,
    rotationSpeed: Math.random() * 4 + 1
  };
};

export const updateGameObjects = <T extends GameObject>(obj: T): T => {
  return {
    ...obj,
    y: obj.y + obj.speed
  };
};

export const isOutOfBounds = (obj: GameObject, gameHeight: number): boolean => {
  return obj.y > gameHeight + obj.height;
};

export const checkCollision = (obj1: GameObject, obj2: GameObject): boolean => {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
};

export const checkCollisions = (
  meteors: Meteor[],
  bullets: Bullet[],
  player: GameObject
) => {
  const meteorsHit: Meteor[] = [];
  const bulletsUsed: Bullet[] = [];
  let playerHit = false;

  // Check bullet-meteor collisions
  bullets.forEach(bullet => {
    meteors.forEach(meteor => {
      if (checkCollision(bullet, meteor)) {
        if (!meteorsHit.includes(meteor)) meteorsHit.push(meteor);
        if (!bulletsUsed.includes(bullet)) bulletsUsed.push(bullet);
      }
    });
  });

  // Check player-meteor collisions
  meteors.forEach(meteor => {
    if (checkCollision(player, meteor)) {
      playerHit = true;
    }
  });

  return { meteorsHit, bulletsUsed, playerHit };
};