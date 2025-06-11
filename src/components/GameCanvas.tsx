import React from 'react';
import { GameState, GameObject, Meteor, Bullet } from '../types/game';
import StarField from './StarField';
import Player from './Player';
import MeteorComponent from './MeteorComponent';
import BulletComponent from './BulletComponent';

interface GameCanvasProps {
  gameState: GameState;
  player: GameObject;
  meteors: Meteor[];
  bullets: Bullet[];
  width: number;
  height: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  player,
  meteors,
  bullets,
  width,
  height
}) => {
  return (
    <div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative overflow-hidden border-2 border-purple-400 bg-gradient-to-b from-indigo-900 via-purple-900 to-black"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <StarField />
      
      {gameState === 'playing' && (
        <>
          <Player player={player} />
          
          {meteors.map((meteor, index) => (
            <MeteorComponent key={index} meteor={meteor} />
          ))}
          
          {bullets.map((bullet, index) => (
            <BulletComponent key={index} bullet={bullet} />
          ))}
        </>
      )}
    </div>
  );
};

export default GameCanvas;