import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import memoryBg from "@/assets/memory-3.jpg";

const PAUSE_AT = 12; // seconds — change as needed
const memes = [
  "Think again, please 🥺",
  "Are you sure? My heart is on the line 💔",
  "Don't break me like this 😢",
  "Reconsider, baby? 💕",
  "Pleaseee one more thought? 🙏",
];

export function VideoQuestion({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [meme, setMeme] = useState<string | null>(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
 useEffect(() => {

  const v = videoRef.current;

  if (!v) return;

  v.muted = false;

  v.volume = 1;

  const playVideo = async () => {

    try {

      await v.play();

    } catch (err) {

      console.log("Playback blocked:", err);

    }

  };

  playVideo();

}, []);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (!answered && !paused && v.currentTime >= PAUSE_AT) {
        v.pause();
        setPaused(true);
      }
    };
    const onEnded = () => {
      if (answered) onDone();
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, [paused, answered, onDone]);

  const handleYes = () => {
    setAnswered(true);
    setPaused(false);
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  };

  const handleNoMobile = () => {
    setMeme(memes[Math.floor(Math.random() * memes.length)]);
    setTimeout(() => setMeme(null), 2200);
  };

  const handleNoMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 140) {
      const angle = Math.atan2(dy, dx);
      const flee = 200;
      setNoPos({ x: noPos.x - Math.cos(angle) * flee, y: noPos.y - Math.sin(angle) * flee });
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{
        backgroundImage: `linear-gradient(oklch(0.08 0.03 15 / 0.85), oklch(0.08 0.03 15 / 0.95)), url(${memoryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="aspect-video w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="premium-frame overflow-hidden"
        >
          <video
            ref={videoRef}
            src="/video/intro.mp4"
            className="aspect-video w-full bg-black"
            autoPlay
            playsInline
            controls={!paused}
          />
        </motion.div>

        <AnimatePresence>
          {paused && !answered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-10 text-center"
            >
              <p className="font-display text-3xl text-gold-shimmer md:text-5xl">Tarwatha Lyric Telusu kadha Continue Chesthava?</p>
              <div className="relative mt-8 flex items-center justify-center gap-8">
                <button
                  onClick={handleYes}
                  className="rounded-full bg-rose px-10 py-4 font-display text-xl text-white shadow-[0_0_40px_oklch(0.55_0.22_18_/_0.5)] transition-transform hover:scale-110"
                >
                  Yes 💕
                </button>
                <button
                  onClick={isMobile ? handleNoMobile : undefined}
                  onMouseMove={handleNoMove}
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  className="rounded-full border border-muted-foreground/40 bg-card/40 px-10 py-4 font-display text-xl text-muted-foreground backdrop-blur"
                >
                  No
                </button>
              </div>
              <AnimatePresence>
                {meme && (
                  <motion.p
                    key={meme}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 font-script text-3xl text-rose"
                  >
                    {meme}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {answered && (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 text-center font-script text-5xl text-gold-shimmer md:text-7xl"
            >
              Naa Bangaramm Ummmaaaa💖
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
