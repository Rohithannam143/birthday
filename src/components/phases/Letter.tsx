import { motion } from "framer-motion";
import { useRef, useState } from "react";

const paragraphs = [
  "My dearest love andham anukunna kaani endhuku le normal gaane piluchukunela pilustha Kannamma ,","first of all Many More Happy Returns of the Bangaram,","Naa Varaku letters Rayadam ante aithe leave letter ledha Permission letter anthak minchi friendship day ki kuda letter rayadam raadhu so idhi ela untadho nak thelidhu kaani ela unna i tried my best ane point maatram Consider chey","Nuv ilanti Birthdays inka inka Jarupukovali ani nee prathi Birthday ki Nak edho oka Gift ivvalani Korukuntu Nee kosamane kindha oka paata kuda paadi petta adhi vinnaka kuda nek dairyam unte continue chey Bangaram ","Once Again Happy Birthday my Kannamma,"
];

export function Letter({ onDone }: { onDone: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="paper-texture relative w-full max-w-2xl rounded-sm p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] md:p-16"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 30%, oklch(0.88 0.04 60 / 0.5) 0px, transparent 50%), radial-gradient(at 80% 70%, oklch(0.85 0.05 50 / 0.4) 0px, transparent 50%)",
          backgroundColor: "oklch(0.94 0.025 75)",
        }}
      >
        {/* Decorative corners */}
        <div className="pointer-events-none absolute inset-3 rounded-sm border border-amber-900/20" />

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center font-script text-5xl text-rose md:text-6xl"
        >
          A Letter For You
        </motion.h2>

        <div className="mt-8 space-y-5 font-serif text-lg leading-relaxed text-stone-800 md:text-xl">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.6, duration: 1 }}
              className={i === 0 || i === paragraphs.length - 1 ? "font-script text-2xl text-rose md:text-3xl" : ""}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Voice / audio section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="mt-10 flex items-center gap-4 rounded-lg border border-amber-900/20 bg-amber-50/60 p-4"
        >
          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-rose text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Play voice note"
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <div className="flex-1">
            <p className="font-serif text-sm font-medium text-stone-700">A voice note for you</p>
            <p className="font-sans text-xs text-stone-500">press play, my love</p>
          </div>
          <audio
            ref={audioRef}
            src="/audio/letter-voice.mp3"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={onDone}
            className="group rounded-full border border-rose/40 bg-rose/10 px-8 py-3 font-serif text-base italic text-rose transition-all hover:bg-rose hover:text-white"
          >
            continue, my love →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
