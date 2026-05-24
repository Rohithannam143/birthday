import { motion } from "framer-motion";

export function Locked() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="max-w-xl text-center"
      >
        <p className="font-script text-5xl text-rose md:text-7xl">Some moments</p>
        <p className="mt-2 font-script text-5xl text-gold-shimmer md:text-7xl">are only meant once.</p>
        <p className="mt-10 font-serif text-base italic leading-relaxed text-white/60 md:text-lg">
          This letter was written for one heart, one evening, one lifetime.
          <br />
          It has been read — and now it rests.
        </p>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.4em] text-white/30">
          with love · sealed forever
        </p>
      </motion.div>
    </div>
  );
}
