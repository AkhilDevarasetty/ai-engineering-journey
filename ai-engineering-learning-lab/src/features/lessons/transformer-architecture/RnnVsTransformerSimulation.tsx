import { useMemo, useState } from "react";

const simulationSteps = [
  {
    id: 1,
    title: "Input arrives as a sequence",
    rnnTitle: "RNN sees a stream",
    rnnBody:
      "The RNN begins with the same input sentence, but it can only move through one token at a time.",
    transformerTitle: "Transformer sees the full prompt",
    transformerBody:
      "The Transformer receives the same sequence as a set of tokens that can all participate in computation together.",
    insight:
      "Both models start with the same tokens. The difference begins in how they process them.",
  },
  {
    id: 2,
    title: "RNN advances sequentially",
    rnnTitle: "Each token waits for the previous one",
    rnnBody:
      "Sequential processing means the model cannot parallelize the full sequence. The hidden state must keep carrying everything forward.",
    transformerTitle: "Tokens are available together",
    transformerBody:
      "Transformer tokens are already available for comparison, which is why the architecture scales much better on parallel hardware.",
    insight:
      "This is the first bottleneck: RNN latency grows with the sequence because each step depends on the previous one.",
  },
  {
    id: 3,
    title: "RNN compresses context into one hidden state",
    rnnTitle: "Information bottleneck",
    rnnBody:
      "Earlier context gets squeezed into one rolling memory state. As the sequence grows, important details become harder to preserve.",
    transformerTitle: "No single memory bottle",
    transformerBody:
      "Transformers do not force all prior meaning through one narrow state. Tokens can remain available as separate context points.",
    insight:
      "This is why long-range dependencies become fragile in RNNs.",
  },
  {
    id: 4,
    title: "Transformer applies self-attention",
    rnnTitle: "RNN reaches 'it' with faded context",
    rnnBody:
      "By the time the RNN reaches the pronoun, the model depends on compressed memory to recover which earlier word matters.",
    transformerTitle: "Attention connects 'it' to 'cat'",
    transformerBody:
      "Self-attention allows the token 'it' to directly weigh relevant earlier tokens, making long-range reference resolution much clearer.",
    insight:
      "Attention is the aha moment: the model can directly access the relevant earlier token instead of hoping it survived compression.",
  },
  {
    id: 5,
    title: "Parallel structure builds better context",
    rnnTitle: "Weak context access",
    rnnBody:
      "The RNN has one path through time, so context access is indirect and increasingly fragile.",
    transformerTitle: "Parallel context access",
    transformerBody:
      "The Transformer computes relationships across the sequence at once, making it easier to capture structure, references, and long-range patterns.",
    insight:
      "Transformers scale better because context is easier to access and parallel hardware can be used efficiently.",
  },
  {
    id: 6,
    title: "Final comparison",
    rnnTitle: "Sequential and bottlenecked",
    rnnBody:
      "RNNs can work on short sequences, but they become slow and forgetful as context gets longer.",
    transformerTitle: "Parallel and context-aware",
    transformerBody:
      "Transformers handle long-range context better and align naturally with the scale needed for modern LLMs.",
    insight:
      "RNNs compress. Transformers connect. That structural difference is why Transformers replaced RNNs for large language modeling.",
  },
] as const;

const inputTokens = [
  "The",
  "cat",
  "sat",
  "on",
  "the",
  "mat",
  "because",
  "it",
  "was",
  "tired",
  ".",
] as const;

export function RnnVsTransformerSimulation() {
  const [currentStep, setCurrentStep] = useState(1);

  const activeStep =
    simulationSteps.find((step) => step.id === currentStep) ?? simulationSteps[0];

  const rnnVisibleCount = useMemo(() => {
    if (currentStep <= 1) return 3;
    if (currentStep === 2) return 6;
    return inputTokens.length;
  }, [currentStep]);

  const rnnMemoryLevel = useMemo(() => {
    if (currentStep <= 2) return 72;
    if (currentStep === 3) return 48;
    if (currentStep === 4) return 36;
    return 28;
  }, [currentStep]);

  const transformerAttentionVisible = currentStep >= 4;
  const finalComparisonVisible = currentStep >= 6;

  return (
    <article className="simulation-shell">
      <div className="simulation-header">
        <div>
          <p className="eyebrow">Interactive Comparison</p>
          <h2>RNN vs Transformer Flow</h2>
        </div>
        <div className="simulation-step-pill">
          Step {currentStep} / {simulationSteps.length}
        </div>
      </div>

      <p className="simulation-copy">
        Walk through the same sentence in both architectures and watch where the
        RNN bottleneck appears, where the Transformer opens parallel access, and
        how attention creates the key context connection.
      </p>

      <div className="simulation-input-card">
        <p className="visual-label">Shared input sentence</p>
        <div className="context-tokens">
          {inputTokens.map((token) => (
            <span key={token} className={token === "it" ? "context-question" : ""}>
              {token}
            </span>
          ))}
        </div>
      </div>

      <div className="simulation-progress">
        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / simulationSteps.length) * 100}%` }}
          />
        </div>
        <p className="simulation-stage-label">{activeStep.title}</p>
      </div>

      <div className="simulation-lanes">
        <section className="simulation-lane simulation-lane-rnn">
          <div className="simulation-lane-header">
            <p className="summary-label">RNN Path</p>
            <span className="status-pill status-pill-idle">Sequential</span>
          </div>
          <h3>{activeStep.rnnTitle}</h3>
          <p className="simulation-lane-copy">{activeStep.rnnBody}</p>

          <div className="rnn-stream">
            {inputTokens.map((token, index) => (
              <div
                key={`${token}-${index}`}
                className={`rnn-token-node${index < rnnVisibleCount ? " rnn-token-node-active" : ""}`}
              >
                {token}
              </div>
            ))}
          </div>

          <svg
            className="rnn-connector-svg"
            viewBox="0 0 800 150"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M24 80 C 110 20, 170 20, 250 80 S 390 140, 470 80 S 610 20, 690 80"
              className="simulation-curve simulation-curve-rnn"
            />
          </svg>

          <div className="rnn-memory-card">
            <div className="rnn-memory-copy">
              <p className="visual-label">Hidden state</p>
              <strong>Rolling compressed memory</strong>
            </div>
            <div className="rnn-memory-meter">
              <div className="progress-track progress-track-thin" aria-hidden="true">
                <div
                  className="progress-fill progress-fill-violet"
                  style={{ width: `${rnnMemoryLevel}%` }}
                />
              </div>
              <span>{rnnMemoryLevel}% context fidelity</span>
            </div>
          </div>

          {currentStep >= 3 ? (
            <div className="simulation-callout simulation-callout-warning">
              <p className="visual-label">Bottleneck</p>
              <p>
                Earlier tokens are squeezed through one state, so long-range
                details become harder to preserve.
              </p>
            </div>
          ) : null}
        </section>

        <section className="simulation-lane simulation-lane-transformer">
          <div className="simulation-lane-header">
            <p className="summary-label">Transformer Path</p>
            <span className="status-pill status-pill-progress">Parallel</span>
          </div>
          <h3>{activeStep.transformerTitle}</h3>
          <p className="simulation-lane-copy">{activeStep.transformerBody}</p>

          <div className="transformer-grid">
            {inputTokens.map((token, index) => (
              <div
                key={`${token}-${index}`}
                className={`transformer-token-node${token === "cat" || token === "it" ? " transformer-token-node-focus" : ""}`}
              >
                {token}
              </div>
            ))}
          </div>

          <svg
            className={`attention-svg${transformerAttentionVisible ? " attention-svg-visible" : ""}`}
            viewBox="0 0 800 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M160 70 C 250 10, 420 10, 540 140"
              className="simulation-curve simulation-curve-attention"
            />
            <circle cx="160" cy="70" r="9" className="attention-node-dot" />
            <circle cx="540" cy="140" r="9" className="attention-node-dot" />
          </svg>

          {transformerAttentionVisible ? (
            <div className="simulation-callout simulation-callout-highlight">
              <p className="visual-label">Attention link</p>
              <p>
                The token <strong>&quot;it&quot;</strong> can directly attend to{" "}
                <strong>&quot;cat&quot;</strong>, which makes pronoun resolution
                easier and more robust across distance.
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <div className="simulation-insight-card">
        <p className="visual-label">Why this step matters</p>
        <p>{activeStep.insight}</p>
      </div>

      {finalComparisonVisible ? (
        <div className="simulation-comparison-grid">
          <article className="simulation-summary-card">
            <p className="visual-label">RNN</p>
            <h3>Sequential and bottlenecked</h3>
            <ul className="takeaway-list">
              <li>Processes one token after another</li>
              <li>Relies on one rolling hidden state</li>
              <li>Struggles with long-range dependencies</li>
            </ul>
          </article>
          <article className="simulation-summary-card simulation-summary-card-accent">
            <p className="visual-label">Transformer</p>
            <h3>Parallel and context-aware</h3>
            <ul className="takeaway-list">
              <li>Tokens can interact across the sequence</li>
              <li>Attention provides direct context access</li>
              <li>Scales better for modern LLM workloads</li>
            </ul>
          </article>
        </div>
      ) : null}

      <div className="simulation-controls">
        <button
          type="button"
          className="secondary-button"
          onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
          disabled={currentStep === 1}
        >
          Previous Step
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={() =>
            setCurrentStep((step) => Math.min(simulationSteps.length, step + 1))
          }
          disabled={currentStep === simulationSteps.length}
        >
          Next Step
        </button>
      </div>
    </article>
  );
}
