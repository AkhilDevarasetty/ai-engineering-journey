export const transformerLessonSections = [
  "Story",
  "Why RNNs Failed",
  "Guided Simulation",
  "Attention",
  "Self-Attention",
  "Multi-Head Attention",
  "Architecture Families",
  "Decoder-Only Models",
  "Context and KV Cache",
  "Quiz",
] as const;

export const attentionScenarios = [
  {
    id: "pronoun-reference",
    label: "Pronoun reference",
    focusToken: "it",
    sentence: ["The", "model", "updated", "the", "answer", "because", "it", "had", "more", "context", "."],
    explanation:
      "Self-attention helps the token 'it' connect back to the noun it most likely refers to. Instead of relying on one rolling memory state, the model can compare against the whole sequence.",
    weights: [
      { token: "model", strength: 0.86, note: "Strongest reference candidate for 'it' in this sentence." },
      { token: "answer", strength: 0.34, note: "Relevant nearby noun, but weaker semantic match." },
      { token: "context", strength: 0.12, note: "Useful concept, but not the referent." },
    ],
  },
  {
    id: "long-range",
    label: "Long-range context",
    focusToken: "deploy",
    sentence: ["After", "reviewing", "the", "logs", "from", "last", "night,", "the", "engineer", "chose", "to", "deploy", "."],
    explanation:
      "Attention lets 'deploy' weigh older tokens like 'logs' and 'engineer' directly, which is much easier than squeezing the whole sequence through a single hidden state.",
    weights: [
      { token: "engineer", strength: 0.78, note: "Who is taking the action matters strongly." },
      { token: "logs", strength: 0.62, note: "Earlier evidence informs the decision to deploy." },
      { token: "night,", strength: 0.18, note: "Timing matters less than the actual entities and action." },
    ],
  },
  {
    id: "code-structure",
    label: "Code structure",
    focusToken: "return",
    sentence: ["function", "sum", "(", "a", ",", "b", ")", "{", "return", "a", "+", "b", "}"],
    explanation:
      "In code, attention helps the token 'return' align with earlier symbols and variables so structure and meaning stay connected across the whole snippet.",
    weights: [
      { token: "a", strength: 0.74, note: "Argument token used in the expression." },
      { token: "b", strength: 0.74, note: "Second argument with matching importance." },
      { token: "function", strength: 0.28, note: "Global structure matters, but less than the operands here." },
    ],
  },
] as const;

export const architectureModes = [
  {
    id: "encoder-only",
    label: "Encoder-only",
    title: "Encoder-only models focus on understanding input",
    description:
      "Encoder-only models are mainly used for understanding input, which makes them useful for embeddings, classification, and search.",
    useCases: ["Embeddings", "Classification", "Search"],
  },
  {
    id: "decoder-only",
    label: "Decoder-only",
    title: "Decoder-only models generate one token at a time",
    description:
      "Decoder-only models generate text one token at a time and are commonly used for chat and code generation.",
    useCases: ["Chat", "Coding", "Summarization"],
  },
  {
    id: "encoder-decoder",
    label: "Encoder-decoder",
    title: "Encoder-decoder models transform one sequence into another",
    description:
      "Encoder-decoder models first process the input and then generate an output from it, which works well for tasks like translation and summarization.",
    useCases: ["Translation", "Summarization", "Rewriting"],
  },
] as const;

export const kvCacheModes = [
  {
    id: "without-cache",
    label: "Without KV Cache",
    title: "Recompute earlier attention every step",
    description:
      "Without KV cache, the model repeatedly recomputes attention over all earlier tokens every time a new token is generated. This creates redundant work and slower generation.",
    bullets: [
      "Less memory usage",
      "More repeated computation",
      "Higher latency on long prompts",
    ],
  },
  {
    id: "with-cache",
    label: "With KV Cache",
    title: "Reuse stored key/value states",
    description:
      "With KV cache, the model stores previously computed key and value information and reuses it when generating the next token. This speeds up generation significantly.",
    bullets: [
      "Faster token generation",
      "Much less redundant math",
      "Memory grows with context length",
    ],
  },
] as const;

export const transformerQuizQuestions = [
  {
    question:
      "Why was sequential processing a major limitation of RNNs for large-scale language modeling?",
    options: [
      "It required too much hard drive space to store the entire sequence at once.",
      "It prevented efficient use of parallel hardware operations like GPUs and made preserving long-range dependencies difficult.",
      "It could only process numbers, requiring complex tokenization for text.",
      "It ignored grammar and focused only on the meanings of individual words.",
    ],
    correctIndex: 1,
    explanation:
      "Sequential processing means each token must wait for the previous one, which breaks parallelism. It also struggles to preserve far-back context through a rolling hidden state.",
  },
  {
    question:
      "What core problem does attention solve better than a rolling hidden state?",
    options: [
      "It eliminates the need for training data by accessing external search engines.",
      "It allows tokens to directly look at and weigh other relevant tokens in the sequence instead of relying on one compressed memory state.",
      "It automatically translates input text into multiple languages simultaneously.",
      "It reduces model size by removing all hidden layers entirely.",
    ],
    correctIndex: 1,
    explanation:
      "Attention removes the bottleneck of forcing all previous context through one lossy state. Tokens can directly access useful earlier positions.",
  },
  {
    question: "In simple terms, what does self-attention allow a token to do?",
    options: [
      "Compare itself with every other token in the same input sequence to determine which ones matter most.",
      "Delete itself if it is found irrelevant to the sentence.",
      "Execute Python code related to its context.",
      "Ignore all previous tokens and focus only on future tokens.",
    ],
    correctIndex: 0,
    explanation:
      "Self-attention lets each token dynamically relate itself to the rest of the sequence, which helps resolve dependencies like pronoun references.",
  },
  {
    question:
      "Why is multi-head attention better than having only one attention head?",
    options: [
      "It ensures the model never hallucinates by fact-checking across databases.",
      "It directly reduces the memory footprint during training.",
      "It lets the model look at the same sequence through multiple perspectives in parallel, learning different relationships.",
      "It allows the model to process images and text simultaneously within the same token.",
    ],
    correctIndex: 2,
    explanation:
      "Different heads can specialize in grammar, references, local context, or long-range patterns, giving the model a richer overall representation.",
  },
  {
    question:
      "What is the main difference between encoder-only and decoder-only models?",
    options: [
      "Encoder-only models generate code, while decoder-only models generate natural language.",
      "Encoder-only models only work on English text, while decoder-only models are multilingual.",
      "Encoder-only models are mainly used for understanding input, while decoder-only models generate text one token at a time.",
      "Encoder-only models use RNNs, while decoder-only models use transformers.",
    ],
    correctIndex: 2,
    explanation:
      "Encoders are useful for dense understanding tasks like embeddings and classification, while decoders operate autoregressively to generate new tokens.",
  },
  {
    question: "Why are decoder-only models a better fit for modern chat-style LLMs?",
    options: [
      "They are much smaller and can run on smartphones without servers.",
      "They align naturally with next-token prediction, making them flexible for generative tasks like chat, coding, and summarization.",
      "They automatically fact-check outputs before displaying them.",
      "They do not require positional encoding, which saves compute.",
    ],
    correctIndex: 1,
    explanation:
      "Predicting the next token is exactly what decoder-only models are optimized to do, which makes them a strong fit for open-ended generative interfaces.",
  },
  {
    question: "What does the context window represent during inference?",
    options: [
      "The maximum number of simultaneous users the model can support.",
      "The graphical user interface a user interacts with.",
      "The maximum amount of text the model can consider in a single processing run.",
      "The number of layers in the neural network.",
    ],
    correctIndex: 2,
    explanation:
      "The context window is the bounded amount of prompt text, conversation history, and working memory the model can see at once.",
  },
  {
    question: "Why do Transformers need positional encoding?",
    options: [
      "Because they process tokens in parallel and do not naturally understand sequential order.",
      "Because they need to know which physical GPU stores each token.",
      "Because it allows text to be compressed into a smaller file format.",
      "Because it is required to translate text into binary code.",
    ],
    correctIndex: 0,
    explanation:
      "Without positional information, a Transformer would treat input like an unordered bag of words. Positional encoding adds sequence order back into the computation.",
  },
  {
    question: "What problem does KV cache solve during token generation?",
    options: [
      "It fixes hallucinations by caching known facts from the real world.",
      "It speeds generation by storing and reusing previously computed key/value information instead of recomputing all earlier attention every step.",
      "It translates tokens back into human-readable text faster.",
      "It temporarily stores the model on the user's hard drive to reduce cloud costs.",
    ],
    correctIndex: 1,
    explanation:
      "KV cache avoids redundant attention math on earlier tokens, which improves latency significantly during generation.",
  },
  {
    question: "What is the main tradeoff introduced by using KV cache?",
    options: [
      "It increases inference speed but significantly increases memory usage as the context grows.",
      "It reduces memory usage but significantly slows down the first token.",
      "It improves accuracy but limits context windows to under 100 tokens.",
      "It allows longer output but causes the model to lose reasoning capabilities.",
    ],
    correctIndex: 0,
    explanation:
      "KV cache trades memory for speed. As sequences get longer, the memory needed to store keys and values can become a major bottleneck.",
  },
] as const;

export const transformerResources = [
  {
    title: "Transformer Architecture - Hindi",
    url: "https://youtu.be/rj5V6q6-XUM?si=VGxT0AcDsocaXrW8",
  },
  {
    title: "Transformer Architecture - English",
    url: "https://youtu.be/RNF0FvRjGZk?si=_Dmp9cwjpMXwC77v",
  },
] as const;
