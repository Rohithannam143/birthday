import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MAX_DURATION = 30; // seconds

export function FinalScene({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.currentTime >= MAX_DURATION) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center font-script text-5xl text-gold-shimmer md:text-7xl"
      >
        Always & Forever
      </motion.h2>

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="premium-frame overflow-hidden">
            <video
              ref={videoRef}
              src="/video/final.mp4"
              className="aspect-video w-full bg-black"
              autoPlay
              loop
              controls
              playsInline
            />
          </div>
        </div>
        <div className="paper-texture relative rounded-sm p-8 shadow-2xl lg:col-span-2"
          style={{
            backgroundImage:
              "radial-gradient(at 20% 30%, oklch(0.88 0.04 60 / 0.5) 0px, transparent 50%), radial-gradient(at 80% 70%, oklch(0.85 0.05 50 / 0.4) 0px, transparent 50%)",
            backgroundColor: "oklch(0.94 0.025 75)",
          }}>
          <div className="pointer-events-none absolute inset-3 rounded-sm border border-amber-900/20" />
          <h3 className="font-script text-4xl text-rose"> Kannamma,</h3>
          <div className="mt-6 space-y-4 font-serif text-base leading-relaxed text-stone-800 md:text-lg">
            <p>First Letter Chusi Navvukunnav Kadha ( Navvakunte chesedhi em ledhu ) kaani ee letter Ala Kaadhu,</p>
            <p>I don’t know when you became this important to me.
Maybe it was hidden in those late-night conversations,
in your small caring words,
or in the way my mood changes the moment I see your name on my screen.</p>
            <p>
              You are not just someone I love.
You are the peace my heart looks for after every difficult day.

Sometimes I sit quietly and think about how strange life is…
Out of millions of people in this world,
my heart chose you so naturally, as if it always belonged to you.
            </p>
            <p>
              I may not always express everything perfectly,
but one thing is true —
my feelings for you are genuine, deep, and constant.

No matter where life takes us,
a part of my heart will always carry your name softly within it.
            </p>
            <p className="pt-4 font-script text-2xl text-rose">— forever yours.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <button
          onClick={onDone}
          className="rounded-full bg-rose/80 px-10 py-4 font-display text-lg text-white shadow-[0_0_40px_oklch(0.55_0.22_18_/_0.5)] transition-transform hover:scale-105"
        >
          close this letter forever
        </button>
      </div>
    </div>
  );
}
