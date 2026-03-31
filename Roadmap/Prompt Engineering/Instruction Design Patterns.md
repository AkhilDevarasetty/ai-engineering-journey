# Instruction Design Patterns

> 💡 This is where prompting becomes engineering. Patterns give you reusable strategies — not just tricks.

---

## 1. Zero-Shot Prompting

**Zero-shot prompting** is the simplest instruction pattern: you give the model a task with no examples. You rely entirely on the model's pre-trained knowledge to infer the correct response.

### Why Use It?

- Fastest and cheapest to implement — no example curation needed.
- Works well for well-defined, well-known tasks.
- Good as a starting point before escalating to few-shot.

### Core Characteristics

| Property | Description |
|---|---|
| **No Examples** | Only the task description and input data are given |
| **Relies on Pre-training** | Model infers the correct approach from internal knowledge |
| **Simplicity** | The lowest-effort prompting pattern available |

### Common Use Cases

- **Sentiment Analysis:** `"Classify this review as Positive, Negative, or Neutral."`
- **Summarization:** `"Summarize this into three bullet points."`
- **Translation:** `"Translate this sentence from English to French."`
- **Q&A:** Simple factual queries like `"Who wrote Othello?"`

### Best Practices

| Principle | Why It Matters |
|---|---|
| **Be Specific** | Vague verbs like "explain" are unconditioned — add qualifiers |
| **Assign a Persona** | `"Act as a senior engineer"` shifts vocabulary and priorities |
| **Define Output Format** | Specify JSON, bullets, or word count upfront |
| **Use Output Indicators** | End with `"Sentiment:"` or `"JSON Output:"` to anchor the response |

### Comparison: Zero-Shot vs. Other Patterns

| Pattern | Examples | Best For |
|---|---|---|
| **Zero-Shot** | 0 | Simple, well-known tasks |
| **One-Shot** | 1 | Clarifying a specific style or format |
| **Few-Shot** | 2–5+ | Complex logic, niche formats, high consistency |

### 🧪 Prompt Sample

```
You are a support triage specialist for a SaaS platform.

An "Urgent" ticket means: the customer cannot use the product at all, there is active
data loss, or the issue has a direct revenue or security impact.
A "Non-Urgent" ticket means: a feature request, general confusion, minor UI bug,
or an issue with a known workaround.

Classify the following support ticket as exactly one of: Urgent or Non-Urgent.

Ticket: "We can't access our dashboard at all — our entire team is blocked and
we have a client demo in 2 hours."

Classification:
```

---

## 2. Few-Shot Prompting

**Few-shot prompting** provides 2–5 examples alongside your task. It's the *"show, don't just tell"* pattern — instead of describing the output, you demonstrate it.

### Why Use It?

Use few-shot when zero-shot falls short:

| Situation | Why Examples Help |
|---|---|
| **Specific format required** | A nested JSON schema is easier to show than to describe |
| **Nuanced style or tone** | "Cynical" means different things — examples remove the ambiguity |
| **Complex task logic** | The logic is easier to demonstrate than to explain in words |

### Structure of a Few-Shot Prompt

```
[Task Instruction]
Input: <example 1>
Output: <example 1 answer>

Input: <example 2>
Output: <example 2 answer>

Input: <your actual query>
Output:
```

### Example

```
Task: Classify the sentiment of movie reviews.

Input: "The acting was superb, but the plot was a bit slow."
Sentiment: Mixed

Input: "A complete waste of time. I hated every minute."
Sentiment: Negative

Input: "Absolutely breathtaking visuals and a gripping story!"
Sentiment: [Model completes → Positive]
```

### Best Practices

- **Keep formatting consistent** across all examples (same labels, same delimiters).
- **Diversify examples** to cover edge cases — helps the model generalize.
- **Recency bias:** The last example can have slightly higher influence — place your most representative example last.

### 🧪 Prompt Sample

```
[System Message]
You are a friendly customer support agent for Bloom, a wellness app.
You are warm, slightly informal, and never robotic. You speak like a helpful friend,
not a call center script. Always acknowledge feelings before solving the problem.

[Few-Shot Examples]
Customer: "I can't log in and I have a session starting in 5 minutes!"
Agent: "Oh no, that's stressful — let's get you sorted fast! Can you try resetting
your password real quick? Here's the link: [link]. I'll stay here until it works."

Customer: "Your app keeps crashing and I've tried everything."
Agent: "Ugh, I'm really sorry about that — that's so frustrating, especially when
you're trying to wind down. Let me look into your account right now."

[New Customer Message]
Customer: "I was charged twice this month and I'm pretty upset about it."
Agent:
```

---

### 2.1 Follow-up: Can't Zero-Shot Handle Style and Format Too?

> 🔍 **Follow-up question explored here:** *"For specific format and nuanced style, can't we achieve that with zero-shot prompting too? By assigning a role or output constraints?"*

**Yes — but few-shot is more reliable.** Here's the core trade-off:

| Approach | How It Works | Weakness |
|---|---|---|
| **Zero-Shot** | Instruction-based: `"Write in a cynical tone"` | "Cynical" is ambiguous — the model interprets it through a statistical average |
| **Few-Shot** | Demonstration-based: shows exactly what "cynical" looks like | Higher cost, requires curating examples |

**The analogy:**
- Zero-shot is like giving a chef a recipe in words.
- Few-shot is like giving the chef a tasting menu — they see and taste exactly what you want.

**Two concrete reasons few-shot wins on strict formats:**
1. **Ambiguity reduction** — examples show exactly how the output should look, no interpretation needed.
2. **Reliability** — models statistically follow patterns they see in context more consistently than written rules.

> **Key Insight:** Zero-shot + role + output constraints is good. Few-shot is better when you need tight control over either the format or the voice.

---

## 3. Role Prompting

**Role prompting** (also called persona prompting) explicitly tells the model to assume a specific identity before it performs a task. It acts as a *contextual lens* that filters the model's entire response.

### Why It Matters

Role prompting doesn't just change tone — it shifts reasoning priorities:

| Effect | What Changes |
|---|---|
| **Contextual Lens** | A "Senior Engineer" prioritizes efficiency and security; a "Technical Recruiter" prioritizes clarity and readability |
| **Vocabulary** | A "Doctor" uses clinical terms; a "Kindergarten Teacher" uses simple analogies |
| **Reduced Instruction Bloat** | `"Act as a cynical noir detective"` implicitly encodes dozens of stylistic rules in one phrase |

### How to Construct an Effective Role

A high-quality role has three layers:

```
Identity:     "You are an expert Cybersecurity Analyst with 10 years of experience"
Expertise:    "...specializing in identifying SQL injection vulnerabilities in legacy banking systems"
Motivation:   "...who is thorough, skeptical, and prioritizes risk mitigation over speed"
```

The more specific the role, the more precise the output.

### Zero-Shot vs. Role-Enhanced

| Feature | Basic Zero-Shot | Role-Enhanced Prompting |
|---|---|---|
| **Logic** | `"Explain X."` | `"As a [Role], explain X to [Audience]."` |
| **Focus** | General accuracy | Domain-specific priorities |
| **Tone** | Helpful and neutral | Tailored to professional context |

### Best Practices

| Rule | Reason |
|---|---|
| **Use the System Slot** | In API calls, place the role in the system message so it stays persistent throughout the conversation |
| **Be Specific, Not Broad** | `"Act as a lawyer"` is too generic. `"Act as a corporate contract lawyer reviewing a SaaS SLA"` is precise |
| **Use Direct Commands** | `"You are..."` or `"Act as..."` > `"Imagine you are..."` — direct commands anchor the model more effectively |

### 🧪 Prompt Sample — Same Question, Three Role Levels

```
[Generic Role — weak vocabulary re-weighting]
You are a doctor. Explain what happens during a heart attack.

[Specific Role — strong re-weighting]
You are a board-certified cardiologist specializing in acute coronary syndromes.
Explain the pathophysiology of a myocardial infarction to a first-year medical resident.

[Layman Role — re-weights away from clinical vocabulary entirely]
Explain a heart attack in simple terms to a 10-year-old.
```

*The same model, the same training data — but three completely different vocabulary
clusters activated purely by the role assigned.*

---

### 3.1 The Mechanics of Persona Shifts

Role prompting doesn't change the model's training — it re-weights how the model reasons within its existing knowledge.

| Mechanism | What It Does |
|---|---|
| **Vocabulary Re-weighting** | `"Medical Professional"` increases probability of "myocardial infarction"; `"Layman"` triggers "heart attack" |
| **Implicit Instruction** | A persona like `"Executive"` implicitly enforces conciseness and avoidance of jargon without writing those rules out |
| **Reasoning Triggers** | For complex tasks, a well-constructed persona can act as an implicit Chain-of-Thought, triggering methodical, expert-style reasoning |

### Impact Comparison by Persona Type

| Attribute | Academic / Scientist | Creative / Poet |
|---|---|---|
| **Primary Goal** | Precision and factual accuracy | Emotional resonance and imagery |
| **Linguistic Markers** | Passive voice, formal jargon, data citations | Metaphors, sensory adjectives, varied rhythm |
| **Reasoning Priority** | Methodology and evidence-based conclusions | Thematic depth and artistic intent |

---

## 4. Chain-of-Thought (CoT) Prompting

**Chain-of-Thought (CoT) prompting** encourages a model to generate intermediate reasoning steps before arriving at a final answer. Instead of shooting from the hip (next-word prediction), the model is guided to *show its work*.

### Implementations

| Type | How It Works | When to Use |
|---|---|---|
| **Zero-Shot CoT** | Append `"Let's think step by step"` to your query | Quick boost for logic tasks — no examples needed |
| **Few-Shot CoT** | Provide 2–5 examples that show both the problem and the reasoning steps | Best for strict logic or niche reasoning formats |
| **Auto-CoT** | Use the model itself to generate diverse reasoning chains for few-shot examples | Reduces manual prompt-crafting effort |

### Performance Impact

CoT can improve accuracy by up to **40%** on benchmarks like GSM8K (grade-school math). Most effective for:

- Multi-step arithmetic and symbolic logic  
- Scientific reasoning and technical troubleshooting  
- Strategic planning with complex constraints  

For simple tasks (translation, basic summarization), CoT adds latency/cost without meaningful benefit — skip it there.

### Beyond Linear: Trees and Graphs

Standard CoT follows a linear path. For highly complex problems, newer architectures explore non-linear reasoning:

| Architecture | How It Works |
|---|---|
| **Tree of Thoughts (ToT)** | Explores multiple parallel reasoning branches and backtracks from dead ends — mimics slow, deliberate "System 2" thinking |
| **Graph of Thoughts (GoT)** | Treats reasoning as a network where different paths can share conclusions or merge toward a final answer |

### 🧪 Prompt Sample

```
[Zero-Shot CoT — standard model like GPT-4o]
A factory produces 240 widgets per hour. It runs 3 shifts of 8 hours each per day.
How many widgets does it produce in a 5-day work week?
Let's think step by step.

---

[Few-Shot CoT — demonstrating the reasoning structure first]
Example Problem: A baker makes 60 loaves per hour and works 4 hours a day for 3 days.
Reasoning:
  - Loaves per day = 60 × 4 = 240
  - Total loaves = 240 × 3 = 720
Final Answer: 720

Now solve:
A factory produces 240 widgets per hour. It runs 3 shifts of 8 hours each per day.
How many widgets does it produce in a 5-day work week?
Reasoning:
```

*Zero-Shot CoT triggers reasoning with a phrase. Few-Shot CoT shows the model the exact
decomposition structure to follow — more reliable for strict or niche logic chains.*

---

### 4.1 Follow-up: If Models Already Reason Natively, Is CoT Obsolete?

> 🔍 **Follow-up question explored here:** *"So already these advanced models like o1, Gemini, and Claude are performing this reasoning natively. Is there any use of CoT in prompting anymore?"*

**Not obsolete — but its role has shifted.** Here's the nuanced view:

**Reasoning-native models** (OpenAI o1/o3, Gemini 2.0 Thinking, DeepSeek-R1) handle CoT internally via a hidden computation phase. For these models:
- `"Think step by step"` is redundant — it's already baked into their architecture via reinforcement learning.
- **Over-specifying** reasoning can actually *decrease* performance by conflicting with their RL-tuned thought process.
- Best practice: provide the **goal and constraints**, not the steps.

**Manual CoT is still essential when:**

| Scenario | Why Manual CoT Is Needed |
|---|---|
| **Visibility required** | Reasoning-native models hide internal traces. If users must *see* the logic (math tutors, legal tools), you must prompt for visible step-by-step output |
| **Specific framework** | `"Use the 5 Whys technique"` or `"Apply First Principles"` — only a manual CoT prompt can force a specific cognitive shape |
| **Legacy/standard models** | GPT-4o, Claude 3.5 Sonnet, Llama 3.1 don't have a native reasoning phase. CoT remains the most effective accuracy booster for these models |

### Native vs. Manual CoT Comparison

| Feature | Native Reasoning (o1, R1) | Manual CoT (GPT-4o, Llama) |
|---|---|---|
| **Primary Trigger** | Automatic (Internal Phase) | Explicit (`"Think step by step"`) |
| **User Visibility** | Often hidden or summarized | Full transparency in response |
| **Prompt Complexity** | Low — focus on the *What* | High — focus on the *How* |
| **Best For** | Hard math, coding, science | Standard apps, low latency needs |

> **Key Insight:** As models get smarter, the designer's job shifts from *micro-managing logic* to *defining high-level constraints and personas*.

---

## 5. Self-Consistency Prompting

**Self-consistency prompting** is an advanced reasoning technique: the model generates multiple diverse reasoning paths for a single problem, then selects the final answer by **majority vote**. The intuition is that complex problems often have multiple valid routes to the correct answer — so consensus is a reliable signal.

### The Self-Consistency Workflow

```
One Question → Multiple Reasoning Paths (5–40 samples) → Extract Final Answers → Majority Vote → Output
```

| Step | What Happens |
|---|---|
| **1. Generate Diverse Paths** | Run the same prompt multiple times with temperature > 0 (e.g., 0.7) to get varied reasoning |
| **2. Extract Final Answers** | Strip the reasoning; isolate only the final conclusion from each path |
| **3. Apply Majority Voting** | The most frequent answer wins — split votes signal low model confidence |

### Accuracy Gains

Most pronounced when the model is uncertain. A majority split (e.g., 3 vs. 2) is a built-in confidence signal — you know to flag that result for human review.

### Single-Path vs. Self-Consistency

| Feature | Standard Chain-of-Thought | Self-Consistency |
|---|---|---|
| **Decoding** | Greedy (one path) | Diverse sampling (multiple paths) |
| **Vulnerability** | "Local optima" — one bad step corrupts the answer | Robust via majority consensus |
| **Cost** | Low latency, low cost | Higher latency and token cost |
| **Best For** | Fast, lower-stakes tasks | Mission-critical accuracy |

---

### 5.1 Follow-up: Is Self-Consistency a Prompting Pattern or a Development Practice?

> 🔍 **Follow-up question explored here:** *"Is self-consistency a prompting technique or a development practice? You mentioned simulating it in a single prompt — I'm confused about the implementation."*

**It's both — with different forms depending on the implementation context.**

#### Form 1: The Development Practice (Multi-Call Workflow)

This is the canonical academic implementation — requires a script or orchestration layer outside the model.

```python
# Simplified Majority Voting Logic
from collections import Counter

results = ["67", "67", "35", "67", "35"]  # Sampled outputs from multiple API calls
vote_counts = Counter(results)
final_answer = vote_counts.most_common(1)[0][0]

print(f"Consensus Result: {final_answer}")  # Output: 67
```

**Steps:**
1. Run the same prompt 5–20 times with temperature = 0.7 (diverse paths).
2. Use regex or a format constraint (`"End with: Final Answer: [X]"`) to extract each conclusion.
3. Run majority voting across all extracted answers.

#### Form 2: The Prompting Pattern (Panel of Experts)

When you cannot run multiple API calls, simulate the process in a single prompt:

```
Identity: Imagine a panel of three world-class experts (A, B, C) specializing in
[Subject 1], [Subject 2], and [Subject 3].

Process:
  1. Each expert provides their own step-by-step reasoning for: [Your Question]
  2. Expert B reviews A's logic; Expert C reviews B's; Expert A reviews C's.
     They flag any logical fallacies or missed constraints.
  3. The experts collaborate to build a unified final answer — incorporating the
     strengths of each approach and discarding anything debunked in critique.

Output: Show each expert's reasoning, the critiques, and the final consensus.
```

#### Implementation Comparison

| Feature | Development Practice (Multi-Call) | Prompting Pattern (Panel of Experts) |
|---|---|---|
| **Independence** | High — each run is truly isolated | Low — later "experts" see earlier ones |
| **Reliability** | Gold standard for mission-critical tasks | Good for brainstorming and broad views |
| **Cost / Latency** | High — pays for full completions each run | Medium — one long completion |
| **Complexity** | Requires coding / orchestration | Purely prompt-based |

> **Key Risk:** In the single-prompt simulation, if the first "expert" makes a mistake, subsequent experts are statistically likely to agree with it to maintain internal consistency — this is **cascading bias**. True self-consistency eliminates this with independence between runs.

### 🧪 Prompt Sample — Panel of Experts (Single Call)

```
Imagine three independent world-class experts:
- Expert A: A clinical pharmacologist
- Expert B: A hospital risk management specialist
- Expert C: A medical ethics consultant

Each expert must independently reason through this question:
"Should a hospital adopt an AI triage system when training data is only
70% demographically representative?"

Step 1: Each expert gives their own step-by-step analysis.
Step 2: Expert B critiques Expert A's logic. Expert C critiques Expert B's.
        Expert A critiques Expert C's. Flag any logical fallacies or missed constraints.
Step 3: All three collaborate to produce a final consensus recommendation.

Show all work, critiques, and the final consensus.
```

*Note: In reality Expert B reads Expert A's text — independence is simulated, not real.
For truly critical decisions, use multiple separate API calls instead.*

---

## 6. Step-by-Step Reasoning (Zero-Shot CoT) + Ask-Verify-Improve Loop

These two patterns often work in combination — the first focuses on *how the model reasons*, the second on *how the output gets refined*.

### Step-by-Step Reasoning (Zero-Shot CoT)

Adding `"Let's think step by step"` forces the model to allocate more computation to the underlying logic before producing a final answer. This shifts the model from surface-level word prediction to a structured reasoning chain.

| Benefit | Why It Matters |
|---|---|
| **Accuracy** | Best accuracy boost for math, logic, and factual retrieval |
| **Transparency** | Provides a "paper trail" — you can see exactly where reasoning went wrong |
| **Compatibility** | Still useful even for reasoning-native models when you need to define a custom logical framework |

> **Example:** `"A train travels 60 mph for 2 hours. Let's think step by step. How far does it travel?"` → The model decomposes: distance = speed × time = 60 × 2 = 120 miles.

---

### The Ask-Verify-Improve Loop

Also called the **Self-Refine loop** — the model acts as both creator and critic within a single interaction. This catches failure modes (hallucinations, generic phrasing, missed constraints) that a single-pass prompt often misses.

**The three phases:**

```
GENERATE → VERIFY → REFINE
```

| Phase | What Happens |
|---|---|
| **Generate** | Model creates an initial "baseline" output from the primary instructions |
| **Verify (Critique)** | Model (or external system) evaluates the baseline against specific criteria: tone, accuracy, formatting |
| **Refine (Correct)** | Model generates a final version incorporating the critique — discarding weak logic, polishing language |

**Example prompt structure:**

```
Step 1: Write a summary of the attached text.
Step 2: Review your summary — check that it covers the main argument, is under 100 words, and avoids jargon.
Step 3: Rewrite the summary incorporating your critique.
```

**Best used for:** Creative writing, code refactoring, strategic planning — tasks where "quality" is subjective or multi-dimensional.

---

### Comparison: Step-by-Step Reasoning vs. Ask-Verify-Improve

| Feature | Step-by-Step Reasoning | Ask-Verify-Improve Loop |
|---|---|---|
| **Core Action** | Decomposition of the problem | Iterative refinement of the solution |
| **Workflow** | Linear — one path from A to B | Cyclical — back-and-forth refinement |
| **Best For** | Math, logic, and factual retrieval | Writing, coding, and creative polish |
| **Trade-off** | Redundant for reasoning-native models | Increases token cost and latency |

### 🧪 Prompt Sample — Ask-Verify-Improve

```
Step 1 — GENERATE:
Write a 150-word persuasive email to a hiring manager explaining why I'm the right
fit for a Senior Product Manager role, even though I don't have a CS degree.
Emphasize customer empathy, cross-functional leadership, and shipping track record.

Step 2 — VERIFY:
Review the email you just wrote. Check for:
- Does it directly address the "no CS degree" concern without dwelling on it?
- Is the tone confident but not arrogant?
- Are all three strengths (empathy, leadership, shipping) actually present?
- Is it under 150 words?
List any issues found.

Step 3 — REFINE:
Rewrite the email addressing every issue you identified in Step 2.
Do not include the critique in the final output — only the improved email.
```

---

## 7. Quick Reference — All Patterns at a Glance

| Pattern | Core Idea | When to Use | Main Trade-off |
|---|---|---|---|
| **Zero-Shot** | Task only, no examples | Simple, well-known tasks | May be too generic for complex tasks |
| **Few-Shot** | Task + demonstrations | Complex formats, nuanced style | Requires example curation |
| **Role Prompting** | Assign a persona/identity | Any task needing tone or expertise shift | Overly broad roles give generic results |
| **Chain-of-Thought** | "Think step by step" | Multi-step math, logic, technical reasoning | Redundant for reasoning-native models |
| **Self-Consistency** | Multiple paths + majority vote | Mission-critical accuracy | High cost — multiple API calls |
| **Panel of Experts** | Simulate self-consistency in one prompt | When multi-call isn't possible | Cascading bias risk |
| **Ask-Verify-Improve** | Generate → Critique → Refine | Writing, code review, creative tasks | Higher token cost and latency |

---

## Quiz — Deep Understanding Check

Test yourself. Answers are hidden — reveal each one after you've thought it through.

---

**Q1. You're building a customer support chatbot. The brand voice is very specific — warm, slightly informal, and never robotic. You have 10 real agent transcripts. Which pattern(s) would you use, and why?**

<details>
<summary>💡 Answer</summary>

Use **Few-Shot prompting** with examples drawn from the real transcripts, combined with **Role Prompting** in the system message.

- Few-shot is the right choice because "warm but slightly informal and never robotic" is a nuanced style that is nearly impossible to describe declaratively. Showing 3–5 real transcript examples removes ambiguity about what that voice actually sounds like.
- Role prompting anchors the persona persistently — especially important for a multi-turn chatbot where the model could drift over a long conversation.
- Zero-shot alone would fall back on the statistical average of "customer support" — which is exactly the robotic tone you're trying to avoid.

</details>

---

**Q2. A reasoning-native model (like OpenAI o1) is giving you subtly wrong answers on a legal analysis task. You add "Let's think step by step" to the prompt, but accuracy gets worse. Why might that happen?**

<details>
<summary>💡 Answer</summary>

Reasoning-native models are trained via Reinforcement Learning to self-optimize their internal reasoning chain. When you add explicit CoT instructions, you are **interfering with a process that is already running internally**.

The model may:
1. Try to follow your explicit instruction *and* its own internal chain — creating a conflict.
2. Spend output tokens on a verbosely structured reasoning trace instead of deeper reasoning.
3. "Overthink" straightforward sub-steps the model would otherwise resolve efficiently in its hidden phase.

**Fix:** Remove explicit CoT instructions. Instead, provide the goal, constraints, and output format — let the model's internal reasoning do its job. Only add manual CoT if you need a *specific framework* (e.g., "Apply the IRAC framework: Issue, Rule, Application, Conclusion").

</details>

---

**Q3. What is the key failure risk of the Panel of Experts pattern, and how does it structurally differ from true self-consistency?**

<details>
<summary>💡 Answer</summary>

The key failure risk is **cascading bias** (also called recency bias within a single stream):
- In a single prompt, "Expert B" can see Expert A's reasoning. If Expert A makes an error, Expert B is statistically likely to *echo that error* to maintain internal consistency in the text stream.
- This is fundamentally different from true self-consistency, where each API call is isolated — Expert B literally cannot see Expert A's answer.

**Structural difference:**
- **Panel of Experts**: Simulated independence — all within one completion, one probability stream.
- **True Self-Consistency**: Real independence — each run is a separate stochastic sample with no shared context.

This is why the Panel of Experts is good for brainstorming but not for mission-critical math or medical reasoning.

</details>

---

**Q4. You want to classify whether support tickets are "urgent" or "non-urgent." You have no labeled examples. Which pattern is most appropriate, and what specific design choices would you make?**

<details>
<summary>💡 Answer</summary>

Start with **Zero-Shot prompting** — it's the right first choice when you have no labeled data and the task definition is clear.

Design choices:
1. **Be specific in the task definition:** Define what "urgent" actually means (e.g., "service is down," "revenue impact," "data breach") rather than leaving it to the model's interpretation.
2. **Use an output indicator:** End the prompt with `"Classification:"` to anchor the response.
3. **Assign a role:** `"You are a support triage specialist..."` to improve domain-specific judgment.
4. **Define the label space explicitly:** `"Classify as exactly one of: Urgent or Non-Urgent."`

If accuracy is insufficient with zero-shot, escalate to few-shot with 3–5 labeled examples covering edge cases (e.g., mildly frustrated vs. actually blocked).

</details>

---

**Q5. How does temperature interact with self-consistency, and what would happen if you ran self-consistency with temperature = 0?**

<details>
<summary>💡 Answer</summary>

**Temperature controls the diversity of reasoning paths.** Self-consistency relies on sampling *different* trajectories to identify the most robust answer.

- At **temperature = 0** (greedy decoding), the model deterministically picks the single highest-probability token at every step. Every run of the same prompt produces **exactly the same output**.
- Running self-consistency at temperature = 0 is therefore meaningless — you'd get 20 identical answers and "majority vote" would just return that one answer with 100% votes. No diversity, no validation.
- At **temperature ≈ 0.7**, the model samples from the top probability tokens — introducing enough variation that different reasoning paths emerge, making majority voting meaningful.

> Rule of thumb: self-consistency requires temperature > 0 to function correctly. The optimal range is typically 0.5–0.9.

</details>

---

**Q6. What is "vocabulary re-weighting" in the context of role prompting, and how does it connect to the underlying probability mechanics of LLMs?**

<details>
<summary>💡 Answer</summary>

An LLM generates each token by computing a probability distribution over its entire vocabulary. The prompt acts as a *conditioning signal* that shifts those probabilities.

**Vocabulary re-weighting** is exactly this shift:
- Assigning the role `"Medical Professional"` raises the probability of tokens like "myocardial infarction," "prognosis," and "contraindication."
- This doesn't add new information to the model — it filters the probability space so that the "clinical language cluster" becomes the path of least resistance.
- Simultaneously, it *lowers* the probability of casual or incorrect terminology — "heart attack" drops in likelihood, "myocardial infarction" rises.

This is why a more specific persona (e.g., "cardiac surgeon specializing in minimally invasive procedures") produces more targeted vocabulary re-weighting than a generic one (e.g., "doctor").

</details>

---

**Q7. Describe a situation where the Ask-Verify-Improve loop would outperform both Zero-Shot and CoT prompting. What makes this loop uniquely suited to that situation?**

<details>
<summary>💡 Answer</summary>

**Best situation:** Code refactoring review, or writing a persuasive essay with specific constraints.

**Why:**
- Zero-shot produces a single output with no mechanism to catch errors.
- CoT improves how the model *arrives* at an answer, but the final output is still generated in one pass.
- The Ask-Verify-Improve loop adds a **dedicated critique phase** — the model explicitly evaluates its own output against stated criteria *before* producing the final version.

**Why it's uniquely suited:**
Tasks like refactoring or persuasive writing involve multi-dimensional quality criteria (correctness + readability + tone + constraint adherence). No single-pass prompt can optimize all axes simultaneously. The critique phase surfaces which criteria were missed in the first pass, and the refinement phase addresses them specifically — similar to a code review workflow.

</details>

---

**Q8. You're told to "always use few-shot prompting for reliability." Is this advice always correct? When would few-shot actually hurt performance?**

<details>
<summary>💡 Answer</summary>

No — few-shot can hurt performance in specific cases:

| Scenario | Why Few-Shot Hurts |
|---|---|
| **Unrepresentative examples** | If examples don't cover the distribution of real inputs, the model over-fits to the example patterns instead of generalizing |
| **Contradictory examples** | Inconsistent labels or formatting in examples confuses the model more than zero-shot would |
| **Recency bias on a specific example** | The last example has disproportionate influence — if it's an edge case, that edge case becomes the default behavior |
| **Reasoning-native models on logic tasks** | Few-shot can constrain the model's native reasoning chain to a specific thought pattern, reducing flexibility |
| **Very long examples** | On models with limited context windows, long few-shot examples eat into the space available for the actual task |

> **Rule:** Few-shot is powerful, but only with *high-quality, representative, consistently formatted* examples. Bad examples are worse than no examples.

</details>

---

**Q9. A product manager tells you: "We want the AI to evaluate its own output." Is self-refine (Ask-Verify-Improve) the right pattern? What are the known limitations of using a model to evaluate itself?**

<details>
<summary>💡 Answer</summary>

**Self-refine is a reasonable starting point, but it has important limitations:**

1. **Self-bias:** The model tends to rate its own outputs as correct or high-quality — the same biases that produced the initial output also affect the critique. It cannot easily detect its own blind spots.
2. **Hallucination consistency:** If the model hallucinated a fact in the initial output, it may judge that fact as "correct" in the verification phase, because the hallucinated "knowledge" is internally consistent.
3. **No ground truth:** The model has no external oracle to verify against — it can only evaluate whether the output *sounds right* relative to its training distribution, not whether it *is right*.

**Better architecture:** Use a **separate validator** — either a second model call with a different system prompt (acting as a critic), a rules-based checker (e.g., regex for format validation), or a human-in-the-loop step for high-stakes decisions.

</details>

---

**Q10. What would happen if you used the same prompt for both Zero-Shot CoT and Few-Shot CoT on the same problem? Which would win, and under what conditions might the other outperform?**

<details>
<summary>💡 Answer</summary>

**Few-Shot CoT is generally the stronger approach** because it provides concrete demonstrations of the reasoning process, not just a trigger phrase.

Zero-Shot CoT (`"Let's think step by step"`) works by activating latent reasoning capability — but the *path* the model takes is unconstrained. It may use an inefficient or partially incorrect framework.

Few-Shot CoT shows the model *exactly* what the reasoning chain should look like — reducing the search space for the reasoning path.

**When Zero-Shot CoT can win:**
1. **Domain familiarity:** For well-studied problems (standard arithmetic, common logic puzzles), the model's internal reasoning is already optimal — few-shot examples add no new guidance and may constrain it.
2. **Diverse problem types:** If examples don't closely match the target problem, few-shot CoT can mislead — the model may try to follow the *form* of the examples rather than solving the actual problem.
3. **Cost and latency sensitivity:** Zero-shot CoT tokens are cheap (just a trigger phrase); few-shot CoT examples can consume hundreds of tokens per example.

> **Rule of thumb:** Start with Zero-Shot CoT. If accuracy is insufficient, add few-shot CoT examples that closely match the structure and difficulty of your real queries.

</details>

---

*File last updated: March 2026 — Part of the Prompt Engineering module, AI Engineering Learning Journey.*
