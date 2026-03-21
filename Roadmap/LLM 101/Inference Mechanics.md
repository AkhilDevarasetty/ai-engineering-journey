# Inference Mechanics (Runtime Layer)

> ⚠️ This topic is very underrated in beginner courses — but it's critical for anyone building on top of LLMs.

---

## 1. What is Inference?

**Inference** is the process of a trained model generating an output based on an input (prompt). Think of it as the **"running" phase** — the model doesn't learn anything new during inference; it just uses what it already knows to calculate the most likely next token.

---

## 2. What is Sampling?

**Sampling** is the mathematical selection process used to pick the next token from a list of possibilities.

When you give a prompt, the LLM doesn't just "know" the next word. Instead, it calculates a **probability score for every word in its entire vocabulary**. Sampling techniques — **Temperature**, **Top-K**, and **Top-P** — are the rules we set to decide which of those high-scoring words actually gets chosen.

---

## 3. Temperature, Top-K, Top-P

### The Shared Example

Imagine the model is predicting the next word for: `"The cat sat on the..."`

| Word | Probability |
|---|---|
| mat | 40% |
| rug | 35% |
| floor | 15% |
| pizza | 5% |
| refrigerator | 5% |

---

### Temperature — The "Mood" Slider

Temperature controls **how confident or adventurous** the model is when selecting the next token. It works by reshaping the probability distribution.

**Low Temperature (0.1 – 0.5) → Sharper distribution**
- Exaggerates the gaps between probabilities
- `"mat"` might jump from 40% to 95%
- The model almost always picks the safest, most likely choice
- Graphed: looks like a sharp needle pointing at one word

**High Temperature (1.2 – 2.0) → Flatter distribution**
- Shrinks the gaps between probabilities
- `"pizza"` might rise from 5% to 15%
- "Underdogs" (low-probability words) get a much better fighting chance
- Graphed: looks like a gentle flat wave where all words feel similar

**The Mountain Analogy:**
> Think of the probability scores as a mountain range. Temperature changes the "gravity" of those mountains.
> - **Low temp** = makes tall mountains taller and small hills disappear → *certainty*
> - **High temp** = melts the mountains and fills in the valleys → *creativity*

**Creative Writing Example:**

Completing: `"The old clock on the wall..."`

| Setting | Output | Result |
|---|---|---|
| Low Temp (0.2) | `"...ticked loudly."` | Predictable — reliable but common phrasing |
| High Temp (0.9) | `"...whispered the hours."` | Creative — uses a metaphor that's less likely but more poetic |

> **Does High Temperature just add nonsense?** Not exactly. A model at low temp acts like a *perfectionist* — always picking the most statistically obvious word. At high temp, it acts like a *brainstormer* — considering synonyms or related concepts that aren't the most likely but are still contextually relevant. The risk of true nonsense is where Top-K and Top-P step in.

---

### Top-K — The "Shortlist" Filter

Top-K limits the pool of candidates to only the **K highest-probability words**.

**Example with K = 2:**
- Only `mat` and `rug` remain in the pool.
- Even if `floor` makes sense, the model is physically blocked from choosing it.
- Keeps output very safe and focused.

---

### Top-P (Nucleus Sampling) — The "Probability Cutoff"

Top-P keeps only enough top words to **cumulatively reach probability P**.

**Example with P = 0.80:**
- `mat` (40%) + `rug` (35%) = 75% → Not enough yet
- + `floor` (15%) = 90% → Threshold crossed ✅
- The model now chooses between `mat`, `rug`, and `floor`
- `pizza` and `refrigerator` are excluded — they fall outside the top 80% of confidence

---

### How They Work Together (The Stack)

When used together, they follow this order:

1. **Top-K / Top-P (The Filter)** — First, remove trash words (e.g., `banana`, `refrigerator`)
2. **Temperature (The Probability Shifter)** — Then, decide how much to favor the safe pick vs. the creative underdog

| Setting | Effect | Best For |
|---|---|---|
| Low Temp + Low Top-P | Very safe, repetitive | Code, math, legal |
| High Temp + High Top-P | Creative, surprising | Poetry, brainstorming |

> **Note:** Top-K and Top-P are *filtering* techniques (they control which words stay in the pool). Temperature is a *distribution* technique (it controls the weight of the words inside that pool). They do fundamentally different things.

---

## 4. Deterministic vs. Stochastic Decoding

These terms describe **how the model picks the next token** after probabilities are calculated.

### Deterministic Decoding — The "Robot"

The model always picks the token with the **absolute highest probability**. Same input = same output, always.

- **Settings:** `Temperature = 0`
- **Tools:** Greedy Search, Beam Search
- **Best for:** Math, code, technical translation — tasks with one right answer
- **Downside:** Can become repetitive or loop because it refuses any path other than the most likely one

### Stochastic Decoding — The "Artist"

The model **randomly samples** from the probability distribution. Same input ≠ same output.

- **Settings:** `Temperature > 0` (usually 0.7–1.2), with Top-K or Top-P
- **Tools:** Sampling (Temperature, Top-K, Top-P)
- **Best for:** Creative writing, chatting, brainstorming
- **Downside:** Can hallucinate or drift off-topic

### Key Comparison

| Feature | Deterministic | Stochastic |
|---|---|---|
| Selection Rule | Always pick the highest probability token | Randomly pick based on a weighted distribution |
| Consistency | Identical output for identical input | Different output every run |
| Primary Tool | Greedy Search / Beam Search | Sampling (Temp, Top-K, Top-P) |
| Feel | Logical, reliable, but repetitive | Creative, fluid, surprising |

### How the Settings Map to the Categories

| Setting | Decoding Type | Why |
|---|---|---|
| `Temp = 0` | Deterministic | Always picks the #1 most likely word — no randomness |
| `Temp > 0` | Stochastic | Randomly picks from a pool of likely words |

**Restaurant Analogy:**
- **Deterministic (Greedy):** You always order the #1 best-selling dish. No variation, ever.
- **Stochastic (Sampling):** You look at the top 3 best-sellers and roll a die to decide.

> **Quick summary:** Deterministic = "Robot mode" (100% predictable). Stochastic = "Human-like mode" (probability-based randomness). Sampling is the math that creates that randomness. Top-K and Top-P are *stochastic-only* tools — they don't matter in deterministic mode since you're always picking #1 anyway.

---

## 5. Beam Search

Beam Search is a **deterministic decoding method** that sits between Greedy Search (pick best word now) and Sampling (random). It avoids shortsighted decisions by planning ahead.

### Core Concept: "Looking Ahead"

- **Greedy Search:** Picks the single best word *right now*. Shortsighted.
- **Beam Search:** Keeps track of the **top N most likely sequences** simultaneously. These parallel paths are called **Beams**.

### The Chess Player Analogy

> A greedy chess player only looks at the move that captures the most valuable piece right now.
> A Beam Search player looks at the 3 best possible moves and simulates what the board looks like 2 moves later for each. They pick the path that leads to the best overall position, even if the first move wasn't the most aggressive.

### How It Works (Step-by-Step Example)

Translating a sentence with **Beam Width = 2**:

| Step | Paths Tracked |
|---|---|
| Step 1 | `"The"` (0.6), `"A"` (0.3) — both kept |
| Step 2 | `"The cat"`, `"The dog"` / `"A lion"`, `"A mouse"` |
| Step 3 | Scores: `"The cat"` (0.5), `"The dog"` (0.4), `"A lion"` (0.7), `"A mouse"` (0.2) |
| Step 4 | Discard the two lowest → Keep `"The cat"` and `"A lion"` |

> Even though `"The"` was the more likely first word (0.6 vs 0.3), the `"A lion"` path scored higher overall — Beam Search catches this. Greedy would have missed it.

### Greedy vs. Beam Search

| Feature | Greedy Search | Beam Search |
|---|---|---|
| Focus | Next word only | Full sequence |
| Quality | Often repetitive | Structurally sound |
| Speed | Very fast | Slower |
| Best Use Case | Simple chat | Translation, summarization |

### The Memory Trade-off

- **Beam Width = 1** → Identical to Greedy Search
- **Beam Width = 5** → The model writes 5 versions of the sentence simultaneously and picks the best

More beams = better quality, but more RAM and compute.

### Who Controls Beam Width?

| User Type | Access |
|---|---|
| End users (ChatGPT, etc.) | Not adjustable — stochastic sampling is used instead |
| Developers (Big 3 APIs) | Usually not adjustable — managed by the provider |
| ML Engineers (self-hosted) | Fully adjustable |

> **Summary:** Beam Search is the "plan ahead" tool for deterministic models. It prevents a high-probability mistake early in the sentence from ruining the logic of the entire output. It is deterministic — same input always produces the same output.

---

## 6. Log Probabilities (Logprobs)

### The Problem: "The Vanishing Number"

LLMs have vocabularies of 50,000+ words. For a sentence, probabilities get multiplied together:

```
"The" (0.1) × "cat" (0.05) × "sat" (0.01) = 0.00005
```

By the time you evaluate a 50-word paragraph, the number becomes astronomically small — too tiny for computers to handle accurately. This is called **numerical underflow**.

### The Solution: Logarithms

Logarithms convert multiplication into addition and turn tiny decimals into manageable negative numbers.

| Probability | Log Probability | Meaning |
|---|---|---|
| 1.0 (100%) | 0 | Absolute certainty |
| 0.5 (50%) | -0.69 | A coin flip |
| 0.1 (10%) | -2.30 | Fairly likely |
| 0.01 (1%) | -4.60 | Unlikely |
| 0.0001 (0.01%) | -9.21 | Very rare |

> **Rule of Thumb:** Closer to 0 = more likely. More negative = less likely. Since probabilities can never exceed 1.0 (100%), the "best" logprob score you can ever get is 0. Everything else is negative.

### Why Logprobs Are Negative (and Not 1–100)

In math, `log(x)` for any `x` between 0 and 1 is always negative:

```
Log(1.0)  =  0     (100% chance)
Log(0.5)  = -0.3   (50% chance)
Log(0.1)  = -1.0   (10% chance)
Log(0.01) = -2.0   (1% chance)
```

Using linear 1–100 scores would fail to capture the *exponential* differences between probabilities. The difference between 0.0001% and 0.01% is 100× — but they look almost identical on a linear scale.

### The "Penalty Score" Mental Model

Think of a sentence's total logprob as a **"debt" score**:
- Every token that isn't 100% certain adds a bit of negative debt
- **A confident sentence:** total logprob ≈ `-5.2` (very little debt)
- **A gibberish sentence:** total logprob ≈ `-150.8` (huge debt; model was uncertain at every step)

And because `Log(A × B) = Log(A) + Log(B)`, we can simply **add** instead of multiply — which is what makes this computable.

### Why Calculate the Whole-Sentence Score?

For simple greedy chatting, you only need the current token's probability. But for smarter tasks, the **total logprob sum** matters:

| Use Case | Why Total Logprob Is Needed |
|---|---|
| **Beam Search** | To compare which of several multi-word paths is most "correct" overall |
| **Model Ranking / Perplexity** | To measure how "surprised" the model is by a sentence (natural vs. scrambled) |
| **Training / Loss** | During training, logprob sums are used as the "Total Loss" — the model adjusts its weights to push this number closer to 0 |

**Beam Search Example:**
- Path A: `"The weather"` (-0.1) + `"is"` (-0.1) + `"bad"` (-0.8) = **Total: -1.0**
- Path B: `"The apple"` (-1.5) + `"is"` (-0.1) + `"tasty"` (-0.2) = **Total: -1.8**
- Path A wins — it was the more confident sequence.

### Developer Use Cases for Logprobs

Many APIs (like OpenAI) let you inspect logprobs directly. Useful for:

- **Measuring confidence:** A top token at logprob ≈ 0 means the model is certain. A logprob of -3.0 means it's guessing
- **Classification:** Ask `"positive or negative?"` → check logprobs for `"Positive"` vs `"Negative"` to see how strongly it leans
- **Hallucination detection:** If the model states a fact (like a date) with a very negative logprob, it may be hallucinating

---

## 7. Why Sampling Affects Reliability

Sampling makes the model **stochastic (random)**, which directly conflicts with **reliability (consistency)**.

### 1. The Dice Roll Problem

Reliability means: "Same question → same answer." With sampling, every request is a metaphorical dice roll. You might get a perfect answer at 1:00 PM and a hallucination at 1:05 PM because the model gambled on a low-probability token.

### 2. Fact vs. Creativity

Sampling is designed to avoid clichés — great for a poem, terrible for a math formula:
- `Temperature = 0` → `2 + 2 = 4` (100% probability, deterministic)
- `Temperature = 1.5` → `2 + 2 = 5` (model took a "creative risk" on a 0.1% token)

### 3. Error Propagation (The Butterfly Effect)

LLMs generate text one token at a time. A single wrong word early in a sentence changes the context for every word that follows. If the model samples a slightly incorrect word at the start, the rest of the sentence must *pivot to make sense of that mistake*. This leads to **"drifting"** — the model starts strong but ends up talking nonsense by the end.

### 4. Harder to Debug

If a user reports that the AI gave a wrong or rude answer, a developer might be unable to reproduce it — because the sampling dice landed differently the next time.

### When to Use Each Setting

| Task Type | Reliability Needed | Recommended Setting |
|---|---|---|
| Legal / Medical / Code | High | `Temperature = 0` (Deterministic) |
| Data Extraction | High | `Temperature = 0` |
| Chatbots / Stories | Medium | `Temperature = 0.7–0.9` |
| Marketing Copy / Poetry | Low | `Temperature = 1.0+` |

> **Summary:** Sampling trades accuracy for variety. The more you sample (higher Temp / Top-P), the less you can trust the model to stick to the facts.

---

## 8. Context Length Limits

Every LLM has a **Context Window** — the maximum number of tokens it can hold in its "active memory" at any one time. Think of it as a short-term memory limit.

### The Sliding Window Problem

When a conversation exceeds the context limit, the model **truncates the beginning** — it doesn't stop working, it forgets:

- Limit: 8,000 tokens, Input: 10,000 tokens → First 2,000 tokens are silently deleted
- The model loses track of your original instructions, uploaded data, or early context

### The Computational Cost of Attention

To generate the next token, the model looks back at **every single token** in the current context (via attention). This means:

> **Doubling the context length ≈ 4× more compute** (Quadratic Scaling)

This is why "infinite context" is technically difficult and expensive to achieve.

### Modern Context Window Sizes

| Model | Context Limit (Approx.) | Real-World Scale |
|---|---|---|
| GPT-4o | 128,000 tokens | A 300-page book |
| Claude 3.5 | 200,000 tokens | A massive technical manual |
| Gemini 1.5 Pro | 1,000,000–2,000,000 tokens | An entire codebase or hours of video |
| Llama 3 (8B) | 8,000 tokens | A long academic essay |

### The "Lost in the Middle" Phenomenon

> Even with a large context, models don't perform equally across the entire window. LLMs tend to best remember information at the **beginning** and **end** of a prompt. Facts buried in the middle of a large document are statistically more likely to be missed.
>
> **Context Length ≠ Context Quality.**

### How Developers Manage the Limit

- **Summarization:** Condense previous conversation turns into a short summary before each new request
- **RAG (Retrieval):** Provide only the relevant paragraphs from a large document — not the whole thing

---

## 9. Token Streaming

**Token streaming** is the process where an LLM sends its response **one token at a time as it is generated**, rather than waiting for the entire answer to be complete before sending anything.

This is what creates the familiar "typewriter" effect you see in ChatGPT.

### How It Works

Instead of a batch process (you wait 10 seconds, then the whole paragraph appears), the server uses a **persistent connection** — typically via **Server-Sent Events (SSE)** — to push each new token to your screen instantly:

1. **Generation** — The model predicts the next token
2. **Transmission** — That token is immediately sent to the user's device
3. **Rendering** — The interface appends the token to the existing text

### Key Benefits

| Benefit | Why It Matters |
|---|---|
| **Reduced perceived latency** | Users start reading in 200–500ms, even if the full response takes 10 seconds |
| **Early intervention** | If the model starts going in the wrong direction, you can stop it immediately — saving time and API costs |
| **Natural interaction** | Mimics the pace of human typing, making the AI feel more like a conversational partner |

### Technical Trade-offs

- **State management:** Keeping a persistent connection open puts more pressure on network bandwidth and server resources compared to a simple request-response cycle
- **Interruption risk:** If your internet drops mid-stream, tokens already sent may be lost unless the developer implements a transport layer to persist them

---

## Quiz — Inference Mechanics (Runtime Layer)

**10 Questions**

**1. You set Temperature = 0, Top-K = 50, and Top-P = 0.9 on the same API call. Which setting actually controls the output, and why do the other two become irrelevant?**

- A) Top-P controls the output because it is applied last in the sampling pipeline, overriding the others.
- B) Temperature = 0 makes decoding fully deterministic — the model always picks the single highest-probability token, so the filtering done by Top-K and Top-P has no practical effect since there is only one candidate being chosen.
- C) Top-K = 50 controls the output because it narrows the vocabulary pool first, and Temperature and Top-P only operate within that pool.
- D) All three work simultaneously and together produce a weighted average of their constraints.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. When Temperature = 0, the model is fully deterministic — it always picks the single token with the highest probability. At that point, asking "which of the remaining 50 tokens should I sample?" or "which tokens sum to 90% probability?" is meaningless, because the answer to both is the same token: the top one. Top-K and Top-P are stochastic tools — they only matter when you are *actually sampling* from a distribution. With Temp=0, there is no sampling to do.
</details>
<br>

**2. A chatbot deployed for a legal firm starts giving slightly different answers to the same contract clause every time it is queried. The team wants 100% consistency. They set Temperature = 0. Two weeks later, developers report they can no longer reproduce a bug a client found. What is the ironic tradeoff they have stumbled into?**

- A) Temperature = 0 increased hallucination rates, which caused the unreproducible bug.
- B) Deterministic decoding at Temperature = 0 guarantees identical outputs — but also means any bug that *does* occur will reproduce identically every time, so the bug must have been caused by a different variable like a changed prompt or context window truncation.
- C) Setting Temperature = 0 silently switches the model to Beam Search, which has different sampling behavior.
- D) There is no tradeoff — Temperature = 0 both guarantees consistency and prevents bugs.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This is a subtle but important systems-thinking question. Temperature = 0 is fully deterministic — the same prompt always produces the same output. So if the team can't reproduce the bug, the input itself must have changed (different context, truncated history, or a different prompt). The irony is that deterministic decoding actually *helps* reproducibility — the unreproducible bug points to a non-sampling issue like context window overflow silently dropping early instructions. This is a real-world debugging trap.
</details>
<br>

**3. Beam Search is described as "deterministic" and "better quality" than Greedy Search. Yet most production chat systems (like ChatGPT) do NOT use Beam Search — they use stochastic sampling instead. Why would a company choose a "lower quality" deterministic approach when a "better" one exists?**

- A) Beam Search cannot be parallelized on GPUs, making it physically impossible to run at production scale.
- B) Beam Search is only deterministic for translation tasks — it behaves stochastically for open-ended chat.
- C) Beam Search optimizes for the highest-probability sequence, which tends to produce repetitive, "safe," and robotic-sounding text in open-ended generation. Stochastic sampling produces more varied, natural-feeling responses — which is what users actually prefer in conversation, even if it is statistically "less optimal."
- D) Beam Search requires access to the full generated output before sending the first token, making token streaming impossible.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. "Highest probability" and "highest quality" are not the same thing in open-ended generation. Beam Search finds the most statistically likely sequence — which often results in bland, over-used phrasing because common phrases dominate probability distributions. For a chat assistant that needs to feel natural, creative, and engaging, stochastic sampling (with controlled temperature) actually produces better *perceived* quality, even though it is less mathematically optimal. Additionally, D has some truth — Beam Search is harder to stream token-by-token because it needs to evaluate multiple paths simultaneously.
</details>
<br>

**4. A developer notices that increasing Top-P from 0.7 to 0.95 (while keeping Temperature constant) dramatically changes the model's outputs. A colleague argues: "Top-P and Temperature both add randomness — they're basically the same thing." What is wrong with that reasoning?**

- A) Nothing is wrong — Top-P and Temperature are indeed equivalent ways to control randomness.
- B) Top-P is applied before the model calculates probabilities; Temperature is applied after — so they operate at completely different stages of computation.
- C) Top-P is a *filtering* technique that controls *which words are eligible* to be sampled. Temperature is a *distribution* technique that controls *how much weight* is given to each eligible word. They do fundamentally different jobs — one sets the candidate pool, the other reshapes the odds within that pool.
- D) Top-P has no effect when Temperature is above 1.0, so they only overlap at mid-range settings.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. This is the most commonly misunderstood aspect of sampling. Top-P (and Top-K) are filters — they cut off low-probability candidates from the pool entirely. Temperature is a probability reshaper — it adjusts *how confident or spread-out* the probabilities are for the words that remain. Think of it as: Top-P decides "who's allowed in the room," and Temperature decides "how the votes are weighted once everyone is inside." They are complementary, not duplicates. You can have a large Top-P pool (many candidates eligible) with low Temperature (still likely to pick the top one), or a small Top-P pool with high Temperature (randomly choosing from a short list).
</details>
<br>

**5. An LLM generates the sentence: "The capital of Australia is Sydney." This is factually wrong (it's Canberra), yet the model stated it confidently. A developer checks the logprob for "Sydney" and finds it is much closer to 0 than the logprob for "Canberra." What does this tell you about the nature of logprobs and hallucination?**

- A) It proves the model is broken and needs to be retrained immediately.
- B) It confirms that logprobs measure statistical frequency in training data, not factual correctness. "Sydney" is the most famous Australian city and likely appeared far more often near phrases like "capital of" in training text — so the model assigns it high confidence, despite being wrong. High logprob ≠ true.
- C) It means the model has low temperature settings that are causing it to over-commit to wrong answers.
- D) It proves Top-P filtering is too aggressive and is blocking "Canberra" from being selected.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This is a perfect illustration of the hallucination mechanism. Logprobs reflect what the model learned from the statistics of its training data — not ground truth. "Sydney" appears enormously often in text associated with Australia, and its name recognition dwarfs Canberra's. So the model assigns it very high probability (close to logprob 0) even though it's wrong. A logprob near 0 means "the model was very confident" — not "the model was correct." This is exactly why logprob analysis is used for hallucination *detection*: a surprisingly high-confidence wrong answer is a red flag that training data had a statistical skew.
</details>
<br>

**6. You are building a RAG system where retrieved document chunks are injected into the prompt. Your context window is 128,000 tokens. A user uploads a 200-page PDF. You fit the entire document into the context. The model still misses a key fact that was clearly present in the document. What phenomenon explains this, and what would you do instead?**

- A) The model has a bug and needs to be patched — fitting a document in the context guarantees it will be processed.
- B) The "Lost in the Middle" phenomenon — LLMs disproportionately attend to information at the beginning and end of the context. Facts buried in the middle of a large document are statistically more likely to be missed, even if they fit within the context window. The fix is to use RAG properly: retrieve only the most semantically relevant chunks rather than dumping the entire document.
- C) 200 pages exceeds the model's context window, so the overflow is silently truncated and the fact is deleted.
- D) The quadratic scaling of attention means the model ran out of compute mid-document and skipped the last sections.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. Context length ≠ context quality — this is one of the most important practical nuances in LLM engineering. Even though the full document fits, the model's attention mechanism is not uniform across a 200-page window. Information at the start and end of the prompt receives stronger attention; information packed into the middle often "fades." The correct architectural response is not to stuff the entire document, but to use semantic retrieval (embeddings + vector search) to pull only the 3–5 most relevant chunks and feed those. This connects directly to *why embeddings power RAG* — you saw this in the Tokenization & Embeddings study material.
</details>
<br>

**7. Two models produce the same final answer to a question. Model A has a total sentence logprob of -4.1. Model B has a total sentence logprob of -22.7. Both answers look identical to a human reader. Which model would you trust more, and why — and what might cause the large gap?**

- A) Model B is more trustworthy because a lower (more negative) logprob means the model thought harder about the answer.
- B) Both models are equally trustworthy since the final text is identical.
- C) Model A is more trustworthy. A logprob of -4.1 means the model was highly confident at each token step — very little "debt" accumulated. Model B's -22.7 means it was uncertain at many token choices along the way, which may indicate it was reconstructing the answer from weak associations rather than strong learned patterns. The gap could be caused by Model B being a smaller or less capable model, a different tokenizer, or the fact that Model B was generating from a domain it has less coverage of.
- D) Neither can be compared — logprobs are relative to each model's vocabulary and cannot be used to evaluate confidence.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. The "penalty debt" mental model applies here. A total logprob of -4.1 means the model accumulated very little uncertainty across the whole sentence — it was confident at nearly every token. A total of -22.7 means the model was unsure at many steps and had to "commit" to lower-probability tokens to keep the sentence coherent. Even if the final text looks the same, Model B's path to that answer was statistically shakier — more likely to be a lucky reconstruction than a grounded recall. Note: D has some truth (logprobs are model-specific), but the principle of using them to measure internal confidence within a single model is valid and widely used.
</details>
<br>

**8. A user complains: "I asked the AI to write a poem and it was boring and repetitive." The developer checks the settings: Temperature = 0.2, Top-P = 0.6, Top-K = 5. What is wrong and why — and what is the risk of simply inverting all settings to Temperature = 1.5, Top-P = 0.99, Top-K = 200?**

- A) The settings are fine — the problem is that the user is not giving a detailed enough prompt.
- B) The current settings are too restrictive: low temperature + small Top-P/Top-K means the model picks from a tiny pool of the most statistically likely words, producing predictable and clichéd outputs. However, simply inverting to maximum settings introduces the risk of the temperature selecting genuinely nonsensical tokens (e.g., unrelated words) that the now-large Top-K/Top-P pool fails to filter out — the "safety net" becomes too wide.
- C) Top-K = 5 is the only problem — raising it to 50 alone would solve the creativity issue without needing to touch Temperature or Top-P.
- D) Temperature = 0.2 is the only problem — the other two settings have no effect on creativity.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This tests understanding of how the three parameters interact as a system, not in isolation. The current config is the literary equivalent of always ordering the restaurant's #1 best-seller from a menu of 5 items — safe but dull. The fix for creative writing is a balanced raise: Temperature around 0.8–1.1 (let underdogs compete), Top-P around 0.85–0.92 (meaningful pool without including junk), Top-K moderate (a reasonable shortlist). Extreme settings in the other direction remove the safety net — a very high temperature combined with a very large Top-P/Top-K pool means the model can genuinely pick bizarre tokens and drift badly, which is the "nonsense risk" discussed in the study material.
</details>
<br>

**9. Token streaming sends tokens to the user as they are generated rather than waiting for the full response. A developer proposes using streaming for a legal document drafting tool where lawyers must review the full clause before accepting it. A colleague argues this is a bad idea. Who is right and why?**

- A) Streaming is always beneficial — it reduces latency for every use case without exception.
- B) The colleague is right for this specific use case. Streaming's benefit is *perceived* latency reduction — useful when users consume text as it arrives (like reading a chat response). For legal document review, the lawyer cannot evaluate a clause until it is complete. Streaming provides no UX benefit here, but introduces state management complexity and interruption risk. A batch response (wait for the full output, then display) is architecturally simpler and more appropriate.
- C) Streaming should be used but with a "review gate" that hides streaming output until the final token arrives — which achieves the exact same experience as batch mode.
- D) Streaming cannot be used with legal tools because law firms block SSE connections at the firewall level.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. (Note: C is technically correct as an implementation option but defeats the entire purpose of streaming.) This question tests whether you understand *when* streaming's value proposition applies vs. when it adds complexity for no gain. Streaming shines when users consume tokens sequentially as they arrive — reading a chat response, watching code being written. For use cases where the entire output must be evaluated as a unit (legal clauses, structured data extraction, code that must compile before being shown), the "early reading" benefit evaporates. The additional server-side connection overhead and interruption risk make batch mode the cleaner, more reliable architecture here.
</details>
<br>

**10. During pretraining, an LLM learned from training data where "Sydney" appeared near "capital of Australia" far more often than "Canberra." During RLHF alignment, human raters consistently gave higher scores to confident, fluent answers. Now at inference time, the model states "The capital of Australia is Sydney" with high logprob confidence. What does this scenario reveal about the combined effect of pretraining data bias + RLHF + sampling settings on factual reliability?**

- A) RLHF would have fixed the factual error because human raters would have marked the wrong answer as bad.
- B) Setting Temperature = 0 would fix the problem because it forces the model to use its "true knowledge."
- C) This reveals a compounding failure: pretraining embedded a statistical bias (Sydney > Canberra in co-occurrence). RLHF trained the model to be confident and fluent — but raters who didn't know the correct answer may have rated the wrong answer highly. At inference, Temperature = 0 makes this worse by locking in the most probable (but wrong) token with no chance of sampling the correct one. The result is a model that is maximally confident about a factual error — the worst possible outcome for reliability.
- D) The logprob for "Canberra" would be 0, indicating the model actually knows the correct answer but is suppressing it due to sampling settings.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. This is the hardest question because it connects concepts across three separate study files — Training Paradigm (pretraining data bias, RLHF nuance), Inference Mechanics (logprobs, Temperature = 0), and the hallucination discussion. The key insight is that all three systems can independently push toward the *same wrong answer* and compound each other. Pretraining creates the bias. RLHF may reinforce confident fluency without correcting factual errors (as the Training Paradigm notes: "RLHF does not mean the model becomes truly correct in all cases — it mainly improves alignment and preference fit"). And Temperature = 0 ensures the most probable token is always chosen — which is the wrong one. This is precisely why RAG exists: to inject ground-truth context at inference time and override what the model "thinks" it knows from training.
</details>
<br>
