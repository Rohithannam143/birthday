import { motion } from "framer-motion";
import heartImg from "@/assets/heart-button.png";
import { HeartFall } from "@/components/effects/HeartFall";

export function HeartButton({ onDone }: { onDone: () => void }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">
      <HeartFall count={32} />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 font-script text-4xl text-gold-shimmer md:text-6xl"
      >
        Press my heart
      </motion.p>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDone}
        className="heart-beat group relative z-10"
        aria-label="Continue"
      >
        <img
          src={heartImg}
          alt="Heart"
          width={240}
          height={240}
          className="h-52 w-52 drop-shadow-[0_0_60px_rgba(255,80,120,0.6)] md:h-72 md:w-72"
        />
      </motion.button>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="relative z-10 font-script text-2xl text-rose md:text-3xl"
      >
        tap to keep going
      </motion.p>
    </div>
  );
}
