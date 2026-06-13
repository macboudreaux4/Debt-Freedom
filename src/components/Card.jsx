/**
 * Card Component
 * Reusable container for content with consistent styling
 */

import React from 'react';

function Card({ C, children, style = {} }) {
  return (
    <div style={{
      margin: "8px 16px",
      background: C.card,
      borderRadius: 16,
      padding: 16,
      border: "1px solid " + C.border,
      ...style
    }}>
      {children}
    </div>
  );
}

export default Card;
