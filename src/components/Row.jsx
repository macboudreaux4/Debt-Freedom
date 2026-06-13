/**
 * Row Component
 * Reusable flex layout for label-value pairs
 */

import React from 'react';

function Row({ children, style = {} }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      ...style
    }}>
      {children}
    </div>
  );
}

export default Row;
