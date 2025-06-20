import React from 'react';
import { GameState } from '../types/game';
import { Trophy, Play, RotateCcw } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
  score: number;
  highScore: number;
  onStartGame: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  score,
  highScore,
  onStartGame
}) => {
  return (
    <>
      {/* Score Display */}
      {gameState === 'playing' && (
        <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
          <div className="pixel-font text-2xl text-yellow-400 font-bold drop-shadow-lg">
            Score: {score}
          </div>
          <div className="flex items-center gap-2 pixel-font text-lg text-purple-300">
            <Trophy size={20} />
            {highScore}
          </div>
        </div>
      )}

      {/* Menu Screen */}
      {gameState === 'menu' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="text-center space-y-8 px-4">
            <h1 className="pixel-font text-6xl text-yellow-400 font-bold drop-shadow-2xl animate-pulse">
              METEOR BLASTER
            </h1>
            <div className="space-y-4">
              <p className="pixel-font text-xl text-purple-300">
                Use ← → arrows to move
              </p>
              <p className="pixel-font text-xl text-purple-300">
                Press SPACE to shoot
              </p>
              <p className="pixel-font text-lg text-blue-300">
                Avoid meteors • Destroy for points
              </p>
            </div>
            {highScore > 0 && (
              <div className="flex items-center justify-center gap-2 pixel-font text-2xl text-yellow-400">
                <Trophy size={24} />
                High Score: {highScore}
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={onStartGame}
                className="flex items-center gap-3 pixel-font text-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
              >
                <Play size={24} fill="currentColor" />
                START GAME
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-70">
          <div className="text-center space-y-6 bg-gradient-to-b from-purple-900 to-indigo-900 p-8 rounded-2xl border-2 border-purple-400 shadow-2xl mx-4">
            <h2 className="pixel-font text-5xl text-red-400 font-bold animate-pulse">
              GAME OVER
            </h2>
            <div className="space-y-3">
              <p className="pixel-font text-3xl text-yellow-400">
                Final Score: {score}
              </p>
              {score === highScore && score > 0 && (
                <p className="pixel-font text-xl text-green-400 animate-bounce">
                  🏆 NEW HIGH SCORE! 🏆
                </p>
              )}
              <div className="flex items-center justify-center gap-2 pixel-font text-xl text-purple-300">
                <Trophy size={20} />
                Best: {highScore}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onStartGame}
                className="flex items-center gap-3 pixel-font text-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-bold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/50"
              >
                <RotateCcw size={20} />
                PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameUI;