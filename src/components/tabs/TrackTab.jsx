/**
 * TrackTab Component
 * 19-month tracker showing debt balances and phases
 */

import React from 'react';
import { MONTHS } from '../../constants';
import { fmt } from '../../utils';
import Card from '../Card';
import SectionTitle from '../SectionTitle';

function TrackTab({ C, mo, setMo }) {
  const phColors = { IO: "#3b82f6", "P&I": "#f59e0b", Sprint: "#22c55e" };
  const m = MONTHS[mo - 1];
  const pc = phColors[m.ph];
  const debtRows = [
    { label: "SoFi", val: m.sofi, color: "#3b82f6" },
    { label: "Disc 2", val: m.d2, color: "#f59e0b" },
    { label: "Car 2", val: m.c2, color: "#8b5cf6" },
    { label: "Car 1", val: m.c1, color: "#ec4899" },
    { label: "Disc 1", val: m.d1, color: "#06b6d4" },
    { label: "Cap One", val: m.co ? 0 : -1, color: "#22c55e" },
    { label: "107k Note", val: m.n107, color: "#f97316" }
  ];

  return (
    <div style={{ paddingBottom: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.text, padding: "20px 20px 4px" }}>
        19-Month Tracker
      </div>
      <div style={{ fontSize: 13, color: C.muted, padding: "0 20px 12px" }}>
        Tap a month to view details
      </div>

      {/* Month Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, padding: "0 16px 12px" }}>
        {MONTHS.map((mm, idx) => (
          <button
            key={mm.mo}
            onClick={() => setMo(mm.mo)}
            style={{
              background: mo === mm.mo ? C.bg : C.card,
              border: "1px solid " + (mo === mm.mo ? phColors[mm.ph] : C.border),
              borderWidth: mo === mm.mo ? 2 : 1,
              borderRadius: 10,
              padding: "7px 4px",
              width: "calc(20% - 6px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                lineHeight: 1,
                color: mo === mm.mo ? phColors[mm.ph] : idx < mo ? "#22c55e" : C.muted
              }}
            >
              {mm.mo}
            </span>
            <span style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>
              {mm.p.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Month Details */}
      <Card C={C} style={{ borderColor: pc, borderWidth: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>{m.p}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: pc, marginTop: 2 }}>
              {m.ph} Phase
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: C.muted }}>Snowball</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>{fmt(m.snow)}</div>
          </div>
        </div>
        {m.note !== "" && (
          <div style={{
            background: C.bg,
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 13,
            color: C.sub,
            marginBottom: 12,
            borderLeft: "2px solid #22c55e"
          }}>
            {m.note}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {debtRows.map(({ label, val, color }) => (
            <div key={label} style={{ background: C.bg, borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: color, marginBottom: 3 }} />
              <div style={{ fontSize: 10, color: C.muted }}>{label}</div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: val === 0 || val === -1 ? "#22c55e" : C.text,
                  marginTop: 2
                }}
              >
                {val === 0 || val === -1 ? "PAID" : fmt(val)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Phase Guide */}
      <SectionTitle C={C}>PHASE GUIDE</SectionTitle>
      {[
        { ph: "Phase 1 (Jun-Sep 2026)", c: "#3b82f6", a: "Everything to SoFi. Discover 2 at $403/mo minimum.", s: "~$2,258/mo extra to SoFi" },
        { ph: "Phase 1B (Oct-Nov 2026)", c: "#3b82f6", a: "SoFi gone. Snowball crushes Car Note 2 at 8.75%.", s: "~$1,700+/mo extra" },
        { ph: "Phase 2 (Dec 2026-Jun 2027)", c: "#f59e0b", a: "107k P&I kicks in at $2,600. Budget tightens.", s: "$0-$300 extra variable" },
        { ph: "Phase 3 (Jul-Dec 2027)", c: "#22c55e", a: "Final sprint -- consumer debts fall every 1-2 months.", s: "Snowball accelerates rapidly" }
      ].map(({ ph, c, a, s }) => (
        <div
          key={ph}
          style={{
            margin: "4px 16px",
            background: C.card,
            borderRadius: 14,
            padding: 14,
            borderLeft: "3px solid " + c
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: c, marginBottom: 3 }}>{ph}</div>
          <div style={{ fontSize: 13, color: C.sub, marginBottom: 3 }}>{a}</div>
          <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 600 }}>{s}</div>
        </div>
      ))}
    </div>
  );
}

export default TrackTab;
