import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Countdown } from "@/components/phases/Countdown";
import { Birthday } from "@/components/phases/Birthday";
import { Letter } from "@/components/phases/Letter";
import { VideoQuestion } from "@/components/phases/VideoQuestion";
import { HeartButton } from "@/components/phases/HeartButton";
import { Memories } from "@/components/phases/Memories";
import { FinalScene } from "@/components/phases/FinalScene";
import { Locked } from "@/components/phases/Locked";

export const Route = createFileRoute("/")({
  component: Index,
});

const LOCK_KEY = "love-letter-sealed";
type Phase = "countdown" | "birthday" | "letter" | "video" | "heart" | "memories" | "final" | "locked";

function Index() {
  const [phase, setPhase] = useState<Phase>("countdown");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(LOCK_KEY) === "true") {
      setLocked(true);
    }
  }, []);

  const next = (p: Phase) => () => setPhase(p);

  const sealForever = () => {
    if (typeof window !== "undefined") localStorage.setItem(LOCK_KEY, "true");
    setLocked(true);
  };

  if (locked) return <Locked />;

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {phase === "countdown" && <Countdown onDone={next("birthday")} />}
          {phase === "birthday" && <Birthday onDone={next("letter")} />}
          {phase === "letter" && <Letter onDone={next("video")} />}
          {phase === "video" && <VideoQuestion onDone={next("heart")} />}
          {phase === "heart" && <HeartButton onDone={next("memories")} />}
          {phase === "memories" && <Memories onDone={next("final")} />}
          {phase === "final" && <FinalScene onDone={sealForever} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
