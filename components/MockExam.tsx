"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export interface MockQ {
  n: number;
  subj: string;
  kp: string;
  chapter: string;
  years: number[];
  caseId: string | null;
  background: string | null;
  stem: string;
  ops: string[];
  ans: number;
  why: string;
  diff: "easy" | "medium" | "hard";
}

export interface MockData {
  meta: {
    total: number;
    singles: number;
    cases: number;
    updated: string;
    examDate: string;
    minutes: number;
  };
  questions: MockQ[];
}

const LETTERS = ["A", "B", "C", "D"];
const KEY = "caihong-moni-2026-v1";
const SUBJ_ORDER = ["食物与营养", "个体和群体营养管理", "公共营养和营养教育", "餐饮管理"];

type Saved = { answers: Record<string, number>; idx: number; startedAt: number; finishedAt?: number };

function load(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || typeof s !== "object" || !s.answers) return null;
    return s as Saved;
  } catch {
    return null;
  }
}
function save(s: Saved | null) {
  try {
    if (!s) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* 私密模式或禁用存储时静默 */
  }
}
function fmtMin(ms: number) {
  const m = Math.max(1, Math.round(ms / 60000));
  return m >= 60 ? `${Math.floor(m / 60)} 小时 ${m % 60} 分钟` : `${m} 分钟`;
}
function yearsNote(years: number[]) {
  if (!years.length) return "";
  const last = Math.max(...years);
  return `近九年真题考过 ${years.length} 年，最近一次 ${last} 年`;
}

/* 模拟考：一题一屏、答一题看一题解析、做完出分。进度存 localStorage，刷新可续。 */
export default function MockExam({ data }: { data: MockData }) {
  const qs = data.questions;
  const total = qs.length;
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startedAt, setStartedAt] = useState(0);
  const [finishedAt, setFinishedAt] = useState(0);
  const [saved, setSaved] = useState<Saved | null>(null);

  useEffect(() => {
    setSaved(load());
  }, []);

  useEffect(() => {
    if (phase === "intro") return;
    save({ answers, idx, startedAt, finishedAt: finishedAt || undefined });
  }, [phase, answers, idx, startedAt, finishedAt]);

  useEffect(() => {
    if (phase === "quiz") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [idx, phase]);

  const answeredCount = Object.keys(answers).length;

  function start(resume: boolean) {
    if (resume && saved) {
      setAnswers(saved.answers);
      setIdx(Math.min(saved.idx, total - 1));
      setStartedAt(saved.startedAt || Date.now());
      setFinishedAt(saved.finishedAt || 0);
      setPhase(saved.finishedAt ? "result" : "quiz");
    } else {
      setAnswers({});
      setIdx(0);
      setStartedAt(Date.now());
      setFinishedAt(0);
      setPhase("quiz");
    }
  }
  function restart() {
    save(null);
    setSaved(null);
    start(false);
  }

  /* ── 成绩 ── */
  const result = useMemo(() => {
    const correct = qs.filter((x) => answers[x.n] === x.ans).length;
    const bySubj = SUBJ_ORDER.map((s) => {
      const list = qs.filter((x) => x.subj === s);
      return { subj: s, total: list.length, correct: list.filter((x) => answers[x.n] === x.ans).length };
    }).filter((r) => r.total > 0);
    const wrong = qs.filter((x) => answers[x.n] !== undefined && answers[x.n] !== x.ans);
    const kpMap = new Map<string, MockQ[]>();
    wrong.forEach((x) => {
      const arr = kpMap.get(x.kp) || [];
      arr.push(x);
      kpMap.set(x.kp, arr);
    });
    const weakKps = [...kpMap.entries()].sort((a, b) => b[1].length - a[1].length);
    return { correct, bySubj, wrong, weakKps };
  }, [qs, answers]);

  if (!total) return <div className="card">模拟卷整理中，请稍后再来。</div>;

  /* ── 说明页 ── */
  if (phase === "intro") {
    const canResume = !!saved && Object.keys(saved.answers).length > 0;
    return (
      <div className="card mk-intro">
        <h2>开始前，先看 4 件事</h2>
        <ul>
          <li>
            <strong>{total} 道单项选择题</strong>：前 {data.meta.singles} 题为独立单题，后 {data.meta.cases} 组为案例题（一段背景配 3 道题），与真实考试的结构一致；题量为真实考试（约 200 题、180 分钟）的一半，建议 {data.meta.minutes} 分钟内完成。
          </li>
          <li>
            <strong>答一题，看一题</strong>：点选项即判对错并展开解析，不能改答案；每题标注考点及近九年真题的考查年份。
          </li>
          <li>
            <strong>做完出分</strong>：按百分制给出模拟分，并按四大模块拆分正确率，列出做错的考点方便回头补。
          </li>
          <li>
            <strong>进度自动保存</strong>在本浏览器，中途关掉下次可以接着做。
          </li>
        </ul>
        <div className="mk-actions">
          {canResume && !saved?.finishedAt && (
            <button className="btn" onClick={() => start(true)}>
              继续上次 · 第 {Math.min((saved?.idx ?? 0) + 1, total)} 题
            </button>
          )}
          {canResume && saved?.finishedAt && (
            <button className="btn" onClick={() => start(true)}>
              查看上次成绩
            </button>
          )}
          <button className={canResume ? "btn ghost" : "btn"} onClick={restart}>
            {canResume ? "重新开始" : "开始答题"}
          </button>
        </div>
      </div>
    );
  }

  /* ── 成绩页 ── */
  if (phase === "result") {
    const score = Math.round((result.correct / total) * 100);
    return (
      <div className="mk-result">
        <div className="card mk-score">
          <div className="mk-score-main">
            <span className="mk-score-num num">{score}</span>
            <span className="mk-score-unit">分</span>
          </div>
          <p className="mk-score-sub">
            答对 {result.correct} / {total} 题
            {startedAt && finishedAt ? ` · 用时 ${fmtMin(finishedAt - startedAt)}` : ""}
            。百分制按正确率折算，仅供估计自身水平，不等同于考试合格判定。
          </p>
          <div className="tablewrap">
            <table className="mk-table">
              <thead>
                <tr>
                  <th>模块</th>
                  <th>答对 / 题数</th>
                  <th>正确率</th>
                </tr>
              </thead>
              <tbody>
                {result.bySubj.map((r) => {
                  const pct = Math.round((r.correct / r.total) * 100);
                  return (
                    <tr key={r.subj}>
                      <td>{r.subj}</td>
                      <td className="num">
                        {r.correct} / {r.total}
                      </td>
                      <td>
                        <span className="mk-pct">
                          <i style={{ width: `${pct}%` }} />
                        </span>
                        <span className="num">{pct}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {result.wrong.length > 0 ? (
          <div className="card mk-wrong">
            <h3>做错的 {result.wrong.length} 题，按考点归类</h3>
            <p className="mk-note">
              下面这些考点近九年都反复出现过，考前把它们过一遍最划算。
            </p>
            {result.weakKps.map(([kp, list]) => (
              <details key={kp}>
                <summary>
                  <span>
                    {kp}
                    <em>
                      {list[0].chapter} · 错 {list.length} 题
                    </em>
                  </span>
                </summary>
                {list.map((x) => (
                  <div key={x.n} className="mk-wrong-item">
                    <div className="mk-wrong-stem">
                      <b>第 {x.n} 题</b> {x.stem}
                    </div>
                    <div className="mk-wrong-ans">
                      你选 {LETTERS[answers[x.n]]}，正确答案 {LETTERS[x.ans]}：{x.ops[x.ans]}
                    </div>
                    <div className="mk-wrong-why">{x.why}</div>
                  </div>
                ))}
              </details>
            ))}
          </div>
        ) : (
          <div className="card mk-wrong">
            <h3>全部答对</h3>
            <p className="mk-note">这套卷子没有难住你。考前再把高频考点的细节数值过一遍即可。</p>
          </div>
        )}

        <div className="mk-actions">
          <button className="btn ghost" onClick={restart}>
            重新做一遍
          </button>
          <Link className="btn ghost" href="/guide/kaodian-shuju">
            看高频考点分布 ›
          </Link>
        </div>
      </div>
    );
  }

  /* ── 答题页 ── */
  const q = qs[idx];
  const picked = answers[q.n];
  const done = picked !== undefined;
  const isLast = idx === total - 1;
  const caseNo = q.caseId ? Number(q.caseId.replace(/\D/g, "")) : 0;
  const caseFirst = q.caseId ? qs.findIndex((x) => x.caseId === q.caseId) === idx : false;
  const casePos = q.caseId ? idx - qs.findIndex((x) => x.caseId === q.caseId) + 1 : 0;

  return (
    <div className="mk-quiz">
      <div className="mk-head">
        <span className="mk-count num">
          第 {idx + 1} / {total} 题
        </span>
        <span className="mk-tags">
          <span className="qpill">{q.caseId ? "案例题" : "单题"}</span>
          <span className="qsrc">{q.subj}</span>
        </span>
        <span className="mk-answered num">已答 {answeredCount}</span>
      </div>
      <div className="mk-bar">
        <i style={{ width: `${(answeredCount / total) * 100}%` }} />
      </div>

      <div className="qcard mk-card">
        {q.caseId && q.background && (
          <div className="mk-case">
            <b>
              案例 {caseNo}
              {casePos > 1 ? `（第 ${casePos} 问，背景同前）` : caseFirst ? "（共 3 问）" : ""}
            </b>
            <p>{q.background}</p>
          </div>
        )}
        <div className="qstem">
          <span className="mk-qn num">{idx + 1}.</span> {q.stem}
        </div>
        <div className="qops">
          {q.ops.map((op, i) => {
            let cls = "qop";
            if (done && i === q.ans) cls += " right";
            else if (done && i === picked) cls += " wrong";
            return (
              <button key={i} className={cls} disabled={done} onClick={() => setAnswers((a) => ({ ...a, [q.n]: i }))}>
                <span className="ltr">{LETTERS[i]}</span>
                <span>{op}</span>
              </button>
            );
          })}
        </div>

        {done && (
          <div className="qwhy mk-why">
            <b>{picked === q.ans ? "答对了。" : `答错了，正确答案是 ${LETTERS[q.ans]}。`}</b> {q.why}
            <div className="mk-kp">
              <span className="mk-kp-t">考点：{q.kp}</span>
              <span className="mk-kp-y">
                {q.chapter} · {yearsNote(q.years)}
              </span>
            </div>
          </div>
        )}

        <div className="mk-nav">
          <button className="mk-prev" onClick={() => setIdx(idx - 1)} disabled={idx === 0}>
            ‹ 上一题
          </button>
          {done ? (
            <button
              className="btn"
              onClick={() => {
                if (isLast) {
                  setFinishedAt(Date.now());
                  setPhase("result");
                } else setIdx(idx + 1);
              }}
            >
              {isLast ? "交卷看成绩" : "下一题 ›"}
            </button>
          ) : (
            <span className="mk-hint">选一个选项后展开解析</span>
          )}
        </div>
      </div>
    </div>
  );
}
