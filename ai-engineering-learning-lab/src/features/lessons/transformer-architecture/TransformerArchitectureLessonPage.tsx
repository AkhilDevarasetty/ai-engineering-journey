import { useMemo, useState } from "react";

import {
  architectureModes,
  attentionScenarios,
  kvCacheModes,
  transformerLessonSections,
  transformerQuizQuestions,
  transformerResources,
} from "./transformerLessonData";

type TransformerArchitectureLessonPageProps = {
  onBack: () => void;
  onOpenNextLesson: () => void;
  backLabel?: string;
};

export function TransformerArchitectureLessonPage({
  onBack,
  onOpenNextLesson,
  backLabel = "Back to Dashboard",
}: TransformerArchitectureLessonPageProps) {
  const [attentionScenarioId, setAttentionScenarioId] = useState<string>(
    attentionScenarios[0].id,
  );
  const [architectureId, setArchitectureId] = useState<string>(
    architectureModes[1].id,
  );
  const [cacheModeId, setCacheModeId] = useState<string>(kvCacheModes[1].id);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const activeAttentionScenario =
    attentionScenarios.find((scenario) => scenario.id === attentionScenarioId) ??
    attentionScenarios[0];
  const activeArchitecture =
    architectureModes.find((mode) => mode.id === architectureId) ??
    architectureModes[1];
  const activeCacheMode =
    kvCacheModes.find((mode) => mode.id === cacheModeId) ?? kvCacheModes[1];
  const activeQuizQuestion = transformerQuizQuestions[quizIndex];
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

  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedAnswers((current) => ({
      ...current,
      [quizIndex]: optionIndex,
    }));
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
          <p className="sidebar-card-label">Module 1.2</p>
          <h2>Transformer Architecture</h2>
          <p>
            This lesson follows the roadmap note directly: RNN bottlenecks,
            attention, self-attention, architecture families, context windows,
            and KV cache intuition.
          </p>
        </div>

        <nav className="lesson-nav" aria-label="Lesson sections">
          {transformerLessonSections.map((section, index) => (
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
            <span>Foundations • Module 1.2</span>
          </div>
          <h1>
            Transformer <span className="gradient-text">Architecture</span>
          </h1>
          <p className="lesson-hero-copy">
            A structured walkthrough of the system layer: why RNNs stopped
            scaling, how attention changed the game, and why decoder-only
            Transformers became the dominant LLM architecture.
          </p>
        </section>

        <section className="reading-section" id="section-1">
          <div className="hook-grid">
            <article className="lesson-panel lesson-panel-feature lesson-text-panel">
              <p className="eyebrow">Story of Transformer Architecture</p>
              <h2>Transformers replaced rolling memory with direct attention.</h2>
              <p>
                Before Transformers, language models mostly used RNN-style
                architectures that processed text one token at a time and
                carried context through a rolling memory.
              </p>
              <p>
                This worked for short sequences, but it became slow, forgetful,
                and difficult to scale. Transformers changed the approach by
                introducing attention, which allows each token to directly look
                at other relevant tokens in the sequence.
              </p>
              <p>
                That change improved long-range context handling and made
                training much more scalable.
              </p>
            </article>

            <article className="lesson-panel lesson-panel-stats">
              <div className="fact-row">
                <span className="fact-index">1</span>
                <span>RNNs processed one token at a time</span>
              </div>
              <div className="fact-row">
                <span className="fact-index fact-index-secondary">2</span>
                <span>Attention opened direct access across the sequence</span>
              </div>
              <div className="fact-row">
                <span className="fact-index fact-index-tertiary">3</span>
                <span>Parallel training scaled much better</span>
              </div>
            </article>
          </div>
        </section>

        <section className="reading-section" id="section-2">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Why RNNs Failed at Scale</p>
            <h2>The bottleneck was speed, memory, and lost long-range context</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              RNNs struggled at scale because they processed tokens
              sequentially and stored prior context in a limited rolling hidden
              state. This made long-range dependencies hard to preserve,
              slowed training, and prevented efficient use of parallel hardware
              such as GPUs.
            </p>
            <p>
              As sequence length and dataset size grew, these limitations became
              a major bottleneck for large language modeling.
            </p>
          </div>
          <div className="progressive-grid">
            <article className="lesson-panel progressive-card">
              <h3>Sequential processing</h3>
              <p>
                Each token had to wait for the previous one, which made training
                slow and hard to parallelize.
              </p>
            </article>
            <article className="lesson-panel progressive-card">
              <h3>Rolling hidden state</h3>
              <p>
                Important context from much earlier in the sequence could fade
                out or get compressed away.
              </p>
            </article>
          </div>
        </section>

        <section className="reading-section" id="section-3">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Attention Mechanism Intuition</p>
            <h2>Attention replaces one compressed memory with direct access</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              The attention mechanism allows a token to look at other relevant
              tokens in the same sequence and assign them importance. Instead of
              relying only on one compressed memory state, the model can directly
              access useful parts of the context.
            </p>
            <p>
              This helps it handle long-distance relationships and understand
              meaning more accurately.
            </p>
          </div>
          <article className="visual-model-card">
            <div className="visual-stage">
              <p className="visual-label">RNN-style bottleneck</p>
              <div className="visual-box">Sequence → one rolling memory state → next token</div>
            </div>
            <div className="visual-arrow">→</div>
            <div className="visual-stage">
              <p className="visual-label">Transformer-style access</p>
              <div className="visual-box">Sequence → token attends to relevant tokens directly</div>
            </div>
          </article>
        </section>

        <section className="reading-section" id="section-4">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Self-Attention Explained Visually</p>
            <h2>Each token compares itself with the whole input sequence</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              Self-attention means each token can compare itself with every
              other token in the same input sequence and decide which ones
              matter most. For example, in a sentence with the word "it," the
              model can attend more strongly to the noun that "it" likely
              refers to.
            </p>
            <p>
              This lets the model build context-aware meaning across the whole
              sequence.
            </p>
          </div>
          <article className="playground-card">
            <div className="scenario-tabs" role="tablist" aria-label="Attention scenarios">
              {attentionScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className={`scenario-tab${scenario.id === activeAttentionScenario.id ? " scenario-tab-active" : ""}`}
                  onClick={() => setAttentionScenarioId(scenario.id)}
                >
                  {scenario.label}
                </button>
              ))}
            </div>

            <p className="visual-label">Sequence</p>
            <div className="context-tokens">
              {activeAttentionScenario.sentence.map((token, index) => (
                <span
                  key={`${activeAttentionScenario.id}-${token}-${index}`}
                  className={
                    token === activeAttentionScenario.focusToken
                      ? "context-question"
                      : ""
                  }
                >
                  {token}
                </span>
              ))}
            </div>

            <div className="attention-grid">
              {activeAttentionScenario.weights.map((weight) => (
                <article key={weight.token} className="attention-weight-card">
                  <div className="attention-weight-header">
                    <strong>{weight.token}</strong>
                    <span>{Math.round(weight.strength * 100)}%</span>
                  </div>
                  <div className="progress-track progress-track-thin" aria-hidden="true">
                    <div
                      className="progress-fill"
                      style={{ width: `${weight.strength * 100}%` }}
                    />
                  </div>
                  <p>{weight.note}</p>
                </article>
              ))}
            </div>

            <div className="candidate-feedback">
              <p className="candidate-feedback-label">Why this matters</p>
              <p>{activeAttentionScenario.explanation}</p>
            </div>
          </article>
        </section>

        <section className="reading-section" id="section-5">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Multi-Head Attention Purpose</p>
            <h2>One sequence, multiple perspectives in parallel</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              Multi-head attention allows the model to look at the same
              sequence through multiple attention heads in parallel. Each head
              can learn a different type of relationship, such as grammar,
              references, local context, or long-range dependencies.
            </p>
            <p>
              This makes the model more expressive than using a single
              attention pattern.
            </p>
          </div>
          <div className="progressive-grid">
            <article className="lesson-panel progressive-card">
              <h3>Head 1</h3>
              <p>Tracks grammatical structure and local syntax.</p>
            </article>
            <article className="lesson-panel progressive-card">
              <h3>Head 2</h3>
              <p>Follows references such as pronouns and related nouns.</p>
            </article>
            <article className="lesson-panel progressive-card">
              <h3>Head 3</h3>
              <p>Captures longer-range dependencies across the sequence.</p>
            </article>
            <article className="lesson-panel progressive-card">
              <h3>Head 4</h3>
              <p>Specializes in domain-specific patterns such as code structure.</p>
            </article>
          </div>
        </section>

        <section className="reading-section" id="section-6">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Encoder-Only vs Decoder-Only vs Encoder-Decoder</p>
            <h2>Architecture choice depends on the job the model must do</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              Encoder-only models are mainly used for understanding input, which
              makes them useful for embeddings, classification, and search.
              Decoder-only models generate text one token at a time and are
              commonly used for chat and code generation. Encoder-decoder
              models first process the input and then generate an output from
              it, which works well for tasks like translation and summarization.
            </p>
          </div>
          <article className="playground-card">
            <div className="scenario-tabs" role="tablist" aria-label="Architecture families">
              {architectureModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={`scenario-tab${mode.id === activeArchitecture.id ? " scenario-tab-active" : ""}`}
                  onClick={() => setArchitectureId(mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <article className="lesson-panel lesson-panel-feature architecture-panel">
              <p className="eyebrow">Selected Architecture</p>
              <h3>{activeArchitecture.title}</h3>
              <p>{activeArchitecture.description}</p>
              <ul className="chip-list">
                {activeArchitecture.useCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            </article>
          </article>
        </section>

        <section className="reading-section" id="section-7">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Why Decoder-Only Models Dominate LLMs</p>
            <h2>Next-token prediction maps naturally onto open-ended generation</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              Decoder-only models dominate modern LLMs because they align
              naturally with next-token prediction, which is the main training
              objective of large language models.
            </p>
            <p>
              They are flexible enough to handle chat, rewriting, coding,
              summarization, and many other tasks through prompting. This makes
              them a strong general-purpose architecture for AI products.
            </p>
          </div>
          <blockquote className="lesson-quote lesson-quote-wide">
            The architecture fits the objective: predict the next token well,
            then reuse that capability across many tasks through prompting.
          </blockquote>
        </section>

        <section className="reading-section" id="section-8">
          <div className="section-heading section-heading-constrained">
            <p className="eyebrow">Context Window, Positional Encoding, and KV Cache</p>
            <h2>Bounded context, ordered tokens, faster generation</h2>
          </div>
          <div className="lesson-copy lesson-copy-wide">
            <p>
              The context window is the amount of text the model can consider in
              a single run. Positional encoding gives the model information
              about the order of tokens in that text, because Transformers
              process tokens in parallel and do not naturally understand
              sequence order.
            </p>
            <p>
              KV cache is an inference optimization used during generation.
              Instead of recomputing attention for all earlier tokens every time
              a new token is produced, the model stores previously computed key
              and value information and reuses it. This speeds up generation
              significantly, especially for long prompts and chat-style
              responses, but it also increases memory usage.
            </p>
          </div>
          <div className="progressive-grid">
            <article className="lesson-panel progressive-card">
              <h3>Context Window</h3>
              <p>
                The bounded amount of text the model can see in one pass during
                inference.
              </p>
            </article>
            <article className="lesson-panel progressive-card">
              <h3>Positional Encoding</h3>
              <p>
                Sequence-order information injected back into the Transformer so
                token arrangement still matters.
              </p>
            </article>
          </div>
          <article className="playground-card">
            <div className="scenario-tabs" role="tablist" aria-label="KV cache comparison">
              {kvCacheModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={`scenario-tab${mode.id === activeCacheMode.id ? " scenario-tab-active" : ""}`}
                  onClick={() => setCacheModeId(mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <article className="lesson-panel lesson-panel-feature architecture-panel">
              <p className="eyebrow">Inference tradeoff</p>
              <h3>{activeCacheMode.title}</h3>
              <p>{activeCacheMode.description}</p>
              <ul className="takeaway-list">
                {activeCacheMode.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </article>
        </section>

        <section className="reading-section" id="section-9">
          <article className="knowledge-card">
            <div className="section-heading section-heading-light">
              <p className="eyebrow">Quiz — Transformer Architecture</p>
            </div>

            <p className="quiz-question">{activeQuizQuestion.question}</p>

            <div className="quiz-progress">
              <span>
                Question {quizIndex + 1} of {transformerQuizQuestions.length}
              </span>
              <div className="progress-track progress-track-thin" aria-hidden="true">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((quizIndex + 1) / transformerQuizQuestions.length) * 100}%`,
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
                    Math.min(transformerQuizQuestions.length - 1, current + 1),
                  )
                }
                disabled={quizIndex === transformerQuizQuestions.length - 1}
              >
                Next Question
              </button>
            </div>
          </article>
        </section>

        <section className="lesson-footer">
          <article className="lesson-panel">
            <div className="section-heading">
              <p className="eyebrow">Resources</p>
              <h2>Keep going deeper</h2>
            </div>
            <div className="resource-list">
              {transformerResources.map((resource) => (
                <a
                  key={resource.url}
                  className="resource-link"
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{resource.title}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </article>
          <p className="eyebrow lesson-footer-label">Next Lesson</p>
          <div className="next-lesson-card">
            <div>
              <p className="next-lesson-label">Up next</p>
              <h2>Tokenization &amp; Embeddings</h2>
            </div>
            <button type="button" className="primary-button" onClick={onOpenNextLesson}>
              Back to Roadmap
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
