# Reusable Prompt: Format Study Notes

> Copy everything inside the --- block and paste it into a new chat.
> Replace the bracketed placeholders before sending.

---

## PROMPT (copy from here)

---

I have a raw study notes file that needs to be reformatted. Please read the file at this path:

`[PASTE ABSOLUTE FILE PATH HERE]`

Also read these existing formatted files for style consistency:
- `/Users/niharikainala/Documents/AI Engineering Learning Journey/Roadmap/Prompt Engineering/Instruction Design Patterns.md`
- `/Users/niharikainala/Documents/AI Engineering Learning Journey/Roadmap/Prompt Engineering/Structured Output Prompting.md`

---

### Who I Am

I am a web developer transitioning into AI Engineering. I know software concepts (APIs, TypeScript types, HTTP, databases, component state) but I am new to AI-domain terminology. When simplifying language, use web development analogies to explain AI-specific concepts — don't assume I already know terms like "logit", "token", "FSM", or "decoding strategy" without grounding them first.

---

### What To Do

**1. Reformat the document structure**
- Add a `# Title` heading at the top
- Add a short italicised tagline: `> 💡 [One sentence explaining why this topic matters]`
- Number each main topic as a section: `## 1. Topic Name`, `## 2. Topic Name`, etc.
- Number each follow-up question as a sub-section: `### 1.1 Follow-up: [Short title]`
- End each follow-up block with a `> 🔍 **Follow-up question explored here:** *"..."*` callout that preserves the original question for context
- Add a `## Quick Reference — All Concepts at a Glance` table near the end
- Close with `*File last updated: [Month Year] — Part of the [Module] module, AI Engineering Learning Journey.*`

**2. Preserve all original content and learning context**
- Keep every original question exactly as asked
- Keep every answer — do not remove any concept
- Keep the original follow-up questions and their answers
- Do not add new concepts that weren't in the original notes
- The goal is reformatting and clarifying, not rewriting from scratch

**3. Simplify technical language where needed**
- Target reader: a web developer who understands code but is new to AI domain terms
- When a definition is too dense or uses unexplained jargon, rephrase it
- Use concrete analogies from web development (e.g. TypeScript interfaces, REST APIs, form inputs, compilers) to explain AI-specific concepts
- Do not dumb it down — keep the technical accuracy, just make the entry point clearer
- Only simplify where it genuinely helps; leave clear definitions as-is

**4. Reformat tables**
- Convert any flat text comparisons into proper markdown tables
- Every comparison table should have a clear header row
- Remove leftover citation artifacts like `Medium +1`, `DEV Community`, `GlobalLogic +2` etc.

**5. Add prompt samples at the end of each main section**
- Each section (not sub-section) should end with a `### 🧪 Prompt Sample` block
- The sample must be a real, copy-paste-ready prompt or code snippet that demonstrates the concept from that section
- If the section is about a coding pattern (like Pydantic), the sample should be a short working code block
- If the section is about a prompting technique, the sample should be a formatted prompt
- The sample must connect directly to the concept — not be a generic example

**6. Add 10 quiz questions at the end**
- Place them in a `## Quiz — Deep Understanding Check` section
- Each question must use `<details><summary>💡 Answer</summary>.....</details>` so answers are hidden until clicked
- Questions must test deep understanding — not surface recall
- Cover: concept application, tradeoffs, real-world scenarios, "why not X instead?", and failure modes
- Questions should go beyond definitions — ask "when would this fail?" or "which approach, and why?"
- Do NOT add prompt samples inside the quiz answers — keep answers concept-only

**7. Formatting rules**
- Use GitHub-flavored Markdown throughout
- Use `>` blockquotes for key insights and analogies
- Use inline code backticks for field names, code terms, and schema values
- Use fenced code blocks with language tags (` ```python `, ` ```json `, ` ``` `) for all code and prompt samples
- Keep bullet points concise — one idea per bullet
- Do not use HTML except for `<details>` and `<summary>` tags in quiz questions

---

### What NOT To Do

- Do not add new topics or concepts that weren't in the original file
- Do not remove any content — only restructure and clarify
- Do not put prompt samples inside quiz answer blocks
- Do not use TailwindCSS-style or inline styles
- Do not leave citation artifacts in the output (e.g. `Medium +3`, `IBM +1`)
- Do not break original follow-up questions into separate files

---

### Optional Overrides (fill in if needed)

- **Audience adjustment:** [leave blank OR describe a more specific background, e.g. "also knows React and Node.js"]
- **Simplification level:** [leave blank for default OR "aggressive" to simplify all jargon / "minimal" to only fix very dense passages]
- **Extra reference files:** [leave blank OR add paths to other files for consistency]

---
