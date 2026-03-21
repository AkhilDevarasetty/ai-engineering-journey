export const dashboardLessons = [
  {
    title: "What Is a Large Language Model",
    description:
      "Build intuition for how modern language models predict, generalize, and become useful engineering systems.",
    progressLabel: "In Progress",
    progress: 60,
    cta: "Continue Learning",
    badge: "Core Module",
  },
  {
    title: "Tokenization and Embeddings",
    description:
      "Understand how text becomes tokens and vectors before a model can reason over it.",
    progressLabel: "15% Complete",
    progress: 15,
    cta: "Start Lesson",
  },
  {
    title: "Transformer Architecture",
    description:
      "Explore self-attention, context flow, and the structure behind modern generative models.",
    progressLabel: "Not Started",
    progress: 0,
    cta: "Open Overview",
  },
] as const;

export const dashboardActivities = [
  {
    title: "Resumed: Attention Mechanisms",
    detail: "Picked up from the guided walkthrough in the LLM module.",
    time: "Today",
  },
  {
    title: "Notes Added: BPE Merges",
    detail: "Captured key takeaways from the tokenization simulation.",
    time: "Yesterday",
  },
  {
    title: "Concept Check Completed",
    detail: "Finished the tokenization checkpoint and reviewed explanations.",
    time: "2 days ago",
  },
] as const;
