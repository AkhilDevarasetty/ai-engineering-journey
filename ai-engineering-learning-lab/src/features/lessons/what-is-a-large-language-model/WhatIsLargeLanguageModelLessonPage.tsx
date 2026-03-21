import { useMemo, useState } from "react";

import {
  lessonSections,
  llmQuizQuestions,
  tokenPlaygroundScenarios,
} from "./llmLessonData";

type WhatIsLargeLanguageModelLessonPageProps = {
  onBack: () => void;
  onOpenNextLesson: () => void;
  backLabel?: string;
};

export function WhatIsLargeLanguageModelLessonPage({
  onBack,
  onOpenNextLesson,
  backLabel = "Back to Dashboard",
}: WhatIsLargeLanguageModelLessonPageProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    tokenPlaygroundScenarios[0].id,
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedCandidateToken, setSelectedCandidateToken] = useState<string>(
    tokenPlaygroundScenarios[0].candidates[2].token,
  );

  const activeScenario =
    tokenPlaygroundScenarios.find((scenario) => scenario.id === selectedScenarioId) ??
    tokenPlaygroundScenarios[0];
  const rankedCandidates = [...activeScenario.candidates].sort(
    (left, right) => right.score - left.score,
  );

  const selectedCandidate =
    activeScenario.candidates.find(
      (candidate) => candidate.token === selectedCandidateToken,
    ) ?? rankedCandidates[0];

  const activeQuizQuestion = llmQuizQuestions[quizIndex];
  const activeSelectedAnswer = selectedAnswers[quizIndex];
  const answerFeedback = useMemo(() => {
    if (activeSelectedAnswer === undefined) return null;

    return {
      tone:
        activeSelectedAnswer === activeQuizQuestion.correctIndex
          ? "correct"
          : "incorrect",
      message: activeQuizQuestion.explanation,
    };
  }, [activeQuizQuestion, activeSelectedAnswer]);

  const topCandidate = rankedCandidates[0];

  const handleScenarioChange = (scenarioId: string) => {
    const nextScenario =
      tokenPlaygroundScenarios.find((scenario) => scenario.id === scenarioId) ??
      tokenPlaygroundScenarios[0];

    const nextRankedCandidates = [...nextScenario.candidates].sort(
      (left, right) => right.score - left.score,
    );

    setSelectedScenarioId(scenarioId);
    setSelectedCandidateToken(nextRankedCandidates[0].token);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedAnswers((current) => ({
      ...current,
      [quizIndex]: optionIndex,
    }));
  };

  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="lesson-shell">
      <aside className="lesson-sidebar">
        <button
          type="button"
          className="back-link"
          onClick={() => {
            window.history.replaceState(null, "", window.location.pathname);
            onBack();
          }}
        >
          ← {backLabel}
        </button>

        <div className="brand-lockup">
          <div className="brand-mark">AI</div>
          <div>
            <p className="brand-title">AI Engineering Learning Lab</p>
            <p className="brand-subtitle">Foundations track</p>
          </div>
        </div>

        <div className="lesson-sidebar-card">
          <p className="sidebar-card-label">Module 1.1</p>
          <h2>What Is a Large Language Model</h2>
          <p>
            This lesson follows the roadmap note directly: language modeling,
            next-token prediction, emergence, model categories, and conceptual
            checks.
          </p>
        </div>

        <nav className="lesson-nav" aria-label="Lesson sections">
          {lessonSections.map((section, index) => (
            <button
              key={section}
              type="button"
              className="lesson-nav-item"
              onClick={() => scrollToSection(index + 1)}
            >
              <span className="lesson-nav-index">{index + 1}</span>
              <span>{section}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="lesson-main">
        <section className="lesson-hero">
          <div className="lesson-badge">
            <span>✦</span>
            <span>Foundations • Module 1.1</span>
          </div>
          <h1>
            What Is a Large <span className="gradient-text">Language Model?</span>
          </h1>
          <p className="lesson-hero-copy">
            A visual walkthrough of the conceptual layer from the roadmap:
            what language modeling means, why next-token prediction matters, and
            how capabilities become visible with scale.
          </p>
        </section>

        <section className="reading-section" id="section-1">
          <article className="lesson-panel lesson-panel-feature lesson-text-panel">
            <p className="eyebrow">What &quot;language modeling&quot; actually means</p>
            <h2>Answers are the behavior. Language modeling is the mechanism.</h2>
            <p>
              An LLM giving answers is the user-facing behavior we see.
              Internally, the model performs language modeling, which means
              predicting the most probable next token based on the previous
              tokens and their context.
            </p>
            <p>
              It does this repeatedly, one token at a time, using patterns
              learned from massive datasets. That repeated token prediction is
              what generates a complete response.
            </p>
            <div className="inline-concept-rail">
              <div className="fact-row">
                <span className="fact-index">1</span>
                <span>Previous tokens + context</span>
              </div>
              <div className="fact-row">
                <span className="fact-index fact-index-secondary">2</span>
                <span>Most probable next token</span>
              </div>
              <div className="fact-row">
                <span className="fact-index fact-index-tertiary">3</span>
                <span>Repeated into a full response</span>
              </div>
            </div>
          </article>
        </section>

        <section className="reading-section" id="section-2">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Tiny Example</p>
            <h2>Language modeling applied to code</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              The roadmap note uses a simple JavaScript example. If the input is
              <code> function add(a, b) {"{"} return</code>, the model assigns high
              probability to continuations like <code>a</code>, <code>a +</code>,
              and <code>a + b</code>.
            </p>
          </div>
          <article className="code-example-card">
            <div className="code-block">
              <p className="visual-label">Input</p>
              <pre>
                <code>{`function add(a, b) {\n  return`}</code>
              </pre>
            </div>
            <div className="code-outcomes">
              <div className="code-column">
                <p className="visual-label">High probability</p>
                <ul className="chip-list">
                  <li>a</li>
                  <li>a +</li>
                  <li>a + b</li>
                </ul>
              </div>
              <div className="code-column">
                <p className="visual-label">Low probability</p>
                <ul className="chip-list chip-list-muted">
                  <li>class</li>
                  <li>while</li>
                  <li>&lt;div&gt;</li>
                </ul>
              </div>
            </div>
            <blockquote className="lesson-quote">
              It gives low probability to unrelated continuations because it
              learned code patterns from training data. That is language
              modeling applied to code.
            </blockquote>
          </article>
        </section>

        <section className="reading-section" id="section-3">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Why Next-Token Prediction Leads to Reasoning-Like Behavior</p>
            <h2>Good prediction requires more than grammar</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              To predict the next token well, the model must learn more than
              grammar. It must also capture patterns in logic, relationships,
              step-by-step explanations, cause and effect, code structure, and
              comparison patterns.
            </p>
            <p>
              Because of that, the model can produce outputs that look like
              reasoning. This does not necessarily mean the model reasons
              exactly like a human. It means reasoning-like behavior can emerge
              from learning structured language patterns at scale.
            </p>
          </div>
          <article className="visual-model-card concept-card-grid">
            <div className="visual-stage">
              <p className="visual-label">Patterns the model learns</p>
              <ul className="concept-bullet-list">
                <li>logic</li>
                <li>relationships</li>
                <li>step-by-step explanations</li>
                <li>cause and effect</li>
                <li>code structure</li>
                <li>comparison patterns</li>
              </ul>
            </div>
            <div className="visual-stage">
              <p className="visual-label">Key idea</p>
              <p className="visual-paragraph">
                Reasoning-like behavior appears because good next-token
                prediction requires learning the hidden structure behind
                language.
              </p>
            </div>
          </article>
        </section>

        <section className="reading-section" id="section-4">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Emergence and Scale Laws</p>
            <h2>Two related ideas, but not the same thing</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              Scale laws mean that as model size, training data, and compute
              increase, performance often improves in a somewhat predictable
              way.
            </p>
          </div>
          <div className="progressive-grid">
            <article className="lesson-panel progressive-card">
              <h3>Scale Laws</h3>
              <ul className="takeaway-list">
                <li>more parameters → more capacity</li>
                <li>more data → more patterns learned</li>
                <li>more compute → better optimization</li>
              </ul>
            </article>
            <article className="lesson-panel progressive-card">
              <h3>Emergence</h3>
              <p>
                Emergence means some capabilities become clearly visible only
                after the model reaches enough scale. This is not magic. It
                usually means the model now has enough capacity to represent and
                combine patterns that were too weak in smaller versions.
              </p>
            </article>
          </div>
          <blockquote className="lesson-quote lesson-quote-wide">
            Scale laws describe gradual improvement. Emergence describes
            abilities becoming noticeably usable at higher scale.
          </blockquote>
        </section>

        <section className="reading-section" id="section-5">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Model Types</p>
            <h2>Foundation vs task-specific, generative vs representation</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              A foundation model is broad and adaptable. A task-specific model
              is narrow and focused. A generative model creates new output,
              while a representation model encodes meaning into dense numeric
              representations such as embeddings.
            </p>
          </div>
          <div className="model-type-grid">
            <article className="lesson-panel model-type-card">
              <h3>Foundation Model</h3>
              <p>
                A general-purpose model trained on large and broad datasets. It
                can support chat, summarization, coding, classification, and
                translation.
              </p>
            </article>
            <article className="lesson-panel model-type-card">
              <h3>Task-Specific Model</h3>
              <p>
                Built or tuned for a narrow job such as spam detection,
                sentiment classification, or fraud prediction.
              </p>
            </article>
            <article className="lesson-panel model-type-card">
              <h3>Generative Model</h3>
              <p>
                Creates new output. GPT-style models are generative because they
                generate tokens one by one.
              </p>
            </article>
            <article className="lesson-panel model-type-card">
              <h3>Representation Model</h3>
              <p>
                Converts input into embeddings used for semantic search,
                retrieval, similarity matching, clustering, and recommendation
                systems.
              </p>
            </article>
          </div>
        </section>

        <section className="reading-section" id="section-6">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Guided Interaction</p>
            <h2>Token Playground from the roadmap concepts</h2>
          </div>
          <article className="playground-card">
            <div className="playground-context">
              <div className="scenario-tabs" role="tablist" aria-label="Context scenarios">
                {tokenPlaygroundScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className={`scenario-tab${scenario.id === activeScenario.id ? " scenario-tab-active" : ""}`}
                    onClick={() => handleScenarioChange(scenario.id)}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>

              <p className="visual-label">Context Window</p>
              <div className="context-tokens">
                {activeScenario.prompt.map((token) => (
                  <span
                    key={`${activeScenario.id}-${token}`}
                    className={token === "?" ? "context-question" : ""}
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <div className="candidate-grid">
              {rankedCandidates.map((candidate, index) => (
                <button
                  key={candidate.token}
                  type="button"
                  className={`candidate-card${selectedCandidate.token === candidate.token ? " candidate-card-active" : ""}`}
                  onClick={() => setSelectedCandidateToken(candidate.token)}
                >
                  <span className="candidate-label">Candidate</span>
                  <strong>{candidate.token}</strong>
                  <span className="candidate-score">
                    {(candidate.score * 100).toFixed(candidate.score > 0.1 ? 0 : 1)}%
                    {index === 0 ? " most likely" : ""}
                  </span>
                  <div className="progress-track progress-track-thin" aria-hidden="true">
                    <div
                      className="progress-fill"
                      style={{ width: `${candidate.score * 100}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="candidate-feedback">
              <p className="candidate-feedback-label">Model intuition</p>
              <p>{selectedCandidate.description}</p>
            </div>

            <div className="prediction-result">
              <div>
                <p className="candidate-feedback-label">Top prediction</p>
                <h3>{topCandidate.token}</h3>
              </div>
              <div>
                <p className="candidate-feedback-label">Generated continuation</p>
                <p>{activeScenario.bestCompletion}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="reading-section" id="section-7">
          <article className="knowledge-card">
            <div className="section-heading section-heading-light">
              <p className="eyebrow">Quiz — Conceptual Layer</p>
            </div>

            <p className="quiz-question">{activeQuizQuestion.question}</p>

            <div className="quiz-progress">
              <span>
                Question {quizIndex + 1} of {llmQuizQuestions.length}
              </span>
              <div className="progress-track progress-track-thin" aria-hidden="true">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((quizIndex + 1) / llmQuizQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="quiz-options">
              {activeQuizQuestion.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`quiz-option${activeSelectedAnswer === index ? " quiz-option-selected" : ""}`}
                  onClick={() => handleQuizAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>

            {answerFeedback ? (
              <p
                className={`quiz-feedback quiz-feedback-${answerFeedback.tone}`}
                role="status"
              >
                {answerFeedback.message}
              </p>
            ) : null}

            <div className="quiz-nav">
              <button
                type="button"
                className="quiz-secondary-button"
                onClick={() => setQuizIndex((current) => Math.max(0, current - 1))}
                disabled={quizIndex === 0}
              >
                Previous
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  setQuizIndex((current) =>
                    Math.min(llmQuizQuestions.length - 1, current + 1),
                  )
                }
                disabled={quizIndex === llmQuizQuestions.length - 1}
              >
                Next Question
              </button>
            </div>
          </article>
        </section>

        <section className="lesson-footer" id="section-8">
          <article className="lesson-panel">
            <div className="section-heading">
              <p className="eyebrow">Roadmap Summary</p>
              <h2>Key Takeaways</h2>
            </div>
            <ul className="takeaway-list">
              <li>
                Language modeling is the internal mechanism behind the user
                behavior of “giving answers.”
              </li>
              <li>
                Good next-token prediction requires learning hidden structures
                such as logic, relationships, and code patterns.
              </li>
              <li>
                Scale laws describe gradual improvement; emergence describes
                capabilities becoming noticeably usable at higher scale.
              </li>
              <li>
                Generative models create content, while representation models
                encode meaning into embeddings.
              </li>
            </ul>
          </article>
          <p className="eyebrow lesson-footer-label">Next Lesson</p>
          <div className="next-lesson-card">
            <div>
              <p className="next-lesson-label">Up next</p>
              <h2>Transformer Architecture</h2>
            </div>
            <button type="button" className="primary-button" onClick={onOpenNextLesson}>
              Continue Path
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
