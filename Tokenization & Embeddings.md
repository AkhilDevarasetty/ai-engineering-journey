# Tokenization & Embeddings (Representation Layer)

---

## 1. What is Tokenization?

**Tokenization** is the process where raw text is broken into smaller units called **tokens** so the model can process it.

An LLM does not read text directly like humans do — it reads a sequence of **token IDs**.

**Example:**

```text
I love React
```

First becomes an array of tokens:

```json
["I", " love", " React"]
```

And then an array of IDs:

```json
[54, 1209, 8831]
```

Those IDs are what the model actually sees.

---

## 2. Why Tokenization is Needed

Text is messy because:

- Words repeat
- New words constantly appear
- Spelling varies
- Code mixes symbols and keywords
- Many languages exist

If we stored every possible full word in the vocabulary, it would explode in size. Tokenization solves this by splitting text into **reusable, smaller pieces**.

---

## 3. Tokens vs. Words

They are **not** the same.

| | Word | Token |
|---|---|---|
| **Definition** | A human language unit | The unit an LLM actually processes |
| **Examples** | `developer`, `React`, `beautiful` | `dev`, `eloper`, `React`, `.` |

A single word may become **one or more tokens** depending on how the tokenizer splits it.

**Example:**
- `unbelievable` → `["un", "believ", "able"]` → 1 word, 3 tokens
- `I love React.` → `["I", " love", " React", "."]` → 4 tokens (spaces may be attached inside tokens)

> **Key insight:** Humans think in words. LLMs think in tokens. Token count matters more than word count when thinking about model cost, context limits, and performance.

---

## 4. Common Tokenization Algorithms

### BPE (Byte-Pair Encoding)

BPE builds subword units by **iteratively merging the most frequent character pairs** found in training data.

**Phase 1 — Building the Vocabulary (Training)**

The model starts with a base vocabulary of single characters and repeatedly merges frequent adjacent pairs.

*Example: Building tokens for "happily"*

| Step | Action | Vocabulary Update |
|---|---|---|
| Start | Alphabet only | `[h, a, p, i, l, y, ...]` |
| Merge 1 | `p + p` → `pp` (frequent in _apple_, _happy_) | `[..., pp]` |
| Merge 2 | `a + pp` → `app` | `[..., app]` |
| Merge 3 | `h + app` → `happ` | `[..., happ]` |
| Merge 4 | `happ + i` → `happi` | `[..., happi]` |
| Merge 5 | `l + y` → `ly` (frequent suffix in _slowly_, _quickly_) | `[..., ly]` |

By the end of training, the vocabulary contains highly reusable pieces like `un`, `happi`, `ly`, `s`, `ing`.

**Phase 2 — Tokenizing User Input**

When a user types _"He lived unhappily"_, the tokenizer checks its vocabulary for the largest matching chunks:

- Is `unhappily` in the list? **No.**
- Is `unhappi` in the list? **No.**
- Is `un` in the list? ✅ **Yes → Token 1**
- Is `happi` in the list? ✅ **Yes → Token 2**
- Is `ly` in the list? ✅ **Yes → Token 3**

**Result:** `["un", "happi", "ly"]`

> **Why this beats word-level tokenization:** If the model sees a new rare word like _"unluckily"_, it doesn't fail. It already knows `un` and `ly`, and simply breaks down the middle segment (`lucki`).

---

### WordPiece

**WordPiece** is very similar in spirit to BPE — it also builds subword units, but uses a slightly different merge strategy.

For intuition, treat both as having the same goal:

> **Build a vocabulary of common word pieces so text can be represented efficiently without needing every full word in the dictionary.**

---

## 5. Why Subword Tokenization Won

Subword tokenization strikes the perfect balance between two extremes:

| Approach | Problem |
|---|---|
| **Whole words only (too big)** | Vocabulary becomes impossibly huge; unknown words break the model |
| **Character-level only (too small)** | Sequences become too long; training and inference are very slow |
| **Subwords (middle ground)** ✅ | Manageable vocabulary, handles rare words, shorter sequences, works for language and code |

---

## 6. Why Tokenization Matters for Cost

LLM pricing and runtime are **tied to tokens, not words**. Tokenization directly affects:

- 💰 **API cost**
- ⚡ **Latency**
- 📦 **Context usage**
- 🖥️ **Memory / compute load**

### More Tokens = More Money
Most LLM APIs charge per input token and per output token. If the same content produces more tokens, it costs more — a short-looking text is not always cheap if it tokenizes inefficiently.

### More Tokens = Slower Inference
The model processes tokens, not sentences. Longer token sequences mean more computation, slower responses, and higher serving cost.

### More Tokens = Less Usable Context
Context windows are limited by token count. Too many tokens means:
- Fewer documents fit in the window
- Chat history gets trimmed sooner
- RAG retrieval quality can drop

### Text Types That Are Expensive
These can generate many tokens quickly:
- Code
- JSON
- Tables
- Repeated symbols
- Unusual formatting
- Long IDs or log lines

> Two inputs with similar character length may have very different token costs.

---

## 7. Embeddings as Vector Representations

An **embedding** is a numeric vector that represents the **meaning** of a piece of text — a word, sentence, paragraph, or document.

Instead of storing text as raw characters, the model maps it into a list of numbers:

```json
[0.12, -0.44, 0.91, ...]
```

That list of numbers is the embedding.

### Core Intuition

Embeddings turn language into a form that machines can **compare mathematically**.

The goal: **text with similar meaning should produce similar vectors.**

| Text Pair | Relationship |
|---|---|
| `"car insurance"` and `"auto insurance"` | Close together in vector space |
| `"car insurance"` and `"banana smoothie"` | Far apart in vector space |

### Why We Need Embeddings

Embeddings enable systems to do:

- **Semantic search** — find results by meaning, not just keywords
- **Similarity matching**
- **Clustering**
- **Retrieval (RAG)**
- **Recommendation**

> Keyword matching is shallow. Embeddings capture meaning — which is far more powerful.

### Key Distinction

| | Purpose |
|---|---|
| **Tokenization** | Breaks text into model-readable pieces |
| **Embeddings** | Converts text into meaning-rich numeric vectors |

---

## 8. Semantic Similarity

**Semantic similarity** measures how close two pieces of text are in **meaning**, even if the words are completely different.

**Example — Semantically Similar:**
> _"How do I reset my password?"_
> _"I forgot my login password, how can I change it?"_
> → Different wording, same intent.

**Example — Not Similar:**
> _"How do I reset my password?"_
> _"Best protein sources for breakfast"_
> → Unrelated topics.

### Keyword Matching vs. Semantic Similarity

| | Keyword Matching | Semantic Similarity |
|---|---|---|
| Checks | Word overlap | Meaning overlap |
| Handles synonyms | ❌ | ✅ |
| Handles paraphrases | ❌ | ✅ |

In vector space:
- **Similar meaning** → nearby vectors
- **Different meaning** → distant vectors

---

## 9. Why Embeddings Power RAG

RAG (Retrieval-Augmented Generation) needs to find the right knowledge chunks **by meaning**, not just by exact keyword match. Embeddings make that possible.

### The RAG Pipeline (Embedding View)

1. User asks a question
2. Question is converted into an **embedding**
3. Stored document chunks already have embeddings (pre-computed)
4. System finds the **closest chunks by semantic similarity**
5. Those chunks are given to the LLM as context

### Why Keyword Search Alone Isn't Enough

User asks: _"How do I handle stale closures in React?"_

But the docs say: _"Avoid outdated state references inside async callbacks"_

Keyword overlap is weak — but **meaning is closely related**. Embeddings bridge that gap.

### What Embeddings Enable in RAG

With embeddings, RAG can retrieve:
- Paraphrases
- Related explanations
- Synonym-based matches
- Conceptually similar content

This gives the LLM better context, which leads to better answers.

---

## 10. Dimensionality Intuition

**Dimensionality** = how many numbers are in an embedding vector.

- A **384-dimensional** embedding → 384 numbers
- A **1536-dimensional** embedding → 1536 numbers

### What the Dimensions Mean

Each dimension is **not** a human-readable label like `topic = 0.8`. Instead, the **full vector works together** to encode meaning. Think of dimensionality as: _how much representational space the model has to encode information._

### The Tradeoff

| | Lower Dimensions | Higher Dimensions |
|---|---|---|
| **Vector size** | Smaller | Larger |
| **Storage / search cost** | Cheaper | More expensive |
| **Expressiveness** | Less nuance | Richer representation |

**Rule of thumb:** Higher dimensionality captures more semantic detail, but costs more to store and search. It's a tradeoff between **efficiency** and **representational capacity**.

### Why It Matters in Practice

Dimensionality directly affects:
- Vector database storage size
- Retrieval speed
- Memory usage
- Similarity quality

---

## Quiz — Tokenization & Embeddings (Representation Layer)

**10 Questions**

**1. What does an LLM actually receive as input — raw text or something else?**

- A) The raw text string exactly as typed by the user.
- B) A sequence of token IDs derived from the text by a tokenizer.
- C) A list of full sentences compressed into a single binary value.
- D) A JSON object with one key per word in the input.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. An LLM never sees raw text directly. The tokenizer first converts the text into tokens, and each token is assigned an integer ID. It is this sequence of IDs that the model actually processes. This is why the text <code>"I love React"</code> internally becomes something like <code>[54, 1209, 8831]</code>.
</details>
<br>

**2. Why would storing every possible full word in a vocabulary be a problem for LLMs?**

- A) Full words take too long to display on screen during generation.
- B) It would require the model to only support English, excluding all other languages.
- C) The vocabulary would explode in size and still fail to handle new or misspelled words.
- D) Full-word vocabularies make it impossible to tokenize code or punctuation.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. Natural language has an unbounded number of words — including names, technical terms, slang, and rare forms. A full-word vocabulary would be impossibly large, and any word not seen during training would still break the model. Subword tokenization sidesteps both problems.
</details>
<br>

**3. What is the key difference between a "token" and a "word"?**

- A) Tokens only exist in programming languages; words are for natural language.
- B) A word is a human language unit, while a token is the actual unit the LLM processes — which may be a full word, part of a word, punctuation, or a whitespace-aware chunk.
- C) Tokens are always shorter than words.
- D) Words are assigned IDs by the model; tokens are assigned IDs by the user.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. The distinction is critical for understanding LLM cost and behavior. One word like "unbelievable" may become three tokens: <code>["un", "believ", "able"]</code>. Token count — not word count — drives API cost, context limits, and inference speed.
</details>
<br>

**4. How does BPE (Byte-Pair Encoding) build its vocabulary?**

- A) It starts with a full dictionary of English words and removes the least common ones.
- B) It randomly samples substrings from training data and stores those that survive multiple rounds.
- C) It starts with individual characters and iteratively merges the most frequently adjacent pairs to form new tokens.
- D) It splits each sentence at spaces and punctuation, then stores the resulting fragments.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. BPE is a bottom-up algorithm. It begins with a base vocabulary of single characters, then repeatedly identifies the most frequent pair of adjacent symbols and merges them into a new token. This continues until a target vocabulary size is reached — resulting in efficient subword pieces like <code>un</code>, <code>happi</code>, and <code>ly</code>.
</details>
<br>

**5. A user types the word "unluckily" which was never seen during training. How does a BPE tokenizer handle this without failing?**

- A) It replaces the unknown word with a special `[UNK]` token and continues.
- B) It crashes and returns an error because the word is out of vocabulary.
- C) It checks its vocabulary for the largest known subword chunks it can find and assembles those — for example, `["un", "luck", "ily"]`.
- D) It asks the user to rephrase the input using simpler words.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. This is the defining strength of subword tokenization. Since <code>un</code> and <code>ly</code> are common prefix/suffix tokens, the tokenizer can parse any novel word by breaking it into known subword pieces. The model never truly encounters a completely unknown unit.
</details>
<br>

**6. Why does tokenization directly affect the cost of using LLM APIs?**

- A) APIs charge based on the number of characters in the response, not tokens.
- B) Most LLM APIs charge per input and output token, so more tokens always means a higher cost — even if the text appears short.
- C) APIs only charge for output tokens; input tokens are always free.
- D) Cost is tied to the number of words in a document, not the token count.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. LLM billing is token-based, not word-based or character-based. This means that content like code, JSON, tables, and unusual formatting — which tend to tokenize into many more tokens than plain prose — can be surprisingly expensive. A short-looking prompt is not always a cheap one.
</details>
<br>

**7. What is an embedding, and what does it represent?**

- A) An embedding is a compressed PNG image of a word used for visual recognition.
- B) An embedding is a dense numeric vector that represents the meaning of a piece of text in a machine-comparable form.
- C) An embedding is the exact byte sequence of characters in a string, stored as integers.
- D) An embedding is a list of grammar rules associated with a word or sentence.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. Embeddings are the bridge between human language and machine math. A word, sentence, or paragraph is mapped to a vector like <code>[0.12, -0.44, 0.91, ...]</code>. The key property is that texts with similar meanings end up with similar vectors — enabling semantic comparison at scale.
</details>
<br>

**8. Two users ask: "How do I reset my password?" and "I forgot my login, how can I change it?" A keyword search finds no match. Why would an embedding-based system succeed where keyword search fails?**

- A) Embedding-based systems have access to a real-time internet search to bridge gaps.
- B) Because embeddings capture semantic meaning, these two sentences would have similar vectors and thus be recognized as semantically close — even though they share almost no common keywords.
- C) Keyword searches only support English; embedding systems support all languages by default.
- D) Embedding-based systems score based on sentence length similarity, which happens to be close here.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. This is exactly why embeddings are fundamental to modern AI search and RAG systems. Keyword matching checks for word overlap; embedding similarity checks for meaning overlap. Two paraphrases of the same intent will land close together in vector space, even if no words match.
</details>
<br>

**9. In a RAG (Retrieval-Augmented Generation) pipeline, what role do embeddings play and why are they essential?**

- A) Embeddings are used to compress the user's query into a shorter string before sending it to the LLM.
- B) Embeddings are only used to format the final LLM output into readable paragraphs.
- C) Both the user query and stored document chunks are converted into embeddings, and the system retrieves the chunks whose vectors are most semantically similar to the query — giving the LLM relevant context.
- D) Embeddings allow the LLM to skip the retrieval step and answer directly from memory.

<details>
<summary><b>View Answer</b></summary>
<b>C</b>. Without embeddings, RAG degrades to keyword matching, which misses paraphrases, related concepts, and differently worded but relevant content. Embeddings make retrieval meaning-aware, which directly improves the quality of the context the LLM receives and thus the quality of its answer.
</details>
<br>

**10. A 384-dimensional embedding and a 1536-dimensional embedding are both used to represent the same sentence. What is the key tradeoff between them?**

- A) The 384-dimensional embedding is always more accurate because smaller vectors are less noisy.
- B) The 1536-dimensional embedding has more representational capacity to capture nuance and meaning, but costs more to store and search; the 384-dimensional one is cheaper and faster but less expressive.
- C) The 1536-dimensional embedding can only be used with decoder-only models, while the 384-dimensional one works with any architecture.
- D) There is no meaningful difference; both vectors represent exactly the same semantic detail.

<details>
<summary><b>View Answer</b></summary>
<b>B</b>. Dimensionality is a tradeoff between representational richness and system efficiency. Higher dimensions give the embedding model more "space" to encode subtle semantic differences, leading to better similarity quality. But they also cost more to store in a vector database and take longer to search. The right choice depends on your accuracy vs. latency/cost requirements.
</details>
<br>
