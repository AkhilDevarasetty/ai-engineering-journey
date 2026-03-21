export const lessonSections = [
  "Language Modeling",
  "Tiny Example",
  "Reasoning-Like Behavior",
  "Scale and Emergence",
  "Model Types",
  "Token Playground",
  "Quiz",
] as const;

export const tokenPlaygroundScenarios = [
  {
    id: "code-patterns",
    label: "Code pattern",
    prompt: ["function", "add(a,", "b)", "{", "return", "?"],
    candidates: [
      {
        token: "a",
        score: 0.74,
        description:
          "Reasonable because the model has seen many simple return patterns in code.",
      },
      {
        token: "a +",
        score: 0.41,
        description:
          "Also plausible because it begins the expected arithmetic expression.",
      },
      {
        token: "a + b",
        score: 0.98,
        description:
          "Most likely because the model has learned common JavaScript function patterns from training data.",
      },
    ],
    bestCompletion: "function add(a, b) { return a + b }",
  },
  {
    id: "foundation-models",
    label: "Foundation model",
    prompt: ["A", "foundation", "model", "supports", "many", "?"],
    candidates: [
      {
        token: "tasks",
        score: 0.982,
        description:
          "Strongest because the roadmap note defines foundation models as broad, adaptable, and useful across many downstream tasks.",
      },
      {
        token: "layers",
        score: 0.011,
        description:
          "Possible in a technical sentence, but it does not fit the concept being explained here.",
      },
      {
        token: "databases",
        score: 0.004,
        description:
          "Not a natural continuation for the definition of a foundation model in this context.",
      },
    ],
    bestCompletion:
      "A foundation model supports many tasks such as chat, summarization, coding, classification, and translation.",
  },
  {
    id: "rag-embeddings",
    label: "Representation model",
    prompt: ["In", "RAG,", "embeddings", "help", "retrieve", "?"],
    candidates: [
      {
        token: "documents",
        score: 0.21,
        description:
          "Plausible because representation models are used in retrieval pipelines.",
      },
      {
        token: "relevant information",
        score: 0.91,
        description:
          "Most likely because the roadmap note explains that representation models encode meaning for semantic retrieval before generation.",
      },
      {
        token: "images",
        score: 0.06,
        description:
          "Possible in another domain, but it does not match the exact RAG explanation from the note.",
      },
    ],
    bestCompletion:
      "In RAG, embeddings help retrieve relevant information so a generative model can construct the final answer.",
  },
] as const;

export const llmQuizQuestions = [
  {
    question: "What is the core objective of language modeling?",
    options: [
      "To find true facts in a database and return them verbatim.",
      "To predict the most probable next token based on previous tokens and context.",
      "To retrieve information explicitly from the internet.",
      "To execute source code directly to provide a solution.",
    ],
    correctIndex: 1,
    explanation:
      "Predicting the most probable next token is the core mechanism of language modeling. The roadmap note is very explicit that the model is not simply looking up facts or executing code natively.",
  },
  {
    question:
      'What is the difference between "an LLM gives answers" and "an LLM performs language modeling"?',
    options: [
      '"Giving answers" describes the internal architecture, while "language modeling" is what users see.',
      '"Giving answers" is the user-facing output behavior, while "language modeling" is the internal mechanism of predicting tokens.',
      "There is no difference; they both refer strictly to the generation of code.",
      '"Language modeling" refers only to translation tasks, not question-answering.',
    ],
    correctIndex: 1,
    explanation:
      'Users see final answers, but under the hood the system is performing token-by-token language modeling. That exact distinction is one of the main ideas in the roadmap note.',
  },
  {
    question: "Why can next-token prediction lead to reasoning-like behavior?",
    options: [
      "Because good next-token prediction requires learning the hidden structure behind language, such as logic and relationships.",
      "Because next-token prediction relies on human-like consciousness.",
      "Because models are explicitly hardcoded with formal logic formulas.",
      "Because reasoning is an innate feature of all neural networks regardless of task.",
    ],
    correctIndex: 0,
    explanation:
      "The note explains that to predict well, the model must capture patterns involving logic, relationships, step-by-step structure, and comparisons. That is why reasoning-like behavior can emerge.",
  },
  {
    question: "What is the difference between scale laws and emergence?",
    options: [
      "Scale laws describe sudden capabilities, while emergence describes gradual improvement.",
      "Scale laws apply only to foundation models, while emergence applies only to task-specific models.",
      "Scale laws describe gradual improvement, while emergence refers to abilities becoming noticeably usable only at larger scales.",
      "Emergence refers to adding more parameters, whereas scale laws refer to adding more data.",
    ],
    correctIndex: 2,
    explanation:
      "The roadmap note separates these ideas clearly: scale laws are about steady improvement, while emergence is about certain capabilities becoming clearly visible or usable once enough scale is reached.",
  },
  {
    question: "Why does emergence not mean that intelligence magically appears?",
    options: [
      "Because emergence only happens when the model accesses the internet for the first time.",
      "Because it usually means the model finally has enough capacity to represent and combine patterns that existed but were too weak in smaller versions.",
      "Because it means developers hardcoded the capability right before release.",
      "Because emergence is just an illusion caused by flawed evaluation metrics.",
    ],
    correctIndex: 1,
    explanation:
      "The roadmap note is clear that emergence is not magic. It usually means the model now has enough capacity to combine learned patterns effectively enough to succeed at a task it previously could not handle well.",
  },
  {
    question: "What makes a foundation model different from a task-specific model?",
    options: [
      "A foundation model only performs semantic search, while task-specific models chat.",
      "A foundation model is broad, adaptable, and general-purpose, while a task-specific model is built for one defined, narrow purpose.",
      "Foundation models are usually much smaller than task-specific models.",
      "Task-specific models are trained only on unsupervised massive datasets, unlike foundation models.",
    ],
    correctIndex: 1,
    explanation:
      "A foundation model serves as a broad base for many tasks, while a task-specific model specializes in one area, such as spam detection or sentiment classification.",
  },
  {
    question:
      "Why can a task-specific model sometimes outperform a general foundation model on a narrow task?",
    options: [
      "It is trained exclusively on data for that specific job and optimized for it, making it more focused and efficient.",
      "It always has significantly more parameters than a foundation model.",
      "Task-specific models can predict multiple tokens at the same time.",
      "Foundation models cannot be used for narrow tasks.",
    ],
    correctIndex: 0,
    explanation:
      "The roadmap note explains that a task-specific model can be tightly optimized for one objective, which can make it more efficient and more accurate for that narrow use case.",
  },
  {
    question:
      "What is the main difference between a generative model and a representation model?",
    options: [
      "Generative models focus on similarity matching, while representation models generate answers line by line.",
      "Generative models create new content, while representation models convert input into dense numerical embeddings to encode meaning.",
      "Generative models are task-specific, while representation models are always foundation models.",
      "There is no real difference; they are just different names for the same architecture.",
    ],
    correctIndex: 1,
    explanation:
      "Generative models output new tokens or sequences. Representation models produce numerical vectors used for search, clustering, matching, and retrieval.",
  },
  {
    question:
      "In a RAG system, why is a representation model often used before a generative model?",
    options: [
      "To translate the question into another language before generation begins.",
      "To check the user's spelling and grammar first.",
      "To encode meaning and retrieve the most semantically relevant information so the generative model can construct an answer from it.",
      "To generate the first draft response, which the generative model then edits for style.",
    ],
    correctIndex: 2,
    explanation:
      "The representation model helps retrieve relevant information by encoding meaning. The generative model then uses that retrieved context to produce the answer.",
  },
  {
    question:
      "Why is an LLM better described as a sequence prediction system than an answer database?",
    options: [
      "Because it generates text by retrieving entire paragraphs from a hidden database.",
      "Because it learns strict logical operators rather than language patterns.",
      "Because it repeatedly predicts one token at a time rather than looking up pre-written responses.",
      "Because it fundamentally relies on reinforcement learning alone.",
    ],
    correctIndex: 2,
    explanation:
      "The roadmap note emphasizes that LLMs generate answers token-by-token using learned sequence prediction rather than querying a hidden answer database.",
  },
] as const;
