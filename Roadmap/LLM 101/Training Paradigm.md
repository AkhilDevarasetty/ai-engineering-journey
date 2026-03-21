# Training Paradigm

---

## 1. Pretraining Objective

**Pretraining** is the first and foundational training phase of an LLM. The model is not yet taught to chat, summarize, or code — it is trained on a single broad task:

> **Predict the next token given all the tokens seen so far.**

The model reads billions of text examples and — for each one — learns what token is most likely to come next. Think of it like a child learning to read by filling in blanks, or a person crawling before they run.

**Simple example:**

| Input (context)              | Target (next token) |
| ---------------------------- | ------------------- |
| `"The capital of France is"` | `"Paris"`           |

After predicting `"Paris"`, the model extends the sequence and predicts the next token again. This repeats across billions of such steps and massive datasets.

---

## 2. What the Model Learns

No individual skill is explicitly taught. Instead, by doing next-token prediction at scale, the model **emergently learns**:

- Grammar and syntax
- World facts that appear in text
- Writing style patterns
- Code structure
- Reasoning-like step sequences
- Instruction-following patterns

This is why pretraining is so powerful — one objective produces a broad, reusable capability base.

---

## 3. Pretraining vs. Fine-Tuning

| Phase                                | Purpose                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **Pretraining**                      | Broad foundational learning — gives the model general language intelligence                     |
| **Fine-tuning / Instruction tuning** | Behavior shaping — teaches the model _how_ to respond for specific use cases (chat, code, etc.) |

> **Key insight:** Pretraining builds the foundation. Fine-tuning shapes how the model uses it.

---

## 4. Massive Data + Self-Supervision

These two ingredients are the core reason LLMs became possible at scale.

### Massive Data

LLMs need enormous amounts of text because language is too broad and varied to learn from small datasets. With massive data, the model is exposed to:

- Many writing styles
- Grammar patterns
- Facts and real-world associations
- Code examples
- Reasoning-like step sequences
- Question/answer formats

More data = more pattern coverage = a more capable base model.

### Self-Supervision

**Self-supervision** means the training signal comes directly from the data itself — no humans needed to manually label every example.

**How it works:**

> `"The capital of France is ___"`

The next token already exists in the text, so the model uses it as the target automatically.

Instead of needing human labels like:
- `sentiment = positive`
- `intent = refund`
- `topic = finance`

...the model learns by predicting hidden or next parts of raw text.

### Why This Was a Breakthrough

If LLM training required manual labels, it could never scale. Self-supervision solved that by enabling training on internet-scale text:

| Advantage | Why it matters |
|---|---|
| Raw text is abundant | No need to build labeled datasets |
| Labels are auto-generated | Derived directly from text structure |
| Training scales massively | No human-labeling bottleneck |

---

## 5. Fine-Tuning vs. Instruction Tuning

Both happen **after** pretraining, but they serve different purposes.

### Fine-Tuning

Fine-tuning is the **broad concept** of continuing training on a pretrained model using a more specific dataset to specialize its behavior. It can be applied for:

- A specific domain (e.g., legal, medical)
- A specific task (e.g., classification, summarization)
- A style or tone
- A company's internal dataset

Fine-tuning is the **umbrella term**.

### Instruction Tuning

Instruction tuning is a **specific type** of fine-tuning where the model trains on prompt-response pairs to learn how to follow human instructions.

**Example:**

| Prompt | Expected Response |
|---|---|
| `"Summarize this paragraph"` | A correct, concise summary |

This is what makes a raw pretrained model behave like a helpful assistant.

### Key Difference

| | Fine-Tuning | Instruction Tuning |
|---|---|---|
| **Scope** | Umbrella concept — any post-pretraining adaptation | A specific subtype |
| **Goal** | Specialize for a domain, task, or style | Teach the model to follow instructions |
| **Data** | Task-specific datasets | Prompt-response pairs |

> **Key insight:** Instruction tuning is one important *subtype* of fine-tuning, focused on making the model more useful as an assistant.

---

## 6. RLHF Intuition

**RLHF** stands for **Reinforcement Learning from Human Feedback**. It is used to make a model's outputs more aligned with what humans actually prefer.

Even after pretraining and instruction tuning, a model may still produce:
- Correct but awkward answers
- Unsafe or overly verbose responses
- Unhelpful formatting or strange tone

RLHF pushes the model toward more helpful, safe, and natural behavior.

### Core Intuition

Standard language modeling only asks:
> *"Is this next token statistically likely?"*

RLHF also asks:
> *"Do humans prefer this type of answer?"*

It adds a **preference signal** on top of pure language modeling.

### The RLHF Flow

1. Model generates multiple candidate answers
2. Humans compare them and rank preferences
3. A reward model learns what humans prefer
4. The LLM is further optimized toward those preferred behaviors

### Important Nuance

RLHF improves **alignment, helpfulness, and preference fit** — but it does **not** guarantee factual correctness. In fact, it can sometimes make a model sound *more confident* than it should, even when the content is shaky.

---

## 7. Alignment vs. Capability

These two dimensions are related but **not the same**.

| | Capability | Alignment |
|---|---|---|
| **What it means** | What the model is *able* to do | Whether the model *behaves* the way humans want |
| **Examples** | Solve coding problems, summarize, translate, reason | Follow instructions, refuse unsafe requests, stay on task, helpful tone |
| **About** | Skill / competence | Behavior fit |

### The Four Quadrants

| | High Alignment | Low Alignment |
|---|---|---|
| **High Capability** | ✅ Best case — smart and well-behaved | ⚠️ Smart but unsafe, weird, or unreliable |
| **Low Capability** | 🟡 Polite and safe, but weak at hard tasks | ❌ Poor on both dimensions |

> **Key insight:** A model can be highly capable without being well-aligned — and vice versa. Both dimensions matter in real AI systems.

---

## 8. Why Models Hallucinate (Probabilistic Generation)

Models hallucinate because they generate text by **predicting the most likely next token** — not by verifying whether the answer is actually true.

### Core Idea

An LLM is optimized to produce a *plausible continuation* based on patterns learned during training. When it doesn't truly know something, it may still generate:
- A confident-sounding answer
- A realistic-looking (but fabricated) citation
- A plausible but false explanation

That is **hallucination**.

### Why It Happens

**1. It predicts — it does not verify**

The model's job is to continue the sequence fluently. Guaranteeing factual correctness is a different problem entirely. Fluency can be higher than truthfulness.

**2. Probability ≠ Truth**

If a wrong answer pattern appeared often enough in training data, or fits the current context well, the model may assign it high probability.

- `likely-sounding ≠ correct`
- `coherent ≠ verified`

**3. Missing knowledge gets filled with guesses**

If the model lacks the fact, enough context, or up-to-date information — it may still complete the response instead of saying *"I don't know."*

**4. RLHF can make it sound smoother**

Alignment improves helpfulness and tone, but it can also make hallucinated answers sound *more polished and confident*, which can be misleading.

### Dev Analogy

> Think of it like an API that always returns well-formed JSON — but the backend data is missing and it fabricates field values instead of returning `null`. The output *shape* looks valid, but the content is unreliable.

---

## Quiz — Training Paradigm

**10 Questions**

**1. A company trains a model entirely on internal legal documents. The model becomes highly accurate at predicting the next word in legal contracts. However, when asked to summarize a clause, explain its implications, or answer a yes/no question about it, it performs poorly. Why does strong next-token prediction performance not automatically translate to useful task behavior?**

- A) The model is too small — it needs more parameters before it can perform tasks like summarization.
- B) Pretraining on next-token prediction gives the model broad language patterns, but it does not teach it *how* to respond to instructions or format outputs in useful ways. That behavioral shaping requires instruction tuning or fine-tuning on task-specific prompt-response pairs.
- C) The model has overfit to legal language and needs regularization before it can be used for downstream tasks.
- D) The model needs access to an internet connection to perform summarization because it cannot do this from training data alone.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This is the core distinction between pretraining and instruction tuning. Next-token prediction teaches the model *what language looks like* — patterns, structure, facts, style. But it does not teach the model how to follow a command like "summarize this" or "answer this question." The model might have all the capability latent inside it, but instruction tuning (fine-tuning on prompt-response pairs) is what teaches it to *use* that capability in a task-directed way. A model with perfect pretraining but no instruction tuning behaves like an autocomplete engine — brilliant at continuation, poor at responding.
</details>
<br>

**2. Self-supervised pretraining is described as a "breakthrough" because it removes the need for human-labeled data. A colleague argues: "Then RLHF must be unnecessary — if the model can learn everything from raw text, why do we need human feedback at all?" What is wrong with this reasoning?**

- A) Nothing is wrong — RLHF is indeed optional and only used to reduce inference latency.
- B) Self-supervision teaches the model *what text looks like*, but it cannot teach the model *what humans prefer* — helpfulness, safety, tone, and format. RLHF introduces a preference signal that raw text prediction cannot provide, because no amount of self-supervised text tells the model "a response that refuses a harmful request is better than one that complies."
- C) RLHF replaces self-supervision entirely in modern systems — one is not needed if the other is used.
- D) Self-supervision is only scalable for text — RLHF is needed to allow the model to process images and code.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. Self-supervision and RLHF solve fundamentally different problems. Self-supervision solves the *data labeling bottleneck* — it lets you train on internet-scale raw text without hiring annotators. But it teaches the model to predict statistically likely text, not to behave helpfully, safely, or in alignment with human values. A model trained only on raw internet text might reproduce harmful content confidently because that content exists in training data. RLHF adds a layer that asks "do humans prefer this output?" — a signal that cannot emerge from next-token prediction alone.
</details>
<br>

**3. An organization fine-tunes GPT-4 on 10,000 examples of their customer support transcripts. After fine-tuning, the model becomes very good at sounding like their support agents. However, the model now refuses to answer general knowledge questions it could previously handle easily. What likely happened, and what does this reveal about fine-tuning?**

- A) The model's weights were corrupted during fine-tuning and it needs to be retrained from scratch.
- B) Fine-tuning on a narrow, domain-specific dataset can cause "catastrophic forgetting" — the model over-adapts to the new distribution and loses some of the general capabilities it learned during pretraining. Fine-tuning specializes the model but can narrow the range of things it does well.
- C) The fine-tuning dataset was too large — 10,000 examples always causes overfitting in language models.
- D) The model is detecting that general knowledge questions are out of scope and correctly refusing them for safety reasons.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This is "catastrophic forgetting" — a real and well-studied phenomenon. When you fine-tune a pretrained model on a narrow distribution, the gradient updates that improve performance on the new task can overwrite weights that were responsible for general capabilities. The model drifts toward the fine-tuning distribution and away from its pretrained breadth. This is why techniques like LoRA (Low-Rank Adaptation) and parameter-efficient fine-tuning exist — they modify only a small subset of weights, preserving the general capabilities while adding the new behavior.
</details>
<br>

**4. A startup uses instruction tuning to train a customer service bot. After deployment, users discover that the bot gives confident answers to medical questions it should not be answering, and it never says "I don't know." The team decides to fix this with more RLHF. A senior engineer warns that RLHF alone will not fully solve it. Why?**

- A) RLHF cannot be applied to models that have already been instruction tuned — it must be done first.
- B) RLHF optimizes for what human raters prefer, not for what is factually correct. If raters consistently rate confident-sounding answers higher than "I don't know" responses (even when uncertainty is warranted), RLHF will reinforce the problematic confident behavior rather than fixing it. The real fix requires carefully structured rater guidelines and targeted training data that rewards appropriate expressions of uncertainty.
- C) RLHF only improves tone and safety, not factual accuracy or knowledge boundaries.
- D) The problem is purely a capability issue — the model needs more pretraining data before it can recognize its own knowledge limits.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This tests a deep nuance from the Training Paradigm: RLHF aligns the model to *human preferences as expressed by raters* — which is only as good as the rater guidelines and rating quality. If raters (consciously or unconsciously) score confident fluent answers higher, the RLHF reward model learns to optimize for confident fluency — not epistemic honesty. This is why "RLHF does not mean the model becomes truly correct in all cases." Fixing the bot requires *intentionally designed* rater guidelines that explicitly reward "I don't know" responses when the model genuinely lacks knowledge, plus targeted training examples demonstrating appropriate uncertainty.
</details>
<br>

**5. Two models are released: Model A was trained with purely self-supervised pretraining. Model B was pretrained identically, then instruction tuned, then put through RLHF. A developer observes that Model A can solve a math problem if given the right prompt structure, but Model B solves it automatically when asked naturally. What does this reveal about where the mathematical *capability* lives?**

- A) Model B gained mathematical ability during RLHF — Model A never had this capability.
- B) The mathematical capability existed in Model A from pretraining. Instruction tuning and RLHF taught Model B *how to surface and apply* that capability in response to natural instructions — they did not create the capability, they unlocked access to it.
- C) Model A's math ability comes from memorized equations in pretraining data. Model B generates solutions using a different mechanism learned during RLHF.
- D) RLHF gives models new capabilities that pretraining cannot provide, which is why Model B performs better.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This is a crucial conceptual distinction. Pretraining is where the model learns capabilities — mathematical reasoning patterns, code structure, logical inference — by predicting text that contains those patterns at massive scale. Instruction tuning and RLHF do not *add* capabilities; they teach the model how to expose and use them in response to human requests. Think of it as: pretraining builds the engine, instruction tuning teaches the model to respond to the steering wheel, and RLHF smooths out the ride. A skilled prompter can access Model A's math capability directly — but only because it was already there from pretraining.
</details>
<br>

**6. A researcher claims: "Emergence in LLMs is proof that large models develop true intelligence." A more skeptical researcher disagrees. Who is more likely to be correct, and what is the precise mechanism behind emergent capabilities?**

- A) The first researcher is correct — capabilities that appear suddenly at scale cannot be explained by simple pattern matching.
- B) The skeptical researcher is more aligned with the evidence. Emergence describes the point at which a model's capacity becomes large enough to *combine and apply* patterns that existed but were too weak or fragmented in smaller models. It is not a phase transition into consciousness or reasoning — it is a threshold where previously sub-threshold competencies cross into usable performance.
- C) Emergence cannot be explained by current science and remains an open research question with no reliable mechanism.
- D) Both researchers are wrong — emergence has been definitively proven to be an artifact of evaluation metrics, not actual capability change.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. The Training Paradigm is explicit: "Emergence isn't magic — it usually means the model now has enough capacity to represent and combine patterns that were too weak in smaller versions." A capability like multi-step reasoning might require the model to have simultaneously learned syntax, facts, logical structure, and sequencing patterns — each individually insufficient but powerful together. When a model reaches the scale where all these components are strong enough to be combined effectively, the capability "emerges" in evaluation metrics. This is not intelligence — it is the threshold effect of compositional capacity.
</details>
<br>

**7. A foundation model scores 95% on a medical licensing exam. A hospital considers using it directly for patient diagnosis without fine-tuning. A machine learning engineer strongly objects. What is the engineer's most technically sound argument?**

- A) The model's context window is too short to process a full patient history.
- B) Foundation models cannot process images, so they cannot read X-rays or MRIs needed for diagnosis.
- C) High benchmark scores reflect the model's capability (what it can do), not its alignment (how it behaves). Without fine-tuning and RLHF targeted at medical behavior, the model may refuse appropriate questions, over-disclose uncertainty, mis-format answers, fail to follow clinical guidelines, or confidently hallucinate drug dosages — all while scoring well on exams. Capability and deployment-readiness are different dimensions.
- D) Foundation models are licensed only for general-purpose use and cannot legally be used in medical settings.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. This is the Capability vs. Alignment distinction applied to a real-world scenario. A model can be highly capable — knowing medical knowledge — but completely misaligned for clinical deployment. It needs fine-tuning to follow clinical response formats, RLHF to behave safely around high-stakes uncertainty, and task-specific instruction tuning to refuse out-of-scope requests appropriately. A benchmark score measures what the model *knows*; it does not measure whether the model *behaves* correctly as a clinical tool. Deploying a high-capability, low-alignment model in medicine is exactly the "smart but unsafe" quadrant from the Alignment vs. Capability matrix.
</details>
<br>

**8. During RLHF training, human raters are shown two model responses and asked which is better. Unknown to the research team, the raters are non-experts on the topic being evaluated. Six months later, the model is deployed and it consistently gives confident but factually wrong answers in that domain — and users rate those answers highly. Trace the exact failure path through the training pipeline.**

- A) The failure is in pretraining — the model was exposed to incorrect data that cannot be fixed by RLHF.
- B) The failure propagated through RLHF: non-expert raters preferred fluent, confident-sounding responses over uncertain but accurate ones → the reward model learned to score confident fluency highly → the LLM was optimized to maximize that reward → confident hallucination was reinforced as a "good" behavior → users at deployment confirm the same bias because they also cannot evaluate correctness. Each step amplified the initial rater quality problem.
- C) The failure is in instruction tuning — the model was never taught what "correct" means in that domain.
- D) The failure is in the model architecture — RLHF cannot fix knowledge gaps, only behavioral ones.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This traces the exact RLHF failure mode end-to-end. RLHF is only as good as its raters. Non-expert raters who cannot distinguish correct from incorrect content will systematically prefer fluent, confident-sounding answers — because that is what "good" looks and sounds like to a non-expert. The reward model (trained on these preferences) then teaches the LLM to maximize confident fluency. After deployment, users who are also non-experts continue rewarding the same behavior with high ratings — creating a self-reinforcing feedback loop. This is why the Training Paradigm explicitly warns: "RLHF does not guarantee truth — it improves alignment and preference fit." Rater expertise and guideline design are not optional.
</details>
<br>

**9. A model pretrained on text from 2021 is instruction tuned in 2023. A user asks it in 2024 about a recent geopolitical event from 2023. The model gives a detailed, confident answer with specific names and dates. Should the developer trust this answer? What is the mechanism behind the risk?**

- A) Yes — instruction tuning updated the model's knowledge to include 2023 content.
- B) No — instruction tuning changes *how* the model responds to instructions, not *what facts it knows*. If the 2023 event was not in the pretraining data, the model has no factual knowledge of it. What it *does* have is the ability to generate a plausible, confident-sounding narrative about an event that fits the described context — using patterns from similar historic events in training data. The detailed names and dates are likely hallucinated constructions, not recalled facts.
- C) Yes — models always refuse to answer about topics outside their training data, so if it answered, the information must be real.
- D) No — instruction tuning corrupted the model's factual recall, making all answers from instruction-tuned models unreliable.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. The knowledge cutoff is fundamental. Instruction tuning trains the model on prompt-response format pairs — it does not inject new factual knowledge. The model's factual knowledge is frozen at the pretraining data cutoff (2021 in this case). When asked about a 2023 event it has no knowledge of, the model does not recognize the gap — it generates a plausible-sounding response using its language patterns, the event's described context clues, and analogy to similar past events. The confidence level is driven by how fluent the generated text sounds (further reinforced by RLHF), not by whether the facts are real. This is why RAG exists — to inject verified, current-date information at inference time.
</details>
<br>

**10. You are comparing two models: Model A is a highly capable base model (pretraining only) and Model B is a smaller model that has been heavily instruction tuned and RLHF'd. For a high-stakes automated pipeline (no human in the loop) that extracts structured data from legal contracts, which model do you choose and why — and what does your choice reveal about the relationship between capability, alignment, and task fit?**

- A) Always choose Model B — RLHF makes all models safer and more reliable, regardless of the task.
- B) Always choose Model A — more capability always produces better extraction quality.
- C) The correct choice depends on the specific failure modes that matter most. For structured extraction with no human review, deterministic consistency matters more than creativity. Model A may have higher raw capability but unpredictable output format. Model B's instruction tuning likely makes it better at following a structured output schema reliably. However, if Model B is significantly smaller, it may lack the domain comprehension needed for complex legal language. The real answer is: evaluate both empirically on your specific task, because capability and alignment are independent dimensions that must both be sufficient for the deployment context.
- D) Neither — only task-specific models (fine-tuned from scratch on legal data) should be used for legal pipelines.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. This is a deliberately open-ended question to test whether you understand that "best model" is context-dependent, not universal. Capability vs. Alignment is not a hierarchy — both dimensions must clear a threshold for the specific deployment. For structured data extraction: instruction tuning helps (Model B follows output schemas better), but insufficient domain capability (if Model B is too small) means it will hallucinate legal interpretations. High capability without instruction tuning (Model A) means high comprehension but potentially unpredictable, free-form outputs that break the extraction pipeline. In practice, the ideal is a model with both sufficient capability (large enough for the legal domain) *and* fine-tuned behavioral alignment (instruction tuned to output to a specific schema). Evaluating empirically — rather than assuming one axis dominates — is the engineering answer.
</details>
<br>
