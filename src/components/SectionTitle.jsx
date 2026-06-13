/**
 * SectionTitle Component
 * Styled heading for content sections
 */

import React from 'react';

function SectionTitle({ C, children }) {
  return (
    <div style={{
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      color: C.muted,
      padding: "16px 20px 8px"
    }}>
      {children}
    </div>
  );
}

export default SectionTitle;
