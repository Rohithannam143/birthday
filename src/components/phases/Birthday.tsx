import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const balloonColors = ["#ff4d6d", "#ffb3c1", "#ffd700", "#ff8fa3", "#c9184a", "#ffffff"];

function Balloons() {
  const balloons = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 9 + Math.random() * 6,
        color: balloonColors[i % balloonColors.length],
        size: 40 + Math.random() * 40,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: "-120px",
            animation: `float-up ${b.duration}s ${b.delay}s linear infinite`,
          }}
        >
          <div
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, ${b.color}, ${b.color}cc 60%, ${b.color}77)`,
              borderRadius: "50%",
              boxShadow: `0 0 30px ${b.color}55`,
            }}
          />
          <div className="mx-auto h-16 w-px bg-white/20" />
        </div>
      ))}
    </div>
  );
}

function Cake({ onCut }: { onCut: () => void }) {
  const [cut, setCut] = useState(false);
  const [hover, setHover] = useState(false);

  const handleCut = () => {
    if (cut) return;
    setCut(true);
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.7 }, colors: ["#ff4d6d", "#ffd700", "#ffb3c1"] });
    setTimeout(onCut, 1800);
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={handleCut}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer focus:outline-none"
        aria-label="Cut the cake"
      >
        {/* Candles */}
        <div className="mb-2 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <div className="h-10 w-1.5 rounded-sm bg-gradient-to-b from-rose to-amber-200" />
              <AnimatePresence>
                {!cut && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, y: -10 }}
                    className="absolute -top-4 left-1/2 h-5 w-3 -translate-x-1/2 rounded-full"
                    style={{
                      background: "radial-gradient(ellipse at center, #fff6c2 0%, #ffb74d 40%, #ff5722 80%)",
                      animation: "flicker 0.15s ease-in-out infinite alternate",
                      boxShadow: "0 0 20px #ffb74d, 0 -10px 40px #ff5722",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Cake layers */}
        <motion.div
          animate={cut ? { rotateZ: -2 } : {}}
          className="relative"
          style={{ filter: hover && !cut ? "brightness(1.1)" : "" }}
        >
          {/* Top layer */}
          <div className="relative mx-auto h-16 w-40 rounded-t-lg bg-gradient-to-b from-pink-200 to-pink-300 shadow-inner">
            <div className="absolute inset-x-2 top-2 h-2 rounded-full bg-white/40" />
          </div>
          {/* Drips */}
          <div className="relative -mt-2 h-3 w-44">
            <svg viewBox="0 0 200 20" className="absolute inset-0 h-full w-full">
              <path d="M0,0 Q20,18 40,5 T80,8 T120,4 T160,10 T200,0 L200,0 L0,0 Z" fill="#fff" opacity="0.85" />
            </svg>
          </div>
          {/* Middle layer */}
          <div className="mx-auto -mt-1 h-20 w-48 bg-gradient-to-b from-amber-100 to-amber-200">
            <div className="flex h-full items-center justify-around">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-rose" />
              ))}
            </div>
          </div>
          {/* Bottom layer */}
          <div className="mx-auto h-24 w-56 rounded-b-lg bg-gradient-to-b from-pink-300 to-rose shadow-xl">
            <div className="flex h-full items-center justify-around">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-4 rounded-full bg-white/80" />
              ))}
            </div>
          </div>
          {/* Plate */}
          <div className="mx-auto -mt-1 h-3 w-64 rounded-full bg-gradient-to-b from-gold to-amber-700 shadow-2xl" />

          <AnimatePresence>
            {cut && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 80, y: 40, rotate: 25, opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute right-2 top-8 h-32 w-12 origin-top-left"
                style={{
                  background: "linear-gradient(to bottom, #fce4ec, #f8bbd0, #e91e63)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {!cut && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 text-center font-sans text-sm uppercase tracking-[0.3em] text-gold"
            >
              tap to cut the cake
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export function Birthday({ onDone }: { onDone: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    audioRef.current?.play().catch(() => {});
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <Balloons />
      {/* Replace /audio/happy-birthday.mp3 with your own file in public/audio/ */}
      <audio ref={audioRef} src="/audio/happy-birthday.mp3" autoPlay loop />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 pt-8 text-center">
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 40, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-6xl font-light tracking-wide text-gold-shimmer md:text-8xl">
                Happy Birthday
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.4 }}
                className="mt-4 font-script text-6xl text-rose md:text-8xl"
                style={{ textShadow: "0 0 40px oklch(0.65 0.22 15 / 0.5)" }}
              >
                Dear Love
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <Cake onCut={onDone} />
        </motion.div>
      </div>
    </div>
  );
}
