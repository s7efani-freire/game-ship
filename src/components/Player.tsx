import React from 'react';
import { GameObject } from '../types/game';

interface PlayerProps {
  player: GameObject;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div
      className="absolute transition-transform duration-75 ease-out"
      style={{
        left: `${player.x}px`,
        top: `${player.y}px`,
        width: `${player.width}px`,
        height: `${player.height}px`,
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {/* Spaceship body */}
      <div className="relative w-full h-full">
        {/* Main hull */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-t from-gray-300 to-gray-100 rounded-full border border-gray-400" />
        
        {/* Top dome */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-full border border-blue-500 opacity-80" />
        
        {/* Light beam */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-cyan-400 to-transparent opacity-70" />
        
        {/* Side lights */}
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default Player;