import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { HeartFall } from "@/components/effects/HeartFall";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  u.pitch = 1.05;
  u.volume = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const blastHearts = (count: number, big = false) => {
  const colors = ["#ff4d6d", "#ff8fa3", "#ffb3c1", "#ffd700"];
  confetti({
    particleCount: big ? 300 : 80 * count,
    spread: big ? 160 : 90,
    startVelocity: big ? 65 : 45,
    scalar: big ? 1.6 : 1.1,
    shapes: ["circle"],
    colors,
    origin: { y: 0.6 },
  });
  if (big) {
    setTimeout(() => confetti({ particleCount: 200, spread: 180, startVelocity: 80, colors, origin: { y: 0.5 } }), 250);
    setTimeout(() => confetti({ particleCount: 200, spread: 180, startVelocity: 80, colors, origin: { x: 0.2, y: 0.5 } }), 500);
    setTimeout(() => confetti({ particleCount: 200, spread: 180, startVelocity: 80, colors, origin: { x: 0.8, y: 0.5 } }), 700);
  }
};

const steps = [
  { num: 1, word: "One", hearts: 1 },
  { num: 2, word: "Two", hearts: 2 },
  { num: 3, word: "Three", hearts: 3 },
];

export function Countdown({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(-1);
  const [started, setStarted] = useState(false);
  const [finale, setFinale] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (idx >= steps.length) {
      setFinale(true);
      speak("Happy Birthday");
      blastHearts(0, true);
      const t = setTimeout(onDone, 2400);
      return () => clearTimeout(t);
    }
    if (idx < 0) {
      setIdx(0);
      return;
    }
    const s = steps[idx];
    speak(s.word);
    blastHearts(s.hearts, false);
    const t = setTimeout(() => setIdx(idx + 1), 1500);
    return () => clearTimeout(t);
  }, [idx, started, onDone]);

  if (!started) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStarted(true)}
          className="group relative rounded-full border border-gold/60 bg-card/40 px-12 py-6 font-display text-2xl tracking-wide text-gold backdrop-blur-sm transition-all hover:shadow-[0_0_60px_oklch(0.78_0.14_75_/_0.5)]"
        >
          <span className="text-gold-shimmer">Begin the moment</span>
          <span className="mt-2 block font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            tap to enable sound
          </span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeartFall count={24} />
      <AnimatePresence mode="wait">
        {!finale && idx >= 0 && idx < steps.length && (
          <motion.div
            key={steps[idx].num}
            initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 2.5, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 120 }}
            className="relative z-10 font-display font-bold leading-none text-gold-shimmer drop-shadow-[0_0_80px_rgba(255,80,120,0.6)]"
            style={{ fontSize: "clamp(9rem, 38vw, 24rem)" }}
          >
            {steps[idx].num}
          </motion.div>
        )}
        {finale && (
          <motion.div
            key="hb"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 10 }}
            className="relative z-10 text-center"
          >
            <div className="font-script text-6xl text-gold-shimmer md:text-9xl">Happy</div>
            <div className="-mt-2 font-script text-6xl text-gold-shimmer md:text-9xl">Birthday</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
