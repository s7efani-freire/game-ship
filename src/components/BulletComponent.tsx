import React from 'react';
import { Bullet } from '../types/game';

interface BulletComponentProps {
  bullet: Bullet;
}

const BulletComponent: React.FC<BulletComponentProps> = ({ bullet }) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${bullet.x}px`,
        top: `${bullet.y}px`,
        width: `${bullet.width}px`,
        height: `${bullet.height}px`
      }}
    >
      <div className="w-full h-full bg-gradient-to-t from-cyan-400 to-white rounded-full shadow-lg relative">
        {/* Energy trail effect */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-cyan-300 to-transparent opacity-60" />
      </div>
    </div>
  );
};

export default BulletComponent;