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
      
      {/* Moving stars for depth effect - slower movement */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`moving-${i}`}
          className="absolute bg-blue-200 rounded-full animate-star-move-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-2px',
            width: '1px',
            height: '2px',
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 6}s`
          }}
        />
      ))}
      
      {/* Even slower background stars */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={`bg-${i}`}
          className="absolute bg-purple-200 rounded-full animate-star-move-very-slow opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-1px',
            width: '0.5px',
            height: '1px',
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

export default StarField;