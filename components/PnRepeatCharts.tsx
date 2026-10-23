"use client";

import { useState } from "react";

/* 公共营养师重复率页的两张图：逐场「考点见过 / 相似题见过」折线，与「只刷最近 N 场」覆盖柱状图。
   配色：蓝 #1188ff（考点）、橙 #f59e0b（相似题）；两色对白底对比度不足 3:1，靠直接标注 + 页面数据表补足。 */

const INK = "#172445";
const MUTED = "#8a93a8";
const GRID = "#e8edf6";
const BLUE = "#1188ff";
const ORANGE = "#f59e0b";

type Pt = { label: string; kp: number; sim: number; simN: number; n: number };

export function RepeatTrend({ points, label }: { points: Pt[]; label: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 420, H = 230, L = 40, R = 84, T = 14, B = 30;
  const iw = W - L - R, ih = H - T - B;
  const x = (i: number) => L + (iw * i) / (points.length - 1);
  const y = (v: number) => T + ih * (1 - v / 100);
  const path = (k: "kp" | "sim") => points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p[k])}`).join("");
  const last = points.length - 1;
  const h = hover === null ? null : points[hover];
  return (
    <figure style={{ margin: "18px 0 6px", maxWidth: 600 }}>
      <div className="chart-legend" aria-hidden="true">
        <span><i style={{ background: BLUE }} />考点往届考过</span>
        <span><i style={{ background: ORANGE }} />往届有相似题</span>
      </div>
      <div style={{ position: "relative" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", maxWidth: 600, height: "auto", display: "block", overflow: "visible" }}
          role="img"
          aria-label={label}
          onMouseLeave={() => setHover(null)}
        >
          {[0, 25, 50, 75, 100].map((g) => (
            <g key={g}>
              <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={GRID} strokeDasharray={g ? "4 4" : undefined} />
              <text x={L - 8} y={y(g) + 4} fontSize="11" fill={MUTED} textAnchor="end">{g}%</text>
            </g>
          ))}
          {points.map((p, i) =>
            i % 2 === 0 || i === points.length - 1 ? (
              <text key={p.label} x={x(i)} y={H - 10} fontSize="11" fill={MUTED} textAnchor="middle">{p.label}</text>
            ) : null
          )}
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={T + ih} stroke={MUTED} strokeDasharray="3 3" />}
          <path d={path("kp")} fill="none" stroke={BLUE} strokeWidth={2} strokeLinejoin="round" />
          <path d={path("sim")} fill="none" stroke={ORANGE} strokeWidth={2} strokeLinejoin="round" />
          {points.map((p, i) => (
            <g key={"m" + i}>
              <circle cx={x(i)} cy={y(p.kp)} r={hover === i ? 4.5 : 3.5} fill={BLUE} stroke="#fff" strokeWidth={2} />
              <circle cx={x(i)} cy={y(p.sim)} r={hover === i ? 4.5 : 3.5} fill={ORANGE} stroke="#fff" strokeWidth={2} />
            </g>
          ))}
          <text x={x(last) + 10} y={y(points[last].kp) + 4} fontSize="12" fontWeight={600} fill={INK}>考点 {points[last].kp}%</text>
          <text x={x(last) + 10} y={y(points[last].sim) + 4} fontSize="12" fontWeight={600} fill={INK}>相似题 {points[last].sim}%</text>
          {points.map((p, i) => (
            <rect
              key={"h" + i}
              x={x(i) - iw / (points.length - 1) / 2}
              y={T}
              width={iw / (points.length - 1)}
              height={ih}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onTouchStart={() => setHover(i)}
            />
          ))}
        </svg>
        {h && hover !== null && (
          <div
            className="chart-tip"
            style={{ left: `${(x(hover) / W) * 100}%`, transform: hover > points.length / 2 ? "translateX(-105%)" : "translateX(5%)" }}
          >
            <b>{h.label}</b>
            <span><i style={{ background: BLUE }} />考点往届考过 {h.kp}%</span>
            <span><i style={{ background: ORANGE }} />往届有相似题 {h.sim}%（{h.simN}/{h.n} 题）</span>
          </div>
        )}
      </div>
    </figure>
  );
}

export function WindowBars({ rows }: { rows: { label: string; v: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 420, H = 200, L = 40, R = 8, T = 22, B = 30;
  const iw = W - L - R, ih = H - T - B;
  const slot = iw / rows.length, bw = Math.min(44, slot * 0.55);
  const y = (v: number) => T + ih * (1 - v / 100);
  return (
    <figure style={{ margin: "18px 0 6px", maxWidth: 600 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", maxWidth: 600, height: "auto", display: "block", overflow: "visible" }}
        role="img"
        aria-label={"只刷最近 N 场，覆盖下一场题目考点的比例：" + rows.map((r) => `${r.label} ${r.v}%`).join("，")}
        onMouseLeave={() => setHover(null)}
      >
        {[25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={GRID} strokeDasharray="4 4" />
            <text x={L - 8} y={y(g) + 4} fontSize="11" fill={MUTED} textAnchor="end">{g}%</text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke={GRID} />
        {rows.map((r, i) => {
          const cx = L + slot * i + slot / 2, top = y(r.v);
          return (
            <g key={r.label} onMouseEnter={() => setHover(i)} onTouchStart={() => setHover(i)}>
              <rect x={cx - slot / 2} y={T} width={slot} height={ih} fill="transparent" />
              <path
                d={`M${cx - bw / 2},${y(0)} V${top + 4} Q${cx - bw / 2},${top} ${cx - bw / 2 + 4},${top} H${cx + bw / 2 - 4} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + 4} V${y(0)} Z`}
                fill={BLUE}
                opacity={hover === null || hover === i ? 1 : 0.55}
              />
              <text x={cx} y={top - 7} fontSize="12" fontWeight={600} fill={INK} textAnchor="middle">{r.v}%</text>
              <text x={cx} y={H - 10} fontSize="11" fill={MUTED} textAnchor="middle">{r.label}</text>
              <title>{`只刷${r.label}：覆盖下一场 ${r.v}% 题目的考点`}</title>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
