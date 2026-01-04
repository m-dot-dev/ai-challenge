# AI Code Review Assistant

This project is a prototype AI-powered code review assistant built using **Next.js (App Router)**, **TypeScript**, **React**, and **React Query**, leveraging the **OpenAI API** for AI code analysis. It demonstrates multiple AI code review modes in a single interface: Reviewer, Pair Engineer, and Extended Pair Engineer.

---

## Challenge Context

**Careem Optional AI Challenge (Software Engineer, 4+ years)**

- **Objective:** Show AI savviness by building a small AI tool.
- **Options:**
  1. **Smart Code Reviewer:** Reviews code for readability, structure, and maintainability before human review.
  2. **AI Pair Engineer:** Codes alongside developers — detecting design flaws, proposing tests, and refactoring.
  3. **Code Review Assistant:** Writes a prompt that reviews short code snippets and recommends three improvements plus one positive note.

---

## Approach

This prototype implements **Reviewer, Pair Engineer, and Extended Pair modes**:

1. **Reviewer Mode:** Analyzes code for readability, structure, and maintainability, providing feedback without changing the code.
2. **Pair Engineer Mode:** Offers actionable suggestions in plain text to improve code quality.
3. **Extended Pair Engineer Mode:** Provides suggestions **with optional code snippets**, showing how fixes could be implemented safely without overwriting the original code.

**Key Features:**

- Outputs structured **JSON** from the AI for predictable frontend rendering.
- Supports dark/light mode with a responsive UI.
- Demonstrates progressive AI assistance: static review → guided suggestions → actionable refactoring guidance.
- Designed to feel helpful and collaborative rather than pessimistic or overwhelming.

---

## How to Run

1. Clone the repository:

```
git clone <repo-url>
```

2. Install dependencies:

```
npm install
```

3. Set your OpenAI API key:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
```

4. Run the development server:

```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to access the interface.

---

## Usage

- **Select a mode** using the radio buttons:
  - Reviewer: Basic analysis
  - Pair Engineer: Text suggestions
  - Extended Pair Engineer: Text + code snippets
- **Paste TypeScript / React code** into the textarea.
- Click **Analyze** to get AI feedback.

---

## 100-Word Summary

This prototype demonstrates an AI Code Review Assistant built with Next.js, TypeScript, React, and React Query, integrating the OpenAI API. It supports three modes: Reviewer (static analysis of readability and maintainability), Pair Engineer (actionable text-based suggestions), and Extended Pair Engineer (includes optional code snippets for safer refactoring). To keep feedback constructive and developer-friendly, the assistant includes a positive note. The prototype demonstrates progressive AI assistance and practical frontend–AI integration, highlighting my approach to building thoughtful, maintainable, and user-centric AI developer tools.

---

## Notes

- This is a **prototype for demonstration purposes**.
- Uses **dummy/public code** for testing; no confidential data included.
- Designed to showcase **AI thinking, code review, and interactive suggestions**.

## Testing Approach

For this challenge, I focused on unit and component-level tests using Jest and React Testing Library to validate UI behavior and mode selection logic. I intentionally avoided full integration tests to keep the setup lightweight and the signal focused on reasoning, maintainability, and developer experience.
