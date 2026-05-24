import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";

const memories = [
  {
    img: m1,
    title: "The Beginning",
    body: "Needhi naadhi for the first time college chesina Image *OUR CHILDHOOD PICs* Aaroju Evaru Cute unnaro Chuddam antu Start aina aa Argument ila oka CHILHOOD IMAGE COLLEGE cheyyadaniki oka Reason ",
  },
  {
    img: m2,
    title: "First Selfie",
    body: "After  That Terrific R&D Expo Night Nidra ledhu Aina Occhinam ( Not for R&D But For YOU )Aaroju Unexpected ga ( nak ) Nuvvu Theesina First Selfie ( Duo ) ",},
  {
    img: m3,
    title: "Imagination",
    body: "Aakariki AI Tho Chepinchukovalsi Osthundhi em chesta, Thappadhu Kadha ", },
];

function heartBlast(originX: number, originY: number) {
  const heartShape = (confetti as any).shapeFromText
    ? (confetti as any).shapeFromText({ text: "❤", scalar: 2 })
    : undefined;
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 45,
    scalar: 1.6,
    ticks: 200,
    gravity: 0.9,
    origin: { x: originX, y: originY },
    colors: ["#ff4d6d", "#ff8fa3", "#ffd166", "#ffb3c1"],
    shapes: heartShape ? [heartShape] : ["circle"],
  });
}

function MemoryRow({ m, i }: { m: (typeof memories)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
            const r = el.getBoundingClientRect();
            const x = (r.left + r.width / 2) / window.innerWidth;
            const y = (r.top + r.height / 2) / window.innerHeight;
            heartBlast(x, Math.min(0.85, Math.max(0.15, y)));
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      className="grid items-center gap-8 md:grid-cols-5"
    >
      <div className={`md:col-span-3 ${i % 2 === 1 ? "md:order-2" : ""}`}>
        <div className="premium-frame overflow-hidden">
          <img
            src={m.img}
            alt={m.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>
      <div className="md:col-span-2">
        <h3 className="font-display text-4xl text-gold md:text-5xl">{m.title}</h3>
        <p className="mt-4 font-serif text-lg italic leading-relaxed text-foreground/85 md:text-xl">
          {m.body}
        </p>
      </div>
    </motion.div>
  );
}

export function Memories({ onDone }: { onDone: () => void }) {
  return (
    <div className="px-4 py-20 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center font-script text-5xl text-gold-shimmer md:text-8xl"
      >
        Our Memories
      </motion.h2>

      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        {memories.map((m, i) => (
          <MemoryRow key={i} m={m} i={i} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={onDone}
          className="rounded-full border border-gold/50 bg-card/30 px-10 py-4 font-display text-lg text-gold backdrop-blur transition-all hover:bg-gold hover:text-background"
        >
          one last thing →
        </motion.button>
      </div>
    </div>
  );
}
