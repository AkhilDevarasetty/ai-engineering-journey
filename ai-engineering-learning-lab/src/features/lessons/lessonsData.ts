type LessonKey = "llm-intro" | "transformer-architecture";

type LessonTopic = {
  order: string;
  title: string;
  summary: string;
  cta: string;
  lessonKey?: LessonKey;
};

export const llm101Topics: LessonTopic[] = [
  {
    order: "01",
    title: "What Is a Large Language Model",
    summary:
      "Understand what language modeling actually means, why next-token prediction matters, and how capabilities emerge at scale.",
    lessonKey: "llm-intro",
    cta: "Open",
  },
  {
    order: "02",
    title: "Transformer Architecture",
    summary:
      "Study the system layer that replaced RNN bottlenecks with attention, parallelism, and scalable context handling.",
    lessonKey: "transformer-architecture",
    cta: "Open",
  },
  {
    order: "03",
    title: "Tokenization & Embeddings",
    summary:
      "Learn how raw text becomes tokens and embeddings so models and retrieval systems can operate on meaning.",
    cta: "Soon",
  },
  {
    order: "04",
    title: "Training Paradigm",
    summary:
      "Explore how pretraining, objective design, and optimization shape what a modern language model can learn.",
    cta: "Soon",
  },
  {
    order: "05",
    title: "Inference Mechanics",
    summary:
      "Understand what happens during generation, from context handling to token-by-token decoding at runtime.",
    cta: "Soon",
  },
  {
    order: "06",
    title: "Model Ecosystem & Types",
    summary:
      "Compare model categories and how generative, representation, and specialized systems fit together in practice.",
    cta: "Soon",
  },
] as const;
