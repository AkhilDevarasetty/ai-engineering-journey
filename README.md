# 🧠 AI Engineering Learning Journey

> A structured, in-depth notebook documenting my path to becoming an **AI Engineer** — built for myself, and freely shared for anyone aspiring to do the same.

---

## 📖 About This Repository

This repository is my personal learning journal as I work through the **AI Engineering roadmap for 2026**, following the curriculum outlined by [CampusX on YouTube](https://youtu.be/99KPe5hIfnE?si=MPrR6qgGMFpbDa_k) and the community-driven [AI Roadmap for 2026](https://roadmap.sh/r/ai-roadmap-for-2026---final-draft) on roadmap.sh.

The goal is simple: **go from zero to production-ready AI Engineer** — with real understanding, not just surface-level familiarity.

Every note here is written the way I wish I had found it when I started:
- Conceptual clarity first, code second
- Analogies and intuition before formal definitions
- Quizzes and scenario-based questions to test deep understanding
- No hand-waving — if something works, I want to know *why*

> 💡 If you're aspiring to become an AI Engineer, treat this as a companion notebook. Clone it, read it, annotate it, and build on top of it.

---

## 🗺️ The Roadmap

This journey follows a deliberate progression — from foundational literacy all the way to production deployment and operations.

```
LLM Literacy → Prompt Engineering → Context Engineering
      ↓
AI Application Development (RAG, Memory, Orchestration, Vector DBs)
      ↓
Agentic AI (Planning, Reasoning, Multi-Agent, Protocols, Frameworks)
      ↓
Fine-Tuning & Model Adaptation
      ↓
LLMOps (Deployment, Observability, Safety, Governance)
```

---

## 📂 Repository Structure

```
AI Engineering Learning Journey/
│
├── 📁 LLM 101/                          # Foundation: LLM Literacy
│   ├── What Is a Large Language Model.md
│   ├── Transformer Architecture.md
│   ├── Tokenization & Embeddings.md
│   ├── Training Paradigm.md
│   ├── Inference Mechanics.md
│   └── Model Ecosystem & Types.md
│
├── 📄 road_map.md                        # Full AI Engineering Roadmap reference
└── 📄 README.md                          # You are here
```

> 🚧 **This repo is actively being built.** New sections will be added as I progress through the roadmap.

---

## 📚 Curriculum Breakdown

### 🔷 Phase 1 — LLM 101: LLM Literacy
> *You can't engineer what you don't understand.*

| Topic | What You'll Learn |
|---|---|
| **What Is a Large Language Model** | Language modeling, next-token prediction, emergence, scale laws, foundation vs task-specific models |
| **Transformer Architecture** | Why RNNs failed, attention mechanism, self-attention, multi-head attention, encoder vs decoder, KV cache |
| **Tokenization & Embeddings** | BPE & WordPiece, tokens vs words, vector representations, semantic similarity, why embeddings power RAG |
| **Training Paradigm** | Pretraining objective, self-supervision, fine-tuning, RLHF, alignment vs capability, why hallucinations happen |
| **Inference Mechanics** | Temperature, top-k, top-p, beam search, log probabilities, token streaming, context length limits |
| **Model Ecosystem & Types** | Proprietary vs open-weight, API vs self-hosted, quantization, MoE, multimodal, reasoning vs chat models |
| **Evaluation & Benchmarks** | What benchmarks measure, MMLU / GSM8K / HumanEval, latency vs accuracy trade-offs |
| **Limitations & Failure Modes** | Hallucination types, prompt sensitivity, data contamination, prompt injection basics |

---

### 🔷 Phase 2 — Prompt Engineering
> *Prompting is soft programming — treat it with engineering discipline.*

- Mental model of prompting (distribution steering, not command execution)
- Prompt structure & anatomy (system / user / assistant messages)
- Instruction design patterns: zero-shot, few-shot, chain-of-thought, self-consistency
- Structured output prompting: JSON schemas, Pydantic-style thinking, function calling
- Prompt robustness: sensitivity testing, adversarial prompting, guardrails, versioning
- Prompt evaluation: task success rate, format accuracy, hallucination rate, A/B testing
- Security & safety: prompt injection, jailbreaks, data leakage, safe system message design

---

### 🔷 Phase 3 — Context Engineering
> *Model quality ≠ system quality. Context is everything.*

- What "context" means in LLM systems (the model's working memory)
- What constitutes context: system instructions, retrieved docs, history, tool outputs, metadata
- **Context Selection** — top-k tuning, re-ranking, filtering
- **Context Compression** — summarization, map-reduce, recursive summarization
- **Context Structuring** — delimiters, role separation, instruction-data isolation
- **Token Budget Management** — counting, dynamic truncation, sliding windows
- Handling context failure: retrieval mismatch, conflicting information, instruction contamination

---

### 🔷 Phase 4 — AI Application Development

#### 🔹 Orchestration
- Why single LLM calls are insufficient for real apps
- Core patterns: Sequential workflows, Conditional routing, Parallel execution, Retry loops
- Structured output & type-safe schemas
- Tool integration & function calling

#### 🔹 Vector Databases
- Why keyword search fails for semantic tasks
- Embeddings, cosine similarity, dot product, high-dimensional intuition
- Tools: **FAISS**, **Pinecone**, **Weaviate**, **Milvus**, **Chroma**

#### 🔹 RAG (Retrieval-Augmented Generation)
- Parametric vs non-parametric memory
- Core pipeline: embed → retrieve → inject → generate
- Chunking strategies, hybrid search (BM25 + vectors), re-ranking
- Advanced patterns: Iterative RAG, Self-RAG, Corrective RAG, Graph RAG, Agentic RAG
- Evaluation: retrieval precision/recall, answer faithfulness, groundedness

#### 🔹 Memory
- Stateless nature of LLMs and why memory is needed
- Short-term (buffer, session), Long-term (persistent user data), Working/execution memory
- Storage: in-memory, relational DBs, vector DBs, key-value stores
- Retrieval strategies: recency, similarity, metadata filtering, importance-based
- Frameworks: **LangGraph Checkpointers**, **LlamaIndex Memory**, **Mem0**

---

### 🔷 Phase 5 — Fine-Tuning & Model Adaptation
> *When prompting isn't enough, adapt the model itself.*

- Fine-tuning fundamentals: parametric adaptation, behavior vs knowledge modification
- Supervised Fine-Tuning (SFT): instruction-response format, cross-entropy objective
- Preference-based tuning: **RLHF**, **DPO** — reward modeling, alignment vs capability
- **PEFT** (Parameter-Efficient Fine-Tuning): adapter-based training, frozen base weights
- **LoRA** (Low-Rank Adaptation): matrix decomposition, injection into attention layers
- **QLoRA**: 4-bit quantization + LoRA, memory optimization
- Data preparation: dataset creation, cleaning, synthetic data generation
- When to fine-tune vs RAG vs prompt engineering
- Overfitting, catastrophic forgetting, regularization strategies
- Adapter management, versioning, deployment of fine-tuned models

---

### 🔷 Phase 6 — Agentic AI

#### 🔹 Planning & Reasoning
- Goal-oriented systems, task decomposition, sequential decision making
- Reasoning patterns: **Chain-of-Thought**, **Tree-of-Thoughts**, **ReAct**, Reflection & self-critique
- Planner–Executor, Controller–Worker, Hierarchical planning patterns
- Multi-agent architectures: collaborative, role-based, orchestrator-subagent, peer-to-peer
- Iterative loops: Think → Act → Observe → Plan → Execute → Evaluate → Revise
- Failure modes: infinite loops, hallucinated tools, over/under-planning, goal drift

#### 🔹 Agent Protocols
- **Model Context Protocol (MCP)** — standardizing tool interfaces, decoupling models from tools
- Client–server architecture for agents
- Tool interface schemas, capability discovery, sandbox execution
- Security: permission control, input validation, preventing arbitrary execution
- Other standards: **A2A**

#### 🔹 Frameworks & Libraries
`LangGraph` · `AutoGen` · `CrewAI` · `LlamaIndex (Agents)` · `Semantic Kernel` · `Haystack` · `OpenAI Agents SDK` · `Agno`

---

### 🔷 Phase 7 — AI Automation
- Rule-based vs LLM-driven automation
- Trigger-based (webhooks, cron), Sequential pipelines, Conditional routing, Retry loops
- Tool integrations: APIs, function calling, DB operations, web scraping, SaaS integrations
- Orchestration tools: **n8n**, **Zapier**, **Make**

---

### 🔷 Phase 8 — LLMOps

#### 🔹 UX & Product Design
- AI interaction design: free-text vs structured inputs, conversational flows
- Trust & transparency: citations, confidence indicators, clear error messaging
- Latency & responsiveness: streaming, progressive loading, async task handling
- Tools: **Streamlit**, **Gradio**, **Next.js**, **Vercel AI SDK**

#### 🔹 Deployment
- Architectures: API-based, self-hosted, hybrid, serverless vs containerized
- Backend: REST APIs, async workers, rate limiting — **FastAPI**, **Flask**, **Node.js**
- Containerization: **Docker**, **Kubernetes**, **AWS ECS**
- Model serving: **vLLM**, **TGI**, **Ollama**, **Hugging Face Inference Endpoints**
- Scaling: horizontal scaling, caching, queue-based systems, token & latency optimization
- CI/CD: prompt & model versioning, automated deployments — **GitHub Actions**, **Terraform**
- Managed platforms: **AWS Bedrock**, **Azure OpenAI**, **Google Vertex AI**

#### 🔹 Observability
- Request & trace logging: full prompt logging, context inspection, tool call tracing
- Token, cost & latency monitoring: cost-per-request, SLA monitoring
- Quality monitoring: hallucination tracking, output validation failures, guardrail trigger rate
- Tools: **LangSmith**, **OpenTelemetry**, **Datadog**, **Grafana**, **TruLens**, **DeepEval**
- Alerting: cost spikes, latency anomalies, automated rollback triggers

#### 🔹 Safety & Guardrails
- Input safety: prompt injection prevention, input validation, role separation, rate limiting
- Output filtering: toxicity detection, PII masking, structured output validation
- Tool safety: permission control, sandboxed execution, limiting system access
- Prompt injection & jailbreak defense: instruction isolation, retrieval filtering
- Human-in-the-loop safeguards: approval workflows, escalation triggers, risk-based routing
- Tools: **Guardrails AI**, **Presidio**, **OpenAI Moderation API**, **MCP-based access control**

#### 🔹 Governance
- Data governance: sourcing policies, PII handling, retention rules, data deletion
- Access & identity: **RBAC**, API key management, OAuth/JWT, **Auth0**, **Okta**
- Model & prompt governance: versioning, approval workflows, change tracking — **MLflow**, **W&B**
- Compliance: GDPR readiness, data localization, industry-specific compliance (finance, healthcare)
- Risk management: impact assessment, AI usage policies, incident reporting
- Auditability: request logging, decision traceability, explainability artifacts

---

## 🎯 Who This Is For

- 🧑‍💻 **Aspiring AI Engineers** — who want to go beyond ChatGPT tutorials and build real systems
- 📐 **Software Engineers** — who want to transition into the AI/ML engineering space
- 🎓 **Students** — following structured AI curricula and wanting supplementary notes
- 🔁 **Self-learners** — who learn best from thorough, first-principles notes with quizzes

---

## 📌 Learning Resources

| Resource | Link |
|---|---|
| 🎥 AI Engineering Roadmap (Video) | [CampusX — YouTube](https://youtu.be/99KPe5hIfnE?si=MPrR6qgGMFpbDa_k) |
| 🗺️ AI Roadmap for 2026 | [roadmap.sh](https://roadmap.sh/r/ai-roadmap-for-2026---final-draft) |

---

## 🚀 Progress Tracker

| Phase | Topic | Status |
|---|---|---|
| 1 | What Is a Large Language Model | ✅ Done |
| 1 | Transformer Architecture | ✅ Done |
| 1 | Tokenization & Embeddings | ✅ Done |
| 1 | Training Paradigm | ✅ Done |
| 1 | Inference Mechanics | ✅ Done |
| 1 | Model Ecosystem & Types | ✅ Done |
| 1 | Evaluation & Benchmarks | 🔄 In Progress |
| 1 | Limitations & Failure Modes | 🔄 In Progress |
| 2 | Prompt Engineering | 📋 Planned |
| 3 | Context Engineering | 📋 Planned |
| 4 | AI Application Development | 📋 Planned |
| 5 | Fine-Tuning | 📋 Planned |
| 6 | Agentic AI | 📋 Planned |
| 7 | AI Automation | 📋 Planned |
| 8 | LLMOps | 📋 Planned |

---

## 💬 A Note to Future Readers

This repository is built on the belief that the best way to learn something is to teach it. Every file here is written so that someone picking it up cold — with no prior context — can follow along, understand deeply, and walk away with real intuition.

If these notes helped you, give the repo a ⭐. If you spot something wrong or want to contribute, feel free to open an issue or PR.

Good luck on your AI Engineering journey. 🚀

---

*Started: March 2026 · Following the AI Roadmap for 2026*
