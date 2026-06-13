/**
 * Confetti Component
 * Celebration animation that plays when milestone is reached
 */

import React from 'react';

function Confetti({ on }) {
  if (!on) return null;

  const cols = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 9999,
      overflow: "hidden"
    }}>
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 7 % 97) + "%",
            top: "-5%",
            width: 7,
            height: 7,
            borderRadius: i % 2 === 0 ? "50%" : 1,
            background: cols[i % cols.length],
            animation: `drop ${1.2 + (i % 3) * 0.6}s ease-in ${(i % 5) * 0.15}s both`
          }}
        />
      ))}
      <style>{`
        @keyframes drop {
          to {
            top: 105%;
            opacity: 0;
            transform: rotate(540deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Confetti;
