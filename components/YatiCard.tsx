"use client";

import { useState } from "react";

export interface Yati {
  n: number;
  kp: string;
  stem: string;
  ops: string[];
  ans: number;
  why: string;
  src: string;
}

const LETTERS = ["A", "B", "C", "D", "E"];

/* 新政押题卡：与 QuestionCard 同构——先选，选完才判色（对绿/错红）并给出解析与依据 */
export default function YatiCard({ q }: { q: Yati }) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;

  return (
    <div className="qcard" style={{ margin: "14px 0" }}>
      <div className="qmeta">
        <span className="qpill">押题 {q.n}</span>
        <span className="qsrc">{q.kp}</span>
      </div>
      <div className="qstem">{q.stem}</div>
      <div className="qops">
        {q.ops.map((op, i) => {
          let cls = "qop";
          if (done && i === q.ans) cls += " right";
          else if (done && i === picked) cls += " wrong";
          return (
            <button key={i} className={cls} disabled={done} onClick={() => setPicked(i)}>
              <span className="ltr">{LETTERS[i]}</span>
              <span>{op}</span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className="qwhy">
          <b>{picked === q.ans ? "答对了！" : `正确答案是 ${LETTERS[q.ans]}。`}</b> {q.why}
          <span className="more">依据：{q.src}</span>
        </div>
      )}
    </div>
  );
}
