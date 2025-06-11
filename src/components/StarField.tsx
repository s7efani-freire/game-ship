import React from 'react';

const StarField: React.FC = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    animationDelay: Math.random() * 4
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
            opacity: 0.6 + Math.random() * 0.4
          }}
        />
      ))}
      
      {/* Moving stars for depth effect */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`moving-${i}`}
          className="absolute bg-blue-200 rounded-full animate-star-move"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-2px',
            width: '2px',
            height: '2px',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default StarField;