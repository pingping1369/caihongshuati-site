"use client";

import { useState } from "react";

export interface Sample {
  id: string;
  year: string;
  subj: string;
  stem: string;
  ops: string[];
  ans: number;
  whyExcerpt: string;
  img?: string;
}

const LETTERS = ["A", "B", "C", "D", "E"];

/* 小程序刷题页的网页版同构：圆形字母徽章选项，选后判色（对绿/错红），展开解析节选 */
export default function QuestionCard({ q }: { q: Sample }) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;

  return (
    <div className="qcard">
      <div className="qmeta">
        <span className="qpill">单选</span>
        <span className="qsrc">
          {q.year} 年真题 · {q.subj}
        </span>
      </div>
      <div className="qstem">{q.stem}</div>
      <div className="qops">
        {q.ops.map((op, i) => {
          let cls = "qop";
          if (done && i === q.ans) cls += " right";
          else if (done && i === picked) cls += " wrong";
          return (
            <button
              key={i}
              className={cls}
              disabled={done}
              onClick={() => setPicked(i)}
            >
              <span className="ltr">{LETTERS[i]}</span>
              <span>{op}</span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className="qwhy">
          <b>{picked === q.ans ? "答对了！" : `正确答案是 ${LETTERS[q.ans]}。`}</b>{" "}
          {q.whyExcerpt}
          {q.img && (
            <figure className="qwhy-img">
              <img src={q.img} alt={`${q.year}年真题「${q.stem}」的白板图解解析`} loading="lazy" />
              <figcaption>这道题在小程序里的白板图解</figcaption>
            </figure>
          )}
          <span className="more">
            完整解析和这道题的图解考点，在小程序里——微信搜一搜「彩虹题伴」
          </span>
        </div>
      )}
    </div>
  );
}
