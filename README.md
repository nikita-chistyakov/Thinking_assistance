# 🧠 ClearThink AI

> **Your partner in structured thinking, decision intelligence, and rational problem-solving.**

[![Gemini](https://img.shields.io/badge/Gemini_API-2.5_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Table of Contents

- [Overview](#overview)
- [The Core Philosophy](#the-core-philosophy)
- [The 6-Step Decision Protocol](#the-6-step-decision-protocol)
- [Built-In Mental Models](#built-in-mental-models)
- [Prompt Playbook & Examples](#prompt-playbook--examples)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Troubleshooting & FAQ](#troubleshooting--faq)

---

## 💡 Overview

**ClearThink AI** is an intelligent conversational agent engineered to guide individuals, leaders, engineers, and strategists through complex, ambiguous decisions.

Unlike typical chatbots that rush to give generic advice or hallucinated opinions, ClearThink AI acts as a **methodical Socratic facilitator**. It enforces cognitive discipline, helps users unbundle tangled assumptions, and guides them step-by-step toward self-determined clarity and committed action.

### Why Structured Thinking?

Human decision-making is prone to well-documented cognitive biases:
- **Confirmation Bias:** Searching only for information that confirms our pre-existing hunch.
- **Premature Convergence:** Jumping to the first plausible solution before considering the broader space.
- **Analysis Paralysis:** Drowning in endless variables without an objective framework to prioritize.
- **Action Resistance:** Failing to translate decisions into concrete, low-friction next steps.

ClearThink AI serves as an external cognitive scaffolding that keeps you grounded, objective, and action-oriented.

---

## 🎯 The Core Philosophy

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                   ClearThink Golden Rule                        │
  │                                                                 │
  │   "The AI never makes the decision for you. It illuminates the   │
  │    landscape so that YOU can make the right decision yourself."  │
  └─────────────────────────────────────────────────────────────────┘
```

1. **Socratic, not Prescriptive:** ClearThink asks targeted, incisive questions rather than handing down answers.
2. **Sequential Discipline:** Each stage of the decision must be resolved before advancing to the next.
3. **Calm & Methodical Tone:** Neutral, patient, and objective to dampen emotional reactivity.
4. **Action-Biased:** Every session concludes with an actionable first step within 24–48 hours.

---

## 🪜 The 6-Step Decision Protocol

ClearThink AI guides every conversation through a strictly sequenced 6-stage protocol:

```
  [Stage 1]  Problem Framing & Grounding
      │
      ▼
  [Stage 2]  Outcome & Goal Crystallization
      │
      ▼
  [Stage 3]  Divergent Brainstorming (3-5 Paths)
      │
      ▼
  [Stage 4]  Multi-Criteria Pros & Cons Analysis
      │
      ▼
  [Stage 5]  Decision Selection & First Micro-Action
      │
      ▼
  [Stage 6]  Synthesis, Commitment & Retrospective
```

### Detailed Breakdown

| Phase | Objective | Key Prompting Pattern |
|---|---|---|
| **1. Problem Framing** | Strip away noise; state the core dilemma in one concise sentence. | *"To confirm, the core problem you're navigating is [X]. Is that accurate?"* |
| **2. Goal Definition** | Clarify the ideal outcome and the non-negotiable success metrics. | *"If this problem is resolved 6 months from now, what does success look like?"* |
| **3. Brainstorming** | Generate at least 3–5 viable paths before applying any criticism. | *"Let's generate 3-5 distinct options without judging them yet. What's on the table?"* |
| **4. Option Analysis** | Systematically dissect upsides, downsides, risks, and second-order effects. | *"Let's look at Option 1. What are the major pros? And what are the hidden risks/cons?"* |
| **5. Decision & Micro-Action** | Select the strongest option and define the very first physical step. | *"Looking at the trade-offs, which path feels right? What is the single step you will take today?"* |
| **6. Review & Conclude** | Summarize the logic chain and create an accountable takeaway. | *"Here is your action plan: [Option] starting with [Step 1]. You've created clarity."* |

---

## 🧠 Built-In Mental Models

ClearThink's system instructions leverage foundational mental models from decision theory, philosophy, and cognitive psychology:

### 1. First Principles Thinking
Deconstruct an issue down to its most fundamental physical or logical truths, then reason up from there rather than reasoning by analogy.

### 2. Second-Order Thinking
Ask: *"And then what?"* Examine the secondary and tertiary consequences of an action, avoiding short-term fixes that cause long-term pain.

### 3. Pre-Mortem Analysis (Gary Klein)
Assume you chose a path and it failed catastrophically 12 months later. Ask: *"What caused it to fail?"* This exposes blind spots before committing resources.

### 4. Inversion (Carl Jacobi)
Instead of asking how to succeed, ask how you could guarantee failure—and systematically avoid those pitfalls.

### 5. Regret Minimization Framework (Jeff Bezos)
Project yourself forward to age 80 looking back on your life. Will you regret trying and failing, or will you regret never trying at all?

### 6. The 10/10/10 Rule (Suzy Welch)
Evaluate how a decision will feel in **10 minutes**, in **10 months**, and in **10 years**. Distinguishes transient discomfort from enduring value.

---

## 📋 Prompt Playbook & Examples

Try kicking off your ClearThink session with any of these sample dilemmas:

### Career & Leadership
> *"I've been offered a promotion into management at my current company, but a startup also offered me a senior individual contributor role with equity. I feel torn."*

### Technical Architecture
> *"We need to choose between building our real-time notification engine with PostgreSQL LISTEN/NOTIFY versus deploying a managed Redis Pub/Sub cluster."*

### Business Strategy
> *"Our SaaS churn rate increased to 4.2% this quarter. We're debating whether to rebuild onboarding, overhaul pricing, or introduce customer success touchpoints."*

### Personal Finance
> *"I have $30,000 in savings and can either pay off my student loans at 5.5% interest, invest in an index fund, or keep it in high-yield cash for a house down payment."*

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   ClearThink Client                    │
│                                                        │
│  ┌─────────────────────────┐  ┌─────────────────────┐  │
│  │   Interactive Chat UI   │  │   Readme & Docs     │  │
│  │  (Real-time Markdown)   │  │ (Mental Models/FAQ) │  │
│  └───────────┬─────────────┘  └─────────────────────┘  │
└──────────────┼─────────────────────────────────────────┘
               │ Streaming chat sessions
               ▼
┌────────────────────────────────────────────────────────┐
│               @google/genai TypeScript SDK             │
│            Model: gemini-2.5-flash (Temp: 0.7)         │
│                                                        │
│   ┌─────────────────────────────────────────────────┐  │
│   │ System Prompt: 6-Step Socratic State Machine     │  │
│   │ Persona: Calm, methodical, non-prescriptive     │  │
│   └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Key Libraries
- **`@google/genai` (v1.12.0+):** Official Google Gen AI TypeScript SDK utilizing Gemini 2.5 Flash for rapid, coherent, low-latency conversational streams.
- **`marked` (v16.1.2+):** High-speed asynchronous markdown parser rendering lists, bold highlights, blockquotes, and code blocks as the stream arrives.
- **`lucide-react`:** Crisp iconography for state indicators, documentation badges, navigation, and model cards.
- **`Tailwind CSS`:** Polished dark-mode UI with slate backgrounds, cyan highlights, responsive layouts, and accessible contrast.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or later recommended)
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/clearthink-ai.git
   cd clearthink-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚙️ Configuration

| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Your Google AI Studio API key | Required |
| `PORT` | Local dev server port | `3000` |

---

## ❓ Troubleshooting & FAQ

**Q: Why doesn't ClearThink AI just tell me what to do?**  
A: Direct advice frequently overlooks personal values, unstated constraints, and emotional tolerance. ClearThink empowers you to uncover your own optimal path, ensuring full commitment to execution.

**Q: Can I change the problem mid-conversation?**  
A: Yes! You can either tell the AI: *"I want to re-frame the problem to [X]"* or click the **Reset Session** button in the top navigation bar to start fresh.

**Q: Is my conversation saved to an external database?**  
A: No. By default, conversations exist purely in local browser memory during the session for privacy.

---

<div align="center">
  <p>Crafted for clear minds and confident decisions with Google AI Studio & Gemini.</p>
</div>
