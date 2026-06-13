/**
 * BudgetTab Component
 * Edit income, household expenses, and sinking funds
 */

import React, { useState } from 'react';
import { fmt, pct } from '../../utils';
import Card from '../Card';
import Row from '../Row';
import SectionTitle from '../SectionTitle';

function BudgetTab({
  C,
  income,
  setIncome,
  hh,
  setHh,
  sink,
  setSink,
  totalHH,
  p107,
  minOther,
  snowball,
  mo
}) {
  const [edit, setEdit] = useState(false);
  const [incomeIn, setIncomeIn] = useState(String(income));
  const [expandCat, setExpandCat] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newCat, setNewCat] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAmt, setNewAmt] = useState("");
  const [editSink, setEditSink] = useState(null);

  const updateItem = (ci, ii, f, v) =>
    setHh(
      hh.map((c, cx) =>
        cx !== ci
          ? c
          : {
              ...c,
              items: c.items.map((it, ix) =>
                ix !== ii ? it : { ...it, [f]: f === "a" ? parseFloat(v) || 0 : v }
              )
            }
      )
    );

  const removeItem = (ci, ii) =>
    setHh(
      hh.map((c, cx) =>
        cx !== ci ? c : { ...c, items: c.items.filter((_, ix) => ix !== ii) }
      )
    );

  const addItem = (ci) => {
    if (!newName.trim()) return;
    setHh(
      hh.map((c, cx) =>
        cx !== ci
          ? c
          : {
              ...c,
              items: [...c.items, { n: newName.trim(), a: parseFloat(newAmt) || 0 }]
            }
      )
    );
    setNewCat(null);
    setNewName("");
    setNewAmt("");
  };

  const updateSink = (i, f, v) =>
    setSink(
      sink.map((s, si) =>
        si !== i ? s : { ...s, [f]: f === "annual" ? parseFloat(v) || 0 : v }
      )
    );

  const totalSinkMo = sink.reduce((s, f) => s + Math.ceil(f.annual / 12), 0);

  return (
    <div style={{ paddingBottom: 8 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingRight: 16
      }}>
        <div>
          <div style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.text,
            padding: "20px 20px 4px"
          }}>
            Monthly Budget
          </div>
          <div style={{
            fontSize: 13,
            color: C.muted,
            padding: "0 20px 12px"
          }}>
            {fmt(income)} income - {fmt(totalHH)} household
          </div>
        </div>
        <button
          onClick={() => {
            setEdit(!edit);
            if (edit) {
              setIncome(parseFloat(incomeIn) || income);
            }
          }}
          style={{
            marginTop: 20,
            padding: "7px 16px",
            borderRadius: 20,
            border: "1px solid #22c55e",
            background: edit ? "#22c55e" : "transparent",
            color: edit ? "#0f172a" : "#22c55e",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {edit ? "Done" : "Edit"}
        </button>
      </div>

      {edit && (
        <Card C={C}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>
            Monthly Take-Home Income
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.muted }}>$</span>
            <input
              style={{
                flex: 1,
                background: C.bg,
                border: "1px solid " + C.border,
                color: "#22c55e",
                fontSize: 22,
                fontWeight: 800,
                padding: "8px 10px",
                borderRadius: 10,
                outline: "none"
              }}
              type="number"
              value={incomeIn}
              onChange={(e) => setIncomeIn(e.target.value)}
            />
          </div>
        </Card>
      )}

      {/* Budget Breakdown */}
      <Card C={C}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 10 }}>
          Where Your Money Goes
        </div>
        <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ width: Math.max(0, pct(totalHH, income)) + "%", background: "#3b82f6", height: "100%" }} />
          <div style={{ width: Math.max(0, pct(p107, income)) + "%", background: "#f97316", height: "100%" }} />
          <div style={{ width: Math.max(0, pct(minOther, income)) + "%", background: "#ef4444", height: "100%" }} />
          <div style={{ width: Math.max(0, pct(Math.max(0, snowball), income)) + "%", background: "#22c55e", height: "100%" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
          {[["Household", totalHH, "#3b82f6"], ["107k Note", p107, "#f97316"], ["Debt Min", minOther, "#ef4444"], ["Snowball", Math.max(0, snowball), "#22c55e"]].map(
            ([l, v, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: c, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: C.sub, flex: 1 }}>{l}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{fmt(v)}</span>
              </div>
            )
          )}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            textAlign: "center",
            paddingTop: 8,
            borderTop: "1px solid " + C.border,
            color: snowball >= 0 ? "#22c55e" : "#ef4444"
          }}
        >
          {snowball >= 0
            ? fmt(snowball) + " available for snowball"
            : "Over budget by " + fmt(Math.abs(snowball))}
        </div>
      </Card>

      {/* Household Breakdown */}
      <SectionTitle C={C}>HOUSEHOLD BREAKDOWN</SectionTitle>
      {hh.map((cat, ci) => {
        const catTotal = cat.items.reduce((s, it) => s + it.a, 0);
        const isOpen = expandCat === cat.cat;
        return (
          <div
            key={cat.cat}
            style={{
              margin: "4px 16px",
              background: C.card,
              borderRadius: 14,
              padding: 12,
              border: "1px solid " + C.border
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
              onClick={() => setExpandCat(isOpen ? null : cat.cat)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 4, background: C.bg, borderRadius: 2 }}>
                  <div
                    style={{
                      width: Math.min(100, pct(catTotal, totalHH)) + "%",
                      height: "100%",
                      background: "#3b82f6",
                      borderRadius: 2
                    }}
                  />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{cat.cat}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: edit ? "#3b82f6" : C.text }}>
                  {fmt(catTotal)}
                </span>
                <span style={{ fontSize: 11, color: C.muted }}>{pct(catTotal, income)}%</span>
                <span style={{ fontSize: 10, color: C.muted }}>{isOpen ? "^" : "v"}</span>
              </div>
            </div>
            {(isOpen || edit) && (
              <div style={{ borderTop: "1px solid " + C.border, marginTop: 10, paddingTop: 10 }}>
                {cat.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                      color: C.sub,
                      marginBottom: 6
                    }}
                  >
                    {edit && editItem?.ci === ci && editItem?.ii === ii ? (
                      <div style={{ display: "flex", gap: 6, flex: 1, alignItems: "center" }}>
                        <input
                          style={{
                            flex: 2,
                            background: C.bg,
                            border: "1px solid " + C.border,
                            color: C.text,
                            fontSize: 13,
                            padding: "5px 7px",
                            borderRadius: 7,
                            outline: "none"
                          }}
                          value={item.n}
                          onChange={(e) => updateItem(ci, ii, "n", e.target.value)}
                        />
                        <span style={{ color: C.muted }}>$</span>
                        <input
                          style={{
                            flex: 1,
                            background: C.bg,
                            border: "1px solid " + C.border,
                            color: C.text,
                            fontSize: 13,
                            padding: "5px 7px",
                            borderRadius: 7,
                            outline: "none",
                            textAlign: "right"
                          }}
                          type="number"
                          value={item.a}
                          onChange={(e) => updateItem(ci, ii, "a", e.target.value)}
                        />
                        <button
                          onClick={() => setEditItem(null)}
                          style={{
                            background: "#0d2e1a",
                            border: "none",
                            color: "#22c55e",
                            fontSize: 13,
                            padding: "4px 8px",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontWeight: 700
                          }}
                        >
                          ok
                        </button>
                      </div>
                    ) : (
                      <>
                        <span>{item.n}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: C.text }}>{fmt(item.a)}</span>
                          {edit && (
                            <button
                              onClick={() => setEditItem({ ci, ii })}
                              style={{
                                background: "#1e3a5f",
                                border: "none",
                                color: "#3b82f6",
                                fontSize: 11,
                                padding: "2px 6px",
                                borderRadius: 5,
                                cursor: "pointer"
                              }}
                            >
                              edit
                            </button>
                          )}
                          {edit && (
                            <button
                              onClick={() => removeItem(ci, ii)}
                              style={{
                                background: "#3b0f0f",
                                border: "none",
                                color: "#ef4444",
                                fontSize: 11,
                                padding: "2px 6px",
                                borderRadius: 5,
                                cursor: "pointer"
                              }}
                            >
                              del
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {edit &&
                  (newCat === ci ? (
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginTop: 6,
                        paddingTop: 6,
                        borderTop: "1px dashed " + C.border,
                        alignItems: "center"
                      }}
                    >
                      <input
                        style={{
                          flex: 2,
                          background: C.bg,
                          border: "1px solid " + C.border,
                          color: C.text,
                          fontSize: 13,
                          padding: "5px 7px",
                          borderRadius: 7,
                          outline: "none"
                        }}
                        placeholder="Item name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <span style={{ color: C.muted }}>$</span>
                      <input
                        style={{
                          flex: 1,
                          background: C.bg,
                          border: "1px solid " + C.border,
                          color: C.text,
                          fontSize: 13,
                          padding: "5px 7px",
                          borderRadius: 7,
                          outline: "none",
                          textAlign: "right"
                        }}
                        type="number"
                        placeholder="0"
                        value={newAmt}
                        onChange={(e) => setNewAmt(e.target.value)}
                      />
                      <button
                        onClick={() => addItem(ci)}
                        style={{
                          background: "#0d2e1a",
                          border: "none",
                          color: "#22c55e",
                          fontSize: 13,
                          padding: "4px 8px",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontWeight: 700
                        }}
                      >
                        add
                      </button>
                      <button
                        onClick={() => {
                          setNewCat(null);
                          setNewName("");
                          setNewAmt("");
                        }}
                        style={{
                          background: "#3b0f0f",
                          border: "none",
                          color: "#ef4444",
                          fontSize: 13,
                          padding: "4px 8px",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setNewCat(ci);
                        setExpandCat(cat.cat);
                      }}
                      style={{
                        background: "none",
                        border: "1px dashed " + C.border,
                        color: "#22c55e",
                        fontSize: 12,
                        padding: "4px 10px",
                        borderRadius: 8,
                        cursor: "pointer",
                        marginTop: 6
                      }}
                    >
                      + add item
                    </button>
                  ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Sinking Funds */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px 8px 20px"
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.muted }}>
          SINKING FUNDS
        </span>
        {edit && (
          <button
            onClick={() =>
              setSink([...sink, { name: "New Fund", annual: 0, due: "", p: "Y", doNow: false }])
            }
            style={{
              background: "none",
              border: "1px dashed " + C.border,
              color: "#22c55e",
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            + add fund
          </button>
        )}
      </div>
      <Card C={C}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10, fontStyle: "italic" }}>
          Total: {fmt(totalSinkMo)}/mo across {sink.length} funds
        </div>
        {sink.map((sf, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 10,
              marginBottom: 10,
              borderBottom: "1px solid " + C.border
            }}
          >
            {edit && editSink === i ? (
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                  <input
                    style={{
                      flex: 2,
                      background: C.bg,
                      border: "1px solid " + C.border,
                      color: C.text,
                      fontSize: 13,
                      padding: "5px 7px",
                      borderRadius: 7,
                      outline: "none"
                    }}
                    value={sf.name}
                    onChange={(e) => updateSink(i, "name", e.target.value)}
                  />
                  <button
                    onClick={() => setEditSink(null)}
                    style={{
                      background: "#0d2e1a",
                      border: "none",
                      color: "#22c55e",
                      fontSize: 13,
                      padding: "4px 8px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontWeight: 700
                    }}
                  >
                    ok
                  </button>
                  <button
                    onClick={() => {
                      setSink(sink.filter((_, si) => si !== i));
                      setEditSink(null);
                    }}
                    style={{
                      background: "#3b0f0f",
                      border: "none",
                      color: "#ef4444",
                      fontSize: 13,
                      padding: "4px 8px",
                      borderRadius: 6,
                      cursor: "pointer"
                    }}
                  >
                    del
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.muted, minWidth: 55 }}>Annual $</span>
                  <input
                    style={{
                      flex: 1,
                      background: C.bg,
                      border: "1px solid " + C.border,
                      color: C.text,
                      fontSize: 13,
                      padding: "5px 7px",
                      borderRadius: 7,
                      outline: "none",
                      textAlign: "right"
                    }}
                    type="number"
                    value={sf.annual}
                    onChange={(e) => updateSink(i, "annual", e.target.value)}
                  />
                  <span style={{ fontSize: 12, color: C.muted, minWidth: 28 }}>Due</span>
                  <input
                    style={{
                      flex: 1,
                      background: C.bg,
                      border: "1px solid " + C.border,
                      color: C.text,
                      fontSize: 13,
                      padding: "5px 7px",
                      borderRadius: 7,
                      outline: "none"
                    }}
                    value={sf.due}
                    onChange={(e) => updateSink(i, "due", e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <span style={{ fontSize: 14, color: "#64748b", flexShrink: 0 }}>
                  {sf.p === "R" ? "[!]" : sf.p === "O" ? "[~]" : sf.p === "Y" ? "[-]" : "[+]"}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{sf.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>Due: {sf.due || "--"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: C.muted }}>{fmt(sf.annual)}/yr</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: sf.doNow ? "#22c55e" : C.muted
                    }}
                  >
                    {fmt(Math.ceil(sf.annual / 12))}/mo
                  </div>
                </div>
                {edit && (
                  <button
                    onClick={() => setEditSink(i)}
                    style={{
                      background: "#1e3a5f",
                      border: "none",
                      color: "#3b82f6",
                      fontSize: 11,
                      padding: "2px 6px",
                      borderRadius: 5,
                      cursor: "pointer",
                      marginLeft: 8
                    }}
                  >
                    edit
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}

export default BudgetTab;
