/**
 * FreedomTab Component
 * Financial planning tools: milestones, roadmap, windfall calculator, what-if scenarios
 */

import React, { useState } from 'react';
import { fmt, daysTo } from '../../utils';
import Card from '../Card';
import Row from '../Row';
import MiniStat from '../MiniStat';
import SectionTitle from '../SectionTitle';

function FreedomTab({
  C,
  debts,
  snowball,
  promoDays,
  freedomDays,
  mo,
  resetConfirm,
  setResetConfirm,
  doReset
}) {
  const [sub, setSub] = useState("milestones");
  const [wf, setWf] = useState("");
  const [wfTarget, setWfTarget] = useState("SoFi Loan");
  const [wiInc, setWiInc] = useState(0);
  const [wiExp, setWiExp] = useState(0);
  const [wiExtra, setWiExtra] = useState(0);
  const [wiWind, setWiWind] = useState(0);

  const wfN = parseFloat(wf) || 0;
  const base = 2918;
  const adj = base + wiInc - wiExp + wiExtra;
  const impact = ((base - adj) / base) * 19 - (wiWind * 0.8) / base;
  const faster = impact < 0;
  const activeDebts = debts.filter((d) => !d.paid && !d.is107k);

  const SUBS = [
    { id: "milestones", l: "Milestones" },
    { id: "roadmap", l: "Jan 2028" },
    { id: "tools", l: "Tools" },
    { id: "settings", l: "Settings" }
  ];

  return (
    <div style={{ paddingBottom: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.text, padding: "20px 20px 8px" }}>
        Freedom
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto" }}>
        {SUBS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSub(s.id)}
            style={{
              background: sub === s.id ? "#22c55e" : C.card,
              color: sub === s.id ? "#0f172a" : C.muted,
              border: "1px solid " + (sub === s.id ? "#22c55e" : C.border),
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {s.l}
          </button>
        ))}
      </div>

      {/* MILESTONES TAB */}
      {sub === "milestones" && (
        <>
          <div style={{ display: "flex", gap: 8, padding: "0 16px 12px" }}>
            <MiniStat C={C} label="Freedom Day" value={freedomDays + " days"} color="#22c55e" />
            <MiniStat
              C={C}
              label="Disc 2 Promo"
              value={promoDays + " days"}
              color={promoDays < 90 ? "#ef4444" : "#f59e0b"}
            />
          </div>
          <Card C={C}>
            {[
              { name: "Capital One", date: "Jun 2026", freed: 40, done: true, note: "Day 1 win with lump sum!" },
              { name: "SoFi Loan", date: "Sep 2026", freed: 1283.78, done: false, note: "Snowball nearly doubles overnight" },
              { name: "Discover 2", date: "Jul 2027", freed: 403, done: false, note: "Beat the promo -- saved thousands" },
              { name: "Car Note 2", date: "Aug 2027", freed: 395.16, done: false, note: "8.75% gone -- momentum is real" },
              { name: "Car Note 1", date: "Nov 2027", freed: 419.31, done: false, note: "One consumer debt left" },
              { name: "Discover 1", date: "Dec 2027", freed: 240, done: false, note: "ALL CONSUMER DEBT GONE!" }
            ].map((ms, i, arr) => (
              <div key={ms.name} style={{ display: "flex", gap: 12, opacity: ms.done ? 0.65 : 1, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      border: "2px solid " + (ms.done ? "#22c55e" : "#475569"),
                      background: ms.done ? "#22c55e" : "#334155",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: ms.done ? "#0f172a" : "#94a3b8",
                      fontSize: 14
                    }}
                  >
                    {ms.done ? "✓" : "○"}
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        background: ms.done ? "#22c55e" : "#1e293b",
                        minHeight: 16
                      }}
                    />
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: ms.done ? "#22c55e" : C.text }}>
                      {ms.name}
                    </span>
                    <span style={{ fontSize: 12, color: C.muted }}>{ms.date}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 600, marginTop: 2 }}>
                    +{fmt(ms.freed)}/mo freed
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2, fontStyle: "italic" }}>
                    {ms.note}
                  </div>
                </div>
              </div>
            ))}
          </Card>
          <SectionTitle C={C}>CRITICAL REMINDERS</SectionTitle>
          {[
            "Discover 2 MUST be paid $403/mo -- $212 minimum leaves $5k exposed to 27% interest",
            "Keep $1,000-$2,000 emergency buffer untouched at all times",
            "Bonuses/refunds: 80% to current snowball target, 20% buffer",
            "After Dec 2027: build 6-month emergency fund BEFORE investing",
            "107k note continues after Dec 2027 -- P&I of $2,600/mo until Jun 2031"
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                margin: "4px 16px",
                background: C.card,
                borderRadius: 12,
                padding: "12px 14px",
                borderLeft: "3px solid #f59e0b"
              }}
            >
              <span style={{ fontSize: 13, color: "#f59e0b", flexShrink: 0 }}>[!]</span>
              <span style={{ fontSize: 13, color: C.sub, lineHeight: 1.4 }}>{r}</span>
            </div>
          ))}
        </>
      )}

      {/* ROADMAP TAB */}
      {sub === "roadmap" && (
        <>
          <Card C={C} style={{ borderColor: "#22c55e", borderWidth: 2 }}>
            <div
              style={{
                textAlign: "center",
                paddingBottom: 12,
                borderBottom: "1px solid " + C.border,
                marginBottom: 14
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: 2, marginBottom: 4 }}>
                MONTHLY CASH FREED AFTER DEC 2027
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#22c55e", lineHeight: 1 }}>$2,781</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                minimum payments freed - $3,586 incl. snowball extra
              </div>
            </div>
            {[
              {
                ph: "Phase 1",
                goal: "6-Month Emergency Fund",
                mo2: 1500,
                target: "$22,000",
                pri: "Critical",
                note: "Build before investing"
              },
              {
                ph: "Phase 2",
                goal: "107k Note Extra Principal",
                mo2: 850,
                target: "$107,000",
                pri: "High",
                note: "7.75% -- extra principal saves thousands"
              },
              {
                ph: "Phase 3",
                goal: "Retirement (IRA)",
                mo2: 583,
                target: "$7k/yr",
                pri: "Important",
                note: "Max IRA = $7,000/yr"
              },
              {
                ph: "Phase 4",
                goal: "Investing / Wealth",
                mo2: 817,
                target: "Ongoing",
                pri: "Build Wealth",
                note: "Index funds, long-term"
              }
            ].map(({ ph, goal, mo2, target, pri, note }) => (
              <div
                key={ph}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid " + C.border
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1 }}>
                    {ph} - {pri}
                  </div>
                  <div style={{ fontSize: 14, color: C.text, fontWeight: 600, marginTop: 1 }}>{goal}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 1, fontStyle: "italic" }}>{note}</div>
                </div>
                <div style={{ textAlign: "right", marginLeft: 10 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#22c55e" }}>{fmt(mo2)}/mo</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Target: {target}</div>
                </div>
              </div>
            ))}
            <Row style={{ paddingTop: 10, marginTop: 4, borderTop: "1px solid " + C.border }}>
              <span style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>Total deployed</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>{fmt(1500 + 850 + 583 + 817)}/mo</span>
            </Row>
          </Card>

          <SectionTitle C={C}>BIWEEKLY PAYMENT HACK</SectionTitle>
          <Card C={C}>
            <div
              style={{
                textAlign: "center",
                paddingBottom: 10,
                borderBottom: "1px solid " + C.border,
                marginBottom: 10
              }}
            >
              <div style={{ fontSize: 52, fontWeight: 900, color: "#22c55e", lineHeight: 1 }}>1</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
                extra payment per year per debt -- free
              </div>
            </div>
            <div style={{
              fontSize: 13,
              color: C.muted,
              marginBottom: 12,
              lineHeight: 1.5,
              fontStyle: "italic"
            }}>
              Pay half your monthly amount every 2 weeks. 26 biweekly periods = 13 payments vs 12. No budget change.
            </div>
            {[
              { name: "SoFi Loan", mo2: 1283.78, rate: "12.6%", impact: "~1 month faster" },
              { name: "107k Note", mo2: 2600, rate: "7.75%", impact: "High long-term value" },
              { name: "Car Note 2", mo2: 395.16, rate: "8.75%", impact: "~2-3 weeks faster" }
            ].map((b) => (
              <div
                key={b.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid " + C.border
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                    {b.rate} - {b.impact}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: C.muted }}>{fmt(b.mo2)}/mo</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>{fmt(b.mo2 / 2)} per 2wk</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 8, fontStyle: "italic" }}>
              Always confirm extra payments go to principal, not next month's payment.
            </div>
          </Card>
        </>
      )}

      {/* TOOLS TAB */}
      {sub === "tools" && (
        <>
          <SectionTitle C={C}>WINDFALL PLANNER</SectionTitle>
          <Card C={C}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>
              Enter a bonus, tax refund, or gift
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: C.muted }}>$</span>
              <input
                style={{
                  flex: 1,
                  background: C.bg,
                  border: "1px solid " + C.border,
                  color: C.text,
                  fontSize: 16,
                  padding: "8px 10px",
                  borderRadius: 10,
                  outline: "none"
                }}
                type="number"
                placeholder="0"
                value={wf}
                onChange={(e) => setWf(e.target.value)}
              />
            </div>
            {wfN > 0 && (
              <>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Apply to which debt?</div>
                <select
                  style={{
                    background: C.bg,
                    border: "1px solid " + C.border,
                    color: C.text,
                    fontSize: 15,
                    padding: "8px 10px",
                    borderRadius: 10,
                    width: "100%",
                    outline: "none",
                    marginBottom: 12
                  }}
                  value={wfTarget}
                  onChange={(e) => setWfTarget(e.target.value)}
                >
                  {activeDebts.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
                {[[
                  "80% to " + wfTarget,
                  (wfN * 0.8).toFixed(0),
                  "#22c55e"
                ], [
                  "10% to Emergency Buffer",
                  (wfN * 0.1).toFixed(0),
                  "#3b82f6"
                ], [
                  "10% to You (guilt-free!)",
                  (wfN * 0.1).toFixed(0),
                  "#f59e0b"
                ]].map(([l, v, c]) => (
                  <Row key={l} style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: 14, color: C.sub }}>{l}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: c }}>{fmt(v)}</span>
                  </Row>
                ))}
                <Row style={{ padding: "8px 0 0", borderTop: "1px solid " + C.border, marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Impact</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>
                    ~{((wfN * 0.8) / 2918).toFixed(1)} months faster
                  </span>
                </Row>
              </>
            )}
          </Card>

          <SectionTitle C={C}>WHAT-IF SCENARIOS</SectionTitle>
          <Card C={C}>
            {[
              {
                l: "Monthly income change",
                v: wiInc,
                set: setWiInc,
                min: -2000,
                max: 3000,
                c: wiInc >= 0 ? "#22c55e" : "#ef4444",
                prefix: wiInc >= 0 ? "+" : ""
              },
              { l: "Extra monthly expense", v: wiExp, set: setWiExp, min: 0, max: 1000, c: "#ef4444", prefix: "+" },
              {
                l: "Extra to snowball/mo",
                v: wiExtra,
                set: setWiExtra,
                min: 0,
                max: 2000,
                c: "#22c55e",
                prefix: "+"
              },
              {
                l: "One-time windfall",
                v: wiWind,
                set: setWiWind,
                min: 0,
                max: 10000,
                c: "#22c55e",
                prefix: ""
              }
            ].map(({ l, v, set, min, max, c, prefix }) => (
              <div key={l} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{l}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={50}
                    value={v}
                    onChange={(e) => set(parseInt(e.target.value))}
                    style={{ flex: 1, accentColor: "#22c55e" }}
                  />
                  <span style={{ fontSize: 14, fontWeight: 700, color: c, minWidth: 70, textAlign: "right" }}>
                    {prefix}{fmt(v)}
                  </span>
                </div>
              </div>
            ))}
            <div style={{ background: C.bg, borderRadius: 10, padding: 12, marginTop: 4 }}>
              <Row style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.muted }}>Adjusted Snowball</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{fmt(Math.max(0, adj))}/mo</span>
              </Row>
              <Row style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.muted }}>vs Baseline</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: adj >= base ? "#22c55e" : "#ef4444" }}>
                  {adj >= base ? "+" : ""}{fmt(adj - base)}
                </span>
              </Row>
              <Row style={{ paddingTop: 8, borderTop: "1px solid " + C.border }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>Plan Impact</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: faster ? "#22c55e" : "#ef4444" }}>
                  {faster
                    ? Math.abs(impact).toFixed(1) + " mo FASTER"
                    : impact === 0
                      ? "No change"
                      : impact.toFixed(1) + " mo SLOWER"}
                </span>
              </Row>
            </div>
          </Card>
        </>
      )}

      {/* SETTINGS TAB */}
      {sub === "settings" && (
        <>
          <Card C={C}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>App Settings</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>All data saved locally on your device.</div>
            {[[
              "App Version",
              "Debt Freedom v3.0"
            ], [
              "Plan Target",
              "Dec 2027"
            ], [
              "Total Starting Debt",
              "$174,254"
            ], [
              "Consumer Debt (excl. 107k)",
              "$67,254"
            ], [
              "107k Note",
              "$107,000 at 7.75%"
            ]].map(([l, v]) => (
              <Row key={l} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid " + C.border }}>
                <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 13, color: C.sub }}>{v}</span>
              </Row>
            ))}
            {!resetConfirm ? (
              <button
                onClick={() => setResetConfirm(true)}
                style={{
                  background: "#7f1d1d",
                  border: "none",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: 10,
                  borderRadius: 12,
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: 8
                }}
              >
                Reset All Data to Defaults
              </button>
            ) : (
              <div style={{ background: "#450a0a", borderRadius: 12, padding: 14 }}>
                <div style={{ color: "#fca5a5", fontWeight: 700, marginBottom: 10, fontSize: 13 }}>
                  This will erase ALL your data -- check-ins, balances, edits -- and cannot be undone.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={doReset}
                    style={{
                      flex: 1,
                      background: "#ef4444",
                      border: "none",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      padding: 10,
                      borderRadius: 10,
                      cursor: "pointer"
                    }}
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setResetConfirm(false)}
                    style={{
                      flex: 1,
                      background: "#374151",
                      border: "none",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      padding: 10,
                      borderRadius: 10,
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Card>

          <Card C={C}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              Add to iPhone Home Screen
            </div>
            {["1. Open this app in Safari (not Chrome)",
              "2. Tap the Share button at the bottom",
              "3. Scroll down and tap Add to Home Screen",
              "4. Name it Debt Freedom and tap Add",
              "5. It appears on your home screen!"].map((step, i) => (
              <div key={i} style={{ fontSize: 13, color: C.sub, marginBottom: 8, paddingLeft: 4 }}>
                {step}
              </div>
            ))}
            <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontStyle: "italic" }}>
              Tip: Host on Vercel, Netlify, or GitHub Pages for mobile access.
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default FreedomTab;
