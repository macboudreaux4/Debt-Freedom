/**
 * CheckinTab Component
 * Log monthly actuals (income, spending, buffer usage)
 */

import React, { useState, useEffect } from 'react';
import { MONTHS } from '../../constants';
import { fmt, pct } from '../../utils';
import Card from '../Card';
import Row from '../Row';
import SectionTitle from '../SectionTitle';

function CheckinTab({
  C,
  mo,
  setMo,
  checkins,
  setCheckins,
  income,
  totalHH,
  p107,
  buffer,
  setBuffer,
  debts,
  celebrate
}) {
  const existing = checkins[mo] || {};
  const [incomeIn, setIncomeIn] = useState(String(existing.income || ""));
  const [spendIn, setSpendIn] = useState(String(existing.spending || ""));
  const [bufIn, setBufIn] = useState(String(existing.bufferUsed || ""));
  const [notes, setNotes] = useState(existing.notes || "");
  const [saved, setSaved] = useState(false);
  const m = MONTHS[mo - 1];

  useEffect(() => {
    const e = checkins[mo] || {};
    setIncomeIn(String(e.income || ""));
    setSpendIn(String(e.spending || ""));
    setBufIn(String(e.bufferUsed || ""));
    setNotes(e.notes || "");
    setSaved(false);
  }, [mo]);

  const incN = parseFloat(incomeIn) || 0;
  const spN = parseFloat(spendIn) || 0;
  const bufN = parseFloat(bufIn) || 0;
  const left = incN - spN;
  const minDebts = debts
    .filter((d) => !d.paid && !d.is107k)
    .reduce((s, d) => s + d.min, 0);
  const actualSnow = Math.max(0, left - p107 - minDebts);
  const completedCount = Object.keys(checkins).length;

  const doSave = () => {
    setCheckins({
      ...checkins,
      [mo]: { income: incN, spending: spN, bufferUsed: bufN, notes, savedAt: new Date().toISOString() }
    });
    if (bufN > 0) setBuffer(Math.max(0, buffer - bufN));
    setSaved(true);
    if (m.note.includes("PAID") || m.note.includes("FREE")) celebrate();
  };

  return (
    <div style={{ paddingBottom: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.text, padding: "20px 20px 4px" }}>
        Monthly Check-In
      </div>
      <div style={{ fontSize: 13, color: C.muted, padding: "0 20px 12px" }}>
        Log what actually happened this month
      </div>

      {/* Month Selector */}
      <Card C={C}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 10 }}>
          Select Month
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8 }}>
          <button
            onClick={() => setMo(Math.max(1, mo - 1))}
            style={{
              background: C.bg,
              border: "1px solid " + C.border,
              color: C.text,
              width: 36,
              height: 36,
              borderRadius: 18,
              cursor: "pointer",
              fontSize: 18
            }}
          >
            &lt;
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{m.p}</div>
            <div style={{ fontSize: 11, color: checkins[mo] ? "#22c55e" : C.muted }}>
              {checkins[mo] ? "Logged" : "Not logged"}
            </div>
          </div>
          <button
            onClick={() => setMo(Math.min(19, mo + 1))}
            style={{
              background: C.bg,
              border: "1px solid " + C.border,
              color: C.text,
              width: 36,
              height: 36,
              borderRadius: 18,
              cursor: "pointer",
              fontSize: 18
            }}
          >
            &gt;
          </button>
        </div>
        <div style={{ fontSize: 11, textAlign: "center", color: C.muted, marginBottom: 6 }}>
          {completedCount} of 19 months logged
        </div>
        <div style={{ height: 4, background: C.bg, borderRadius: 2 }}>
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: "#22c55e",
              width: pct(completedCount, 19) + "%"
            }}
          />
        </div>
      </Card>

      {/* Data Entry */}
      <Card C={C}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
          What Actually Happened
        </div>

        {[
          {
            label: "Actual income received",
            val: incomeIn,
            set: setIncomeIn,
            hint: String(income),
            diff: incN > 0 ? incN - income : null,
            pos: true
          },
          {
            label: "Total household spending",
            val: spendIn,
            set: setSpendIn,
            hint: String(totalHH),
            diff: spN > 0 ? spN - totalHH : null,
            pos: false
          },
          { label: "Emergency buffer used", val: bufIn, set: setBufIn, hint: "0", diff: null, pos: true }
        ].map(({ label, val, set, hint, diff, pos }) => (
          <div key={label} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{label}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
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
                placeholder={hint}
                value={val}
                onChange={(e) => set(e.target.value)}
              />
              {diff !== null && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    minWidth: 60,
                    textAlign: "right",
                    color: (pos ? diff >= 0 : diff <= 0) ? "#22c55e" : "#ef4444"
                  }}
                >
                  {diff >= 0 ? "+" : ""}{fmt(diff)}
                </span>
              )}
            </div>
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Notes / what came up</div>
          <textarea
            style={{
              width: "100%",
              background: C.bg,
              border: "1px solid " + C.border,
              color: C.text,
              fontSize: 13,
              padding: 10,
              borderRadius: 10,
              outline: "none",
              resize: "none",
              height: 60,
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {(incN > 0 || spN > 0) && (
          <div style={{ background: C.bg, borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <Row style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.muted }}>Left after spending</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: left >= 0 ? "#22c55e" : "#ef4444"
                }}
              >
                {fmt(left)}
              </span>
            </Row>
            <Row style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.muted }}>107k + debt payments</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{fmt(p107 + minDebts)}</span>
            </Row>
            <Row style={{ paddingTop: 8, borderTop: "1px solid " + C.border }}>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>Snowball available</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#22c55e" }}>{fmt(actualSnow)}</span>
            </Row>
          </div>
        )}

        <button
          onClick={doSave}
          style={{
            background: saved ? "#166534" : "#15803d",
            border: "none",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            padding: 12,
            borderRadius: 12,
            cursor: "pointer",
            width: "100%"
          }}
        >
          {saved ? "Saved!" : "Save This Month's Check-In"}
        </button>
      </Card>

      {/* Check-In History */}
      {Object.keys(checkins).length > 0 && (
        <>
          <SectionTitle C={C}>CHECK-IN HISTORY</SectionTitle>
          {Object.entries(checkins)
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
            .map(([m2, ci]) => (
              <Card key={m2} C={C} style={{ padding: "12px 14px" }}>
                <Row style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                    {MONTHS[parseInt(m2) - 1]?.p}
                  </span>
                  <span style={{ fontSize: 11, color: C.muted }}>
                    {ci.savedAt ? new Date(ci.savedAt).toLocaleDateString() : ""}
                  </span>
                </Row>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: C.muted }}>Income</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>
                      {fmt(ci.income || 0)}
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: C.muted }}>Spent</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b" }}>
                      {fmt(ci.spending || 0)}
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: C.muted }}>Left</div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: (ci.income || 0) >= (ci.spending || 0) ? "#22c55e" : "#ef4444"
                      }}
                    >
                      {fmt((ci.income || 0) - (ci.spending || 0))}
                    </div>
                  </div>
                </div>
                {ci.notes && (
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 6, fontStyle: "italic" }}>
                    {ci.notes}
                  </div>
                )}
              </Card>
            ))}
        </>
      )}
    </div>
  );
}

export default CheckinTab;
