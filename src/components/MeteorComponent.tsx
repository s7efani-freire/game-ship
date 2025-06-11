import React from 'react';
import { Meteor } from '../types/game';

interface MeteorComponentProps {
  meteor: Meteor;
}

const MeteorComponent: React.FC<MeteorComponentProps> = ({ meteor }) => {
  const getMeteorStyle = () => {
    switch (meteor.type) {
      case 'small':
        return 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500';
      case 'medium':
        return 'bg-gradient-to-br from-orange-400 to-red-600 border-orange-500';
      case 'large':
        return 'bg-gradient-to-br from-purple-500 to-red-700 border-purple-400';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500';
    }
  };

  const getSizeClass = () => {
    switch (meteor.type) {
      case 'small':
        return 'w-6 h-6';
      case 'medium':
        return 'w-10 h-10';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${meteor.x}px`,
        top: `${meteor.y}px`,
        width: `${meteor.width}px`,
        height: `${meteor.height}px`
      }}
    >
      <div className={`${getSizeClass()} ${getMeteorStyle()} rounded-full border-2 animate-spin relative shadow-lg`}>
        {/* Crater spots */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full opacity-40" />
        <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-black rounded-full opacity-30" />
        {meteor.type !== 'small' && (
          <>
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full opacity-35" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-black rounded-full opacity-25" />
          </>
        )}
      </div>
    </div>
  );
};

export default MeteorComponent;