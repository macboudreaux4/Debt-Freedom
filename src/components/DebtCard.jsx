/**
 * DebtCard Component
 * Individual debt card showing balance, rate, and payment details
 */

import React, { useState } from 'react';
import Row from './Row';
import Card from './Card';

function DebtCard({ C, d, i, markPaid, mo }) {
  const [open, setOpen] = useState(false);
  const payment = d.is107k ? (mo <= 6 ? 691.04 : 2600) : d.min;

  // Format currency
  const fmt = (n) => "$" + Math.abs(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const fmtD = (n) => "$" + Math.abs(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div
      style={{
        margin: "4px 16px",
        background: C.card,
        borderRadius: 14,
        padding: 14,
        border: "1px solid " + C.border,
        opacity: d.paid ? 0.6 : 1,
        cursor: "pointer"
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: d.color,
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>
              {d.name}{d.is107k ? " [home]" : ""}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
              {d.paid
                ? "Paid off " + d.payoff
                : "Target: " + d.payoff + (d.promo ? " - Promo " + d.promo : "")}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: d.paid ? "#22c55e" : C.text }}>
            {d.paid ? "PAID" : fmt(d.start)}
          </div>
          <div style={{ fontSize: 10, color: C.muted }}>{open ? "hide" : "details"}</div>
        </div>
      </div>

      {!d.paid && (
        <div style={{ height: 3, background: C.bg, borderRadius: 2, marginTop: 10 }}>
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: d.color,
              width: "5%"
            }}
          />
        </div>
      )}

      {open && (
        <div style={{ borderTop: "1px solid " + C.border, marginTop: 10, paddingTop: 10 }}>
          <Row style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Rate</span>
            <span style={{ fontSize: 13, color: "#f59e0b" }}>{(d.rate * 100).toFixed(2)}%</span>
          </Row>
          <Row style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Payment</span>
            <span style={{ fontSize: 13, color: C.text }}>{fmtD(payment)}/mo</span>
          </Row>
          {d.is107k && (
            <Row style={{ marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: C.muted }}>Phase</span>
              <span style={{ fontSize: 13, color: "#f97316" }}>
                {mo <= 6 ? "Interest Only" : "P&I Full"}
              </span>
            </Row>
          )}
          {d.promo && (
            <Row style={{ marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: C.muted }}>Promo Ends</span>
              <span style={{ fontSize: 13, color: "#ef4444" }}>{d.promo}</span>
            </Row>
          )}
          {!d.paid && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                markPaid(i);
              }}
              style={{
                background: "#15803d",
                border: "none",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                padding: 10,
                borderRadius: 12,
                cursor: "pointer",
                width: "100%",
                marginTop: 8
              }}
            >
              Mark as Paid
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DebtCard;
