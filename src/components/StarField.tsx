import React from 'react';

const StarField: React.FC = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    animationDelay: Math.random() * 6
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.animationDelay}s`,
            opacity: 0.4 + Math.random() * 0.4
          }}
        />
      ))}
      
      {/* Ultra slow moving stars */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`moving-${i}`}
          className="absolute bg-blue-100 rounded-full animate-star-move-slow opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-2px',
            width: '1px',
            height: '2px',
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${40 + Math.random() * 30}s`
          }}
        />
      ))}
      
      {/* Super slow background stars */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={`bg-${i}`}
          className="absolute bg-purple-100 rounded-full animate-star-move-very-slow opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-1px',
            width: '0.5px',
            height: '1px',
            animationDelay: `${Math.random() * 30}s`,
            animationDuration: `${60 + Math.random() * 40}s`
          }}
        />
      ))}
    </div>
  );
};

export default StarField;