import { useMemo } from "react";

interface Props {
  count?: number;
  className?: string;
}

export function HeartFall({ count = 28, className = "" }: Props) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        size: 14 + Math.random() * 22,
        sway: 20 + Math.random() * 40,
        opacity: 0.55 + Math.random() * 0.45,
        hue: Math.random() > 0.7 ? "#ffd166" : Math.random() > 0.4 ? "#ff4d6d" : "#ff8fa3",
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute -top-10 select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            color: h.hue,
            opacity: h.opacity,
            filter: `drop-shadow(0 0 8px ${h.hue}88)`,
            animation: `heart-fall ${h.duration}s ${h.delay}s linear infinite, heart-sway ${h.duration / 2}s ${h.delay}s ease-in-out infinite alternate`,
            ["--sway" as never]: `${h.sway}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
