import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Gauge, RefreshCw, Plane, Gamepad2, Play, ChevronLeft } from "lucide-react";

// --- Game Constants ---
const GAME_SPEED = 12;
const SPAWN_RATE = 45;

export default function OfflinePage({ status = "offline", onRetry }) {
  const [retrying, setRetrying] = useState(false);
  const [currentView, setCurrentView] = useState("status"); // "status" | "game"

  const handleRetry = async () => {
    setRetrying(true);
    await onRetry?.();
    setTimeout(() => setRetrying(false), 2000);
  };

  const isSlow = status === "slow";
  const Icon = isSlow ? Gauge : WifiOff;
  const headline = isSlow ? "Connection is very slow" : "You're offline";
  const sub = isSlow
    ? "Your internet is reachable but extremely slow. Some things may not load."
    : "No internet connection detected. Check your Wi-Fi, mobile data, or airplane mode.";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] font-['Quicksand'] transition-colors duration-500">
        
        {/* Ambient glow */}
        <div 
          className={`absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[360px] rounded-full blur-[100px] pointer-events-none transition-colors duration-700
            ${isSlow ? 'bg-yellow-500/10 dark:bg-yellow-500/10' : 'bg-red-500/10 dark:bg-red-500/10'}`} 
        />

        {/* Floating dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isSlow ? 'bg-yellow-500/30' : 'bg-red-500/30'}`}
            style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md bg-white/60 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] rounded-3xl backdrop-blur-xl relative overflow-hidden text-center shadow-xl dark:shadow-none min-h-[580px] flex flex-col"
        >
          {/* Shimmer line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/15 to-transparent z-50" />

          {/* Absolute Wrapper for seamless view swapping without layout collapse */}
          <div className="relative flex-1 w-full">
            <AnimatePresence mode="wait">
              {currentView === "status" ? (
                // --- VIEW 1: OFFLINE STATUS ---
                <motion.div
                  key="status-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col p-8"
                >
                  <motion.div
                    animate={isSlow ? { scale: [1, 1.05, 1] } : { rotate: [0, -8, 8, -4, 4, 0] }}
                    transition={{ duration: isSlow ? 2 : 0.6, repeat: Infinity, repeatDelay: 3 }}
                    className={`mx-auto inline-flex p-4 rounded-2xl mb-6 border ${
                      isSlow 
                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-500' 
                        : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-500'
                    }`}
                  >
                    <Icon size={32} strokeWidth={1.8} />
                  </motion.div>

                  {!isSlow && (
                    <div className="mx-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 mb-4">
                      <Plane size={11} className="text-neutral-500 dark:text-white/40" />
                      <span className="text-neutral-600 dark:text-white/40 text-[11px] font-semibold tracking-wide">
                        Airplane mode may be on
                      </span>
                    </div>
                  )}

                  <h2 className="text-neutral-900 dark:text-white text-2xl font-bold mb-2 tracking-tight">
                    {headline}
                  </h2>

                  <p className="text-neutral-500 dark:text-white/45 text-sm leading-relaxed mb-8 font-medium">
                    {sub}
                  </p>

                  <div className="bg-neutral-100/50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.07] rounded-2xl p-4 mb-6 text-left flex-1">
                    <p className="text-neutral-400 dark:text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3">
                      Things to check
                    </p>
                    {(isSlow
                      ? ["Move closer to your Wi-Fi router", "Disconnect & reconnect to Wi-Fi", "Close other bandwidth-heavy apps"]
                      : ["Turn off airplane mode", "Check your Wi-Fi or mobile data", "Restart your router if needed"]
                    ).map((tip) => (
                      <div key={tip} className="flex items-center gap-2 mb-2 last:mb-0">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSlow ? 'bg-yellow-500/50' : 'bg-red-500/50'}`} />
                        <span className="text-neutral-600 dark:text-white/50 text-[13px] font-medium">{tip}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mt-auto">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRetry}
                      disabled={retrying}
                      className={`w-full py-3.5 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all
                        ${retrying 
                          ? 'bg-emerald-700/30 text-neutral-500 dark:text-white/40 cursor-not-allowed' 
                          : 'bg-[#1f7d53] text-white hover:bg-[#186341] shadow-lg shadow-emerald-900/20'}`}
                    >
                      <motion.span
                        animate={retrying ? { rotate: 360 } : { rotate: 0 }}
                        transition={retrying ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}
                      >
                        <RefreshCw size={16} />
                      </motion.span>
                      {retrying ? "Checking connection…" : "Try again"}
                    </motion.button>

                    <button
                      onClick={() => setCurrentView("game")}
                      className="w-full py-3 rounded-xl text-[14px] font-semibold text-neutral-500 hover:text-neutral-800 dark:text-white/40 dark:hover:text-white/80 bg-neutral-200/50 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Gamepad2 size={16} />
                      Bored? Play a game
                    </button>
                  </div>
                </motion.div>
              ) : (
                // --- VIEW 2: GAME ---
                <motion.div
                  key="game-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col p-6"
                >
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <button
                      onClick={() => setCurrentView("status")}
                      className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 dark:text-white/40 dark:hover:text-white/80 font-semibold text-sm transition-colors py-1 pl-0 pr-3 active:scale-95"
                    >
                      <ChevronLeft size={18} />
                      Back
                    </button>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/30 font-bold">
                      System Override
                    </div>
                  </div>

                  {/* Safely bound relative container for the game */}
                  <div className="flex-1 w-full relative bg-neutral-100 dark:bg-black/40 rounded-2xl border border-neutral-300 dark:border-white/10 overflow-hidden shadow-inner">
                    <MiniGame />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-neutral-400 dark:text-white/20 text-xs mt-8 font-medium">
          Painters' Diary
        </p>
      </div>
    </>
  );
}

// --- Minimalist Game Sub-Component ---
function MiniGame() {
  // We use Refs for game logic to prevent the game loop from stuttering/re-rendering
  const gameStateRef = useRef('menu');
  const [gameStateUI, setGameStateUI] = useState('menu'); 
  
  const scoreRef = useRef(0);
  const [scoreUI, setScoreUI] = useState(0);
  
  const highScoreRef = useRef(0);
  const [highScoreUI, setHighScoreUI] = useState(0);
  
  const playerLaneRef = useRef(1);
  const [playerLaneUI, setPlayerLaneUI] = useState(1);
  
  const frameCountRef = useRef(0);
  const itemsRef = useRef([]);
  const [itemsUI, setItemsUI] = useState([]);

  const requestRef = useRef(null);

  // Sync State Helpers
  const setGameState = (state) => {
    gameStateRef.current = state;
    setGameStateUI(state);
  };
  
  const setPlayerLane = useCallback((laneFunction) => {
    const newLane = typeof laneFunction === 'function' ? laneFunction(playerLaneRef.current) : laneFunction;
    playerLaneRef.current = newLane;
    setPlayerLaneUI(newLane);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('diaryGameScore');
    if (saved) {
      const val = parseInt(saved, 10);
      highScoreRef.current = val;
      setHighScoreUI(val);
    }
  }, []);

  const moveLeft = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    setPlayerLane(prev => Math.max(0, prev - 1));
  }, [setPlayerLane]);

  const moveRight = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    setPlayerLane(prev => Math.min(2, prev + 1));
  }, [setPlayerLane]);

  const startGame = () => {
    setGameState('playing');
    scoreRef.current = 0;
    setScoreUI(0);
    itemsRef.current = [];
    setItemsUI([]);
    frameCountRef.current = 0;
    setPlayerLane(1);
    
    if (requestRef.current) clearTimeout(requestRef.current);
    requestRef.current = setTimeout(gameTick, GAME_SPEED);
  };

  // Bulletproof Game Loop: Uses Refs so it never has stale closures or triggers unneeded react loops
  const gameTick = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    let nextItems = itemsRef.current
      .map(item => ({ ...item, y: item.y + 1.5 }))
      .filter(item => item.y < 120);

    const playerYTop = 80;
    const playerYBottom = 90;
    let collision = false;
    let pointsGained = 0;

    const survivingItems = nextItems.filter((item) => {
      const inHitBox = item.y > playerYTop && item.y < playerYBottom;
      const inLane = item.lane === playerLaneRef.current;

      if (inHitBox && inLane) {
        if (item.type === 'obstacle') {
          collision = true;
        } else if (item.type === 'coin') {
          pointsGained += 10;
          return false; // Remove coin
        }
      }
      return true;
    });

    if (collision) {
      setGameState('gameover');
      if (scoreRef.current > highScoreRef.current) {
        highScoreRef.current = scoreRef.current;
        setHighScoreUI(scoreRef.current);
        localStorage.setItem('diaryGameScore', scoreRef.current.toString());
      }
      return; // Stop loop
    }

    if (pointsGained > 0) {
      scoreRef.current += pointsGained;
      setScoreUI(scoreRef.current);
    }

    if (frameCountRef.current % 10 === 0) {
      scoreRef.current += 1;
      setScoreUI(scoreRef.current);
    }

    frameCountRef.current += 1;
    if (frameCountRef.current % SPAWN_RATE === 0) {
      const lane = Math.floor(Math.random() * 3);
      const type = Math.random() > 0.3 ? 'obstacle' : 'coin';
      survivingItems.push({ id: Date.now(), lane, y: -10, type });
    }

    // Save and render
    itemsRef.current = survivingItems;
    setItemsUI(survivingItems);

    requestRef.current = setTimeout(gameTick, GAME_SPEED);
  }, []);

  // Cleanup Timeout on Unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) clearTimeout(requestRef.current);
    };
  }, []);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStateRef.current === 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
        if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight]);

  const handleTouchStart = (e) => {
    if (gameStateRef.current !== 'playing') return;
    const touchX = e.touches[0].clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = touchX - rect.left;
    if (relativeX < rect.width / 2) moveLeft();
    else moveRight();
  };

  const getLaneLeftPos = (laneIndex) => {
    if (laneIndex === 0) return '16.66%';
    if (laneIndex === 1) return '50%';
    return '83.33%';
  };

  return (
    <div className="absolute inset-0 select-none">
      
      {/* Top HUD */}
      <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start z-20 pointer-events-none">
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40 font-bold mb-1">Score</span>
          <span className="text-xl font-medium text-neutral-800 dark:text-white leading-none">
            {scoreUI.toString().padStart(4, '0')}
          </span>
        </div>
        {highScoreUI > 0 && (
          <div className="flex flex-col text-right">
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40 font-bold mb-1">Best</span>
            <span className="text-xl font-medium text-neutral-500 dark:text-white/60 leading-none">
              {highScoreUI}
            </span>
          </div>
        )}
      </div>

      {/* Touch Play Area */}
      <div className="absolute inset-0 z-10" onTouchStart={handleTouchStart}>
        
        {/* Subtle Lanes */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1 border-r border-neutral-200 dark:border-white/[0.05]" />
          <div className="flex-1 border-r border-neutral-200 dark:border-white/[0.05]" />
          <div className="flex-1" />
        </div>

        {/* Player */}
        <div
          className="absolute bottom-[15%] w-6 h-6 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-20"
          style={{ left: getLaneLeftPos(playerLaneUI), transform: 'translateX(-50%)' }}
        >
          <div className="w-3 h-3 bg-neutral-800 dark:bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
        </div>

        {/* Items */}
        {itemsUI.map((item) => (
          <div
            key={item.id}
            className="absolute w-8 h-8 flex items-center justify-center transition-none z-10"
            style={{ left: getLaneLeftPos(item.lane), top: `${item.y}%`, transform: 'translateX(-50%)' }}
          >
            {item.type === 'obstacle' ? (
              <div className="w-6 h-6 bg-red-500/20 dark:bg-red-500/40 border border-red-500/50 backdrop-blur-sm rounded-md" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-yellow-500 dark:border-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            )}
          </div>
        ))}
      </div>

      {/* Menus Overlay */}
      {gameStateUI === 'menu' && (
        <div className="absolute inset-0 bg-neutral-100/80 dark:bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
          <button
            onClick={startGame}
            className="w-14 h-14 bg-white dark:bg-white/10 hover:bg-neutral-50 dark:hover:bg-white/20 border border-neutral-200 dark:border-white/20 rounded-full flex items-center justify-center text-neutral-800 dark:text-white transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Play size={20} className="ml-1" fill="currentColor" />
          </button>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-white/50 font-bold">
            Tap sides or use arrows
          </p>
        </div>
      )}

      {gameStateUI === 'gameover' && (
        <div className="absolute inset-0 bg-neutral-100/90 dark:bg-black/80 backdrop-blur-md z-30 flex flex-col items-center justify-center">
          <p className="text-neutral-500 dark:text-white/50 text-xs font-bold uppercase tracking-widest mb-6">
            Crashed
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-neutral-800 dark:bg-white/10 hover:bg-neutral-700 dark:hover:bg-white/20 border border-transparent dark:border-white/20 text-white rounded-full text-sm font-semibold tracking-wide transition-all flex items-center gap-2 active:scale-95"
          >
            <RefreshCw size={14} />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}