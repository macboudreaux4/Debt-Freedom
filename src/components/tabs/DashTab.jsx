/**
 * DashTab Component
 * Overview tab showing countdown, debts, and check-in status
 */

import React, { useState, useEffect } from 'react';
import { MONTHS, PROJECTED } from '../../constants';
import { fmt, daysTo, pct } from '../../utils';
import Card from '../Card';
import Row from '../Row';
import MiniStat from '../MiniStat';
import SectionTitle from '../SectionTitle';
import DebtCard from '../DebtCard';

function DashTab({
  C,
  mo,
  setMo,
  debts,
  markPaid,
  actBal,
  setActBal,
  buffer,
  setBuffer,
  checkins,
  snowball,
  freedomDays,
  promoDays,
  totalConsumer,
  total107,
  income
}) {
  const [showBal, setShowBal] = useState(false);
  const [balIn, setBalIn] = useState("");
  const [showBuf, setShowBuf] = useState(false);
  const [bufIn, setBufIn] = useState(String(buffer));

  useEffect(() => {
    if (!showBuf) setBufIn(String(buffer));
  }, [buffer, showBuf]);

  const m = MONTHS[mo - 1];
  const proj = PROJECTED[mo - 1];
  const actual = actBal[mo];
  const ci = checkins[mo];

  return (
    <div style={{ paddingBottom: 8 }}>
      {/* Countdown Header */}
      <div style={{
        background: C.card,
        padding: "20px 20px 16px",
        borderBottom: "1px solid " + C.border
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#22c55e",
          letterSpacing: 3,
          marginBottom: 4
        }}>
          CONSUMER DEBT FREE IN
        </div>
        <div style={{
          fontSize: 60,
          fontWeight: 900,
          color: C.text,
          lineHeight: 1,
          letterSpacing: -2
        }}>
          {freedomDays}
        </div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>
          days - December 2027
        </div>

        {/* Progress Bar */}
        <div style={{
          height: 6,
          background: C.bg,
          borderRadius: 3,
          marginBottom: 6,
          position: "relative"
        }}>
          <div
            style={{
              height: "100%",
              width: ((mo / 19) * 100) + "%",
              background: "linear-gradient(90deg,#22c55e,#16a34a)",
              borderRadius: 3,
              transition: "width 0.4s"
            }}
          />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: C.muted,
          marginBottom: 14
        }}>
          <span>Jun 2026</span>
          <span style={{ fontWeight: 700, color: C.sub }}>Month {mo} of 19</span>
          <span>Dec 2027</span>
        </div>

        {/* Month Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <button
            onClick={() => setMo(Math.max(1, mo - 1))}
            style={{
              background: C.bg,
              border: "1px solid " + C.border,
              color: C.text,
              width: 38,
              height: 38,
              borderRadius: 19,
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            &lt;
          </button>
          <span style={{
            fontSize: 17,
            fontWeight: 700,
            color: C.text,
            minWidth: 90,
            textAlign: "center"
          }}>
            {m.p}
          </span>
          <button
            onClick={() => setMo(Math.min(19, mo + 1))}
            style={{
              background: C.bg,
              border: "1px solid " + C.border,
              color: C.text,
              width: 38,
              height: 38,
              borderRadius: 19,
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Mini Stats */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px 4px" }}>
        <MiniStat C={C} label="Consumer Debt" value={fmt(totalConsumer)} color="#3b82f6" />
        <MiniStat C={C} label="107k Note" value={fmt(total107)} color="#f97316" />
        <MiniStat C={C} label="Snowball" value={fmt(Math.max(0, snowball))} color="#22c55e" />
      </div>

      {/* Promo Alert */}
      {promoDays < 180 && (
        <div style={{
          margin: "4px 16px",
          background: C.card,
          borderRadius: 12,
          padding: "10px 14px",
          borderLeft: "3px solid #ef4444"
        }}>
          <span style={{ fontSize: 13, color: C.sub }}>
            ALERT: Discover 2 promo ends in{" "}
            <strong style={{ color: "#ef4444" }}>{promoDays} days</strong> -- keep paying $403/mo or
            face 27% interest!
          </span>
        </div>
      )}

      {/* Month Note */}
      {m.note !== "" && (
        <div style={{
          margin: "4px 16px",
          background: C.card,
          borderRadius: 12,
          padding: "10px 14px",
          borderLeft: "3px solid #22c55e"
        }}>
          <span style={{ fontSize: 13, color: C.sub }}>{m.note}</span>
        </div>
      )}

      {/* Actual Balance Card */}
      <Card C={C}>
        <Row style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Actual Balance</span>
          <button
            onClick={() => setShowBal(!showBal)}
            style={{
              background: "none",
              border: "1px solid #22c55e",
              color: "#22c55e",
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 16,
              cursor: "pointer"
            }}
          >
            {showBal ? "Cancel" : "Edit"}
          </button>
        </Row>
        {showBal ? (
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: C.muted, fontSize: 18, fontWeight: 700, alignSelf: "center" }}>$</span>
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
              placeholder="Total all debts"
              value={balIn}
              onChange={(e) => setBalIn(e.target.value)}
            />
            <button
              onClick={() => {
                setActBal({ ...actBal, [mo]: parseFloat(balIn) });
                setShowBal(false);
                setBalIn("");
              }}
              style={{
                background: "#22c55e",
                border: "none",
                color: "#0f172a",
                fontWeight: 700,
                padding: "8px 14px",
                borderRadius: 10,
                cursor: "pointer"
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            {[["Projected", fmt(proj), "#3b82f6"], [" ", " ", " "],
            [actual ? "Actual" : "Actual", actual ? fmt(actual) : "--", actual ? (actual <= proj ? "#22c55e" : "#ef4444") : C.muted],
            ["Status", actual ? (actual <= proj ? "OK" : "Over") : "--", actual ? (actual <= proj ? "#22c55e" : "#ef4444") : C.muted]].map(
              ([label, val, color], i) =>
                i === 1 ? (
                  <div
                    key={i}
                    style={{
                      width: 1,
                      height: 32,
                      background: C.border,
                      margin: "0 8px"
                    }}
                  />
                ) : (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: color }}>{val}</div>
                  </div>
                )
            )}
          </div>
        )}
      </Card>

      {/* Emergency Buffer Card */}
      <Card C={C}>
        <Row style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Emergency Buffer</span>
          <button
            onClick={() => setShowBuf(!showBuf)}
            style={{
              background: "none",
              border: "1px solid #22c55e",
              color: "#22c55e",
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 16,
              cursor: "pointer"
            }}
          >
            {showBuf ? "Cancel" : "Edit"}
          </button>
        </Row>
        {showBuf ? (
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: C.muted, fontSize: 18, fontWeight: 700, alignSelf: "center" }}>$</span>
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
              value={bufIn}
              onChange={(e) => setBufIn(e.target.value)}
            />
            <button
              onClick={() => {
                setBuffer(parseFloat(bufIn) || 0);
                setShowBuf(false);
              }}
              style={{
                background: "#22c55e",
                border: "none",
                color: "#0f172a",
                fontWeight: 700,
                padding: "8px 14px",
                borderRadius: 10,
                cursor: "pointer"
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            {[["Current", fmt(buffer), buffer >= 1000 ? "#22c55e" : "#ef4444"], ["", "", ""],
            ["Target", "$1,500", C.sub], ["", "", ""],
            ["Status", buffer >= 1500 ? "Good" : buffer >= 1000 ? "Low" : "CRITICAL", buffer >= 1500 ? "#22c55e" : buffer >= 1000 ? "#f59e0b" : "#ef4444"]].map(
              ([l, v, c], i) =>
                i === 1 || i === 3 ? (
                  <div
                    key={i}
                    style={{
                      width: 1,
                      height: 32,
                      background: C.border,
                      margin: "0 4px"
                    }}
                  />
                ) : (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: c }}>{v}</div>
                  </div>
                )
            )}
          </div>
        )}
      </Card>

      {/* Check-In Summary */}
      {ci && (
        <Card C={C} style={{ borderColor: "#22c55e", borderWidth: 2 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>
            Month {mo} Check-In Logged
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.muted }}>Income</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#22c55e" }}>{fmt(ci.income || 0)}</div>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.muted }}>Spent</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f59e0b" }}>{fmt(ci.spending || 0)}</div>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.muted }}>Left</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: (ci.income || 0) >= (ci.spending || 0) ? "#22c55e" : "#ef4444"
                }}
              >
                {fmt((ci.income || 0) - (ci.spending || 0))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* All Debts */}
      <SectionTitle C={C}>ALL DEBTS</SectionTitle>
      {debts.map((d, i) => (
        <DebtCard key={d.name} C={C} d={d} i={i} markPaid={markPaid} mo={mo} />
      ))}
    </div>
  );
}

export default DashTab;
