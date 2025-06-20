import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameCanvas from './GameCanvas';
import GameUI from './GameUI';
import { GameState, GameObject, Meteor, Bullet } from '../types/game';
import { createMeteor, updateGameObjects, checkCollisions, isOutOfBounds } from '../utils/gameLogic';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const METEOR_SPAWN_RATE = 0.02;
const PLAYER_SPEED = 7;
const BULLET_SPEED = 8;

const SpaceGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('spaceGameHighScore');
      return saved ? parseInt(saved) : 0;
    } catch {
      return 0;
    }
  });
  
  const [player, setPlayer] = useState<GameObject>({
    x: GAME_WIDTH / 2 - 25,
    y: GAME_HEIGHT - 80,
    width: 50,
    height: 40,
    speed: PLAYER_SPEED
  });
  
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  
  const gameLoopRef = useRef<number>();
  const lastShotRef = useRef<number>(0);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setPlayer({
      x: GAME_WIDTH / 2 - 25,
      y: GAME_HEIGHT - 80,
      width: 50,
      height: 40,
      speed: PLAYER_SPEED
    });
    setMeteors([]);
    setBullets([]);
    setKeys(new Set());
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('spaceGameHighScore', score.toString());
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [score, highScore]);

  const shoot = useCallback(() => {
    const now = Date.now();
    if (now - lastShotRef.current > 150) {
      setBullets(prev => [...prev, {
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 12,
        speed: BULLET_SPEED
      }]);
      lastShotRef.current = now;
    }
  }, [player.x, player.y, player.width]);

  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    // Move player with smooth movement
    setPlayer(prev => {
      let newX = prev.x;
      if (keys.has('ArrowLeft') && prev.x > 0) {
        newX = Math.max(0, prev.x - prev.speed);
      }
      if (keys.has('ArrowRight') && prev.x < GAME_WIDTH - prev.width) {
        newX = Math.min(GAME_WIDTH - prev.width, prev.x + prev.speed);
      }
      return { ...prev, x: newX };
    });

    // Shoot
    if (keys.has('Space')) {
      shoot();
    }

    // Spawn meteors
    if (Math.random() < METEOR_SPAWN_RATE) {
      setMeteors(prev => [...prev, createMeteor(GAME_WIDTH)]);
    }

    // Update meteors
    setMeteors(prev => 
      prev
        .map(meteor => updateGameObjects(meteor) as Meteor)
        .filter(meteor => !isOutOfBounds(meteor, GAME_HEIGHT))
    );

    // Update bullets
    setBullets(prev => 
      prev
        .map(bullet => ({ ...bullet, y: bullet.y - bullet.speed }))
        .filter(bullet => bullet.y > -bullet.height)
    );

    // Check collisions
    const { meteorsHit, bulletsUsed, playerHit } = checkCollisions(meteors, bullets, player);
    
    // Remove hit meteors and used bullets
    if (meteorsHit.length > 0 || bulletsUsed.length > 0) {
      setMeteors(prev => prev.filter(meteor => !meteorsHit.includes(meteor)));
      setBullets(prev => prev.filter(bullet => !bulletsUsed.includes(bullet)));
      
      // Add points for destroyed meteors
      if (meteorsHit.length > 0) {
        const pointsEarned = meteorsHit.reduce((total, meteor) => total + meteor.points, 0);
        setScore(prev => prev + pointsEarned);
      }
    }

    // Check if player was hit
    if (playerHit) {
      endGame();
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, keys, meteors, bullets, player, shoot, endGame]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop, gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
        setKeys(prev => new Set([...prev, e.code]));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
        setKeys(prev => {
          const newKeys = new Set(prev);
          newKeys.delete(e.code);
          return newKeys;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <GameCanvas 
        gameState={gameState}
        player={player}
        meteors={meteors}
        bullets={bullets}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      <GameUI 
        gameState={gameState}
        score={score}
        highScore={highScore}
        onStartGame={startGame}
      />
    </div>
  );
};

export default SpaceGame;