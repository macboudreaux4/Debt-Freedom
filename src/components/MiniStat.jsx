/**
 * MiniStat Component
 * Small stat display with value and label
 */

import React from 'react';

function MiniStat({ C, label, value, color }) {
  return (
    <div style={{
      flex: 1,
      background: C.card,
      borderRadius: 14,
      padding: "10px 6px",
      textAlign: "center"
    }}>
      <div style={{
        fontSize: 18,
        fontWeight: 800,
        color: color || C.text,
        lineHeight: 1
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 9,
        color: C.muted,
        marginTop: 3,
        lineHeight: 1.2
      }}>
        {label}
      </div>
    </div>
  );
}

export default MiniStat;
