"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Question = {
  id: string;
  module: string;
  topic: string;
  trend: string;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
};

type SavedAttempt = {
  version: string;
  answers: number[];
  current: number;
};

const LETTERS = ["A", "B", "C", "D"];
const STORAGE_KEY = "caihong-2026-prediction-b-v1";

function scoreComment(score: number) {
  if (score >= 85) return "高频骨架很稳。下一轮重点复盘错题里的限定条件和计算步骤。";
  if (score >= 70) return "已经形成主干。把失分模块再过一遍，提分会比继续泛刷更快。";
  if (score >= 60) return "基础线已接近。先按模块补齐错题，再重做这套卷。";
  return "先别急着追新题。沿着错题主题补基础，再回来做第二遍。";
}

export default function PredictionExamB({
  questions,
  version,
}: {
  questions: Question[];
  version: string;
}) {
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [current, setCurrent] = useState(0);
  const [screen, setScreen] = useState<"intro" | "exam" | "result">("intro");
  const [hydrated, setHydrated] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedAttempt;
        if (
          saved.version === version &&
          Array.isArray(saved.answers) &&
          saved.answers.length === questions.length
        ) {
          const safeAnswers = saved.answers.map((answer) =>
            Number.isInteger(answer) && answer >= -1 && answer <= 3 ? answer : -1,
          );
          setAnswers(safeAnswers);
          setCurrent(Math.min(Math.max(saved.current || 0, 0), questions.length - 1));
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, [questions.length, version]);

  useEffect(() => {
    if (!hydrated) return;
    const attempt: SavedAttempt = { version, answers, current };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
  }, [answers, current, hydrated, version]);

  const answeredCount = answers.filter((answer) => answer >= 0).length;
  const correctCount = answers.reduce(
    (sum, answer, index) => sum + Number(answer === questions[index].answer),
    0,
  );
  const active = questions[current];
  const activeAnswer = answers[current];
  const isAnswered = activeAnswer >= 0;

  const modules = useMemo(() => {
    const names = Array.from(new Set(questions.map((question) => question.module)));
    return names.map((name) => {
      const indexes = questions
        .map((question, index) => ({ question, index }))
        .filter(({ question }) => question.module === name)
        .map(({ index }) => index);
      const correct = indexes.filter((index) => answers[index] === questions[index].answer).length;
      return { name, total: indexes.length, correct };
    });
  }, [answers, questions]);

  const focusQuestion = () => {
    window.requestAnimationFrame(() => {
      questionHeading.current?.focus({ preventScroll: true });
      questionHeading.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const start = () => {
    if (answeredCount === questions.length) {
      setScreen("result");
      return;
    }
    const firstUnanswered = answers.findIndex((answer) => answer < 0);
    setCurrent(firstUnanswered >= 0 ? firstUnanswered : 0);
    setScreen("exam");
    focusQuestion();
  };

  const choose = (option: number) => {
    if (isAnswered) return;
    setAnswers((previous) => {
      const next = [...previous];
      next[current] = option;
      return next;
    });
  };

  const moveTo = (index: number) => {
    setCurrent(index);
    focusQuestion();
  };

  const next = () => {
    if (!isAnswered) return;
    if (current === questions.length - 1) {
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    moveTo(current + 1);
  };

  const reset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      return;
    }
    const blank = questions.map(() => -1);
    setAnswers(blank);
    setCurrent(0);
    setScreen("intro");
    setResetArmed(false);
    window.localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!hydrated) {
    return <div className="pb-loading">正在取回答题进度…</div>;
  }

  if (screen === "intro") {
    return (
      <section className="pb-intro" aria-labelledby="pb-title">
        <div className="pb-edition" aria-hidden="true">
          <span>PREDICTION PAPER</span>
          <b>B</b>
          <i>2026</i>
        </div>
        <div className="pb-intro-copy">
          <p className="pb-overline">彩虹题伴 · 独立命题</p>
          <h1 id="pb-title">2026 注册营养师<br />预测卷 B</h1>
          <p className="pb-lead">
            依据 2017—2025 年 1,659 道有效真题重新统计，近三年权重最高。100 道单选，选择后立即判题并展开解析。
          </p>
          <div className="pb-rule" />
          <dl className="pb-specs">
            <div><dt>题量</dt><dd>100 题</dd></div>
            <div><dt>计分</dt><dd>每题 1 分</dd></div>
            <div><dt>结构</dt><dd>40 · 39 · 16 · 5</dd></div>
          </dl>
          <ul className="pb-notes">
            <li>答案在每题作答后立即展示，提交后不能改选。</li>
            <li>自动保存在这台设备；关闭页面后仍可继续。</li>
            <li>这是高频考点迁移训练，不是原题泄露，也不承诺命中率。</li>
          </ul>
          <div className="pb-start-row">
            <button className="pb-primary" type="button" onClick={start}>
              {answeredCount > 0
                ? answeredCount === questions.length
                  ? "查看上次成绩"
                  : `继续作答 · 已完成 ${answeredCount} 题`
                : "开始预测卷 B"}
            </button>
            {answeredCount > 0 && (
              <button className="pb-text-button" type="button" onClick={reset}>
                {resetArmed ? "再点一次，清空进度" : "清空上次进度"}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (screen === "result") {
    const wrongIndexes = questions
      .map((_, index) => index)
      .filter((index) => answers[index] !== questions[index].answer);

    return (
      <section className="pb-result" aria-labelledby="pb-result-title">
        <header className="pb-result-head">
          <p className="pb-overline">PREDICTION PAPER B · 成绩单</p>
          <div className="pb-score-lockup">
            <div>
              <span className="pb-score">{correctCount}</span>
              <span className="pb-score-total">/ 100</span>
            </div>
            <div>
              <h1 id="pb-result-title">模拟得分</h1>
              <p>{scoreComment(correctCount)}</p>
            </div>
          </div>
        </header>

        <div className="pb-module-report">
          {modules.map((module) => {
            const percent = Math.round((module.correct / module.total) * 100);
            return (
              <div className="pb-module-row" key={module.name}>
                <div>
                  <b>{module.name}</b>
                  <span>{module.correct} / {module.total}</span>
                </div>
                <div className="pb-module-track" aria-label={`${module.name} 正确率 ${percent}%`}>
                  <i style={{ transform: `scaleX(${percent / 100})` }} />
                </div>
                <strong>{percent}%</strong>
              </div>
            );
          })}
        </div>

        <div className="pb-review">
          <div className="pb-review-title">
            <div>
              <p className="pb-overline">复盘清单</p>
              <h2>{wrongIndexes.length ? `${wrongIndexes.length} 道错题` : "本轮全部答对"}</h2>
            </div>
            <button className="pb-text-button" type="button" onClick={() => setScreen("exam")}>
              返回答题记录
            </button>
          </div>
          {wrongIndexes.length === 0 ? (
            <p className="pb-perfect">漂亮。别背选项顺序，隔几天再做一次，确认知识真的能迁移。</p>
          ) : (
            <div className="pb-wrong-list">
              {wrongIndexes.map((index) => {
                const question = questions[index];
                return (
                  <details key={question.id}>
                    <summary>
                      <span><i>{String(index + 1).padStart(2, "0")}</i>{question.topic}</span>
                      <em>{LETTERS[answers[index]]} → {LETTERS[question.answer]}</em>
                    </summary>
                    <div className="pb-wrong-body">
                      <p>{question.stem}</p>
                      <b>正确答案：{LETTERS[question.answer]}．{question.options[question.answer]}</b>
                      <span>{question.explanation}</span>
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </div>

        <div className="pb-result-actions">
          <button className="pb-primary pb-primary-light" type="button" onClick={reset}>
            {resetArmed ? "确认清空并重新作答" : "重新做这套卷"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-exam" aria-label="2026 注册营养师预测卷 B 答题区">
      <aside className="pb-sheet">
        <p className="pb-overline">答题卡 B</p>
        <div className="pb-sheet-count"><b>{answeredCount}</b><span>/ 100</span></div>
        <div className="pb-dot-grid" aria-label="题目导航">
          {questions.map((question, index) => {
            const answered = answers[index] >= 0;
            const correct = answered && answers[index] === question.answer;
            const reachable = answered || index === current;
            return (
              <button
                key={question.id}
                className={`${index === current ? "is-current" : ""} ${answered ? (correct ? "is-correct" : "is-wrong") : ""}`}
                type="button"
                disabled={!reachable}
                onClick={() => moveTo(index)}
                aria-label={`第${index + 1}题${answered ? (correct ? "，回答正确" : "，回答错误") : "，未作答"}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <p className="pb-sheet-note">蓝圈：当前题<br />绿点：答对 · 红点：答错</p>
      </aside>

      <div className="pb-question-column">
        <div className="pb-progress-line" aria-label={`已完成 ${answeredCount}%`}>
          <i style={{ transform: `scaleX(${answeredCount / questions.length})` }} />
        </div>
        <article className="pb-paper">
          <header className="pb-question-meta">
            <span>{active.module}</span>
            <span>近年命题：{active.trend}</span>
          </header>
          <p className="pb-question-number">QUESTION {String(current + 1).padStart(2, "0")}</p>
          <h2 ref={questionHeading} tabIndex={-1}>{active.stem}</h2>

          <div className="pb-options" role="radiogroup" aria-label={`第 ${current + 1} 题选项`}>
            {active.options.map((option, index) => {
              const isCorrect = isAnswered && index === active.answer;
              const isWrongPick = isAnswered && index === activeAnswer && index !== active.answer;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={activeAnswer === index}
                  disabled={isAnswered}
                  className={`${isCorrect ? "is-correct" : ""} ${isWrongPick ? "is-wrong" : ""}`}
                  onClick={() => choose(index)}
                >
                  <b>{LETTERS[index]}</b>
                  <span>{option}</span>
                  {isCorrect && <i aria-label="正确">✓</i>}
                  {isWrongPick && <i aria-label="错误">×</i>}
                </button>
              );
            })}
          </div>

          <div className={`pb-reveal ${isAnswered ? "is-open" : ""}`} aria-live="polite">
            <div>
              {isAnswered && (
                <section className={activeAnswer === active.answer ? "is-correct" : "is-wrong"}>
                  <div className="pb-verdict">
                    <b>{activeAnswer === active.answer ? "答对了" : "这题答错了"}</b>
                    <span>正确答案 {LETTERS[active.answer]}</span>
                  </div>
                  <h3>解析</h3>
                  <p>{active.explanation}</p>
                  <footer>
                    <span>{active.topic}</span>
                    <span>{active.module}</span>
                  </footer>
                </section>
              )}
            </div>
          </div>
        </article>

        <nav className="pb-question-nav" aria-label="上一题或下一题">
          <button
            className="pb-text-button"
            type="button"
            disabled={current === 0}
            onClick={() => moveTo(current - 1)}
          >
            ← 上一题
          </button>
          <span>{isAnswered ? "解析已展开，读完再继续" : "选择一个答案后立即判题"}</span>
          <button className="pb-primary" type="button" disabled={!isAnswered} onClick={next}>
            {current === questions.length - 1 ? "查看模拟成绩" : "下一题 →"}
          </button>
        </nav>
      </div>
    </section>
  );
}
