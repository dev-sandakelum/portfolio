export const meta = {
  slug: "prompt-engineering-basics",
  category: "ai",
  title: "Prompt Engineering Basics — AI Skill Sheet",
  titleSi: "Prompt Engineering මූලික දැනුම — AI Skill Sheet",
  description: "Learn the core techniques of prompt engineering to get better results from any AI model.",
  descriptionSi: "ඕනෑම AI model එකෙන් හොඳ results ලබා ගන්නා Prompt Engineering techniques ඉගෙන ගනිමු.",
  date: "2025-06-20",
  tags: ["prompt-engineering", "ai", "chatgpt", "beginners"],
  coverImage: "/download/ai/prompt-engineering-basics/cover.png",
  downloads: [
    {
      file: "/download/ai/prompt-engineering-basics/pdf-academic-doc-by-HS.skill",
      label: "Academic Document Template (by HS)",
      filename: "pdf-academic-doc-by-HS.skill",
      fileType: "SKILL",
      fileSize: "",
    },
    {
      file: "/download/ai/prompt-engineering-basics/project-report.skill",
      label: "Project Report Skill Template",
      filename: "project-report.skill",
      fileType: "SKILL",
      fileSize: "",
    },
  ],
  downloadLabel: "Download Skill Files",
};

export const content = `
## Prompt Engineering යනු කුමක්ද?

**Prompt Engineering** කියන්නේ AI models (ChatGPT, Claude, Gemini) ට නිවැරදි output ලබා ගැනීම සඳහා input (prompt) නිවැරදිව ලිවීමේ කලාව සහ විද්‍යාවයි. හොඳ prompt එකක් ලිවීම = හොඳ result ලබා ගැනීම.

---

## Core Techniques

### 1. Be Specific (නිශ්චිත වන්න)

**Bad prompt:**
\`\`\`
Write about AI
\`\`\`

**Good prompt:**
\`\`\`
Write a 200-word beginner-friendly explanation of 
how machine learning works, using a simple analogy.
\`\`\`

### 2. Give Context (Context දෙන්න)

AI ට ඔබ කවුද, ඔබ කිරීමට අවශ්‍ය කුමක්ද, ඒ ඇයි කියා කියන්න.

\`\`\`
I am a university student studying computer science.
Explain neural networks to me as if I have basic Python 
knowledge but no ML experience.
\`\`\`

### 3. Role Prompting (Role දෙන්න)

AI ට specific role එකක් assign කිරීමෙන් better results ලැ‍බේ.

\`\`\`
You are an expert career coach specializing in tech industry.
Review my resume and suggest 3 improvements.
\`\`\`

### 4. Chain of Thought (Step-by-step ඉල්ලන්න)

Complex tasks සඳහා AI ට step-by-step think කරන්නට කියන්න.

\`\`\`
Solve this problem step by step:
A train travels 60km/h for 2 hours, then 80km/h for 1 hour.
What is the total distance and average speed?
\`\`\`

### 5. Few-Shot Examples (Examples දෙන්න)

ඔබට අවශ්‍ය format / style ගැන examples දෙන්න.

\`\`\`
Convert these sentences to formal English:
Input: "gonna head out now" → Output: "I will be leaving now."
Input: "wanna grab some food?" → Output: "Would you like to get something to eat?"
Input: "lemme know asap" → Output: [AI completes this]
\`\`\`

---

## Prompt Structure Template

හොඳ prompt එකක් සෑදීම සඳහා structure:

\`\`\`
[ROLE] You are a [expert role].
[CONTEXT] I am [who you are] trying to [goal].
[TASK] Please [specific task].
[FORMAT] Respond in [format: bullet points / table / paragraph].
[CONSTRAINTS] Keep it [length] and [tone: simple/technical/friendly].
\`\`\`

---

## Common Mistakes

- ❌ Too vague — "Write something about technology"
- ❌ No context — AI doesn't know your background
- ❌ One shot only — Iterate! Refine your prompt based on output
- ❌ Ignoring tone — Specify formal/casual/technical
- ✅ Always review output and re-prompt if needed

---

## Quick Reference Card

| Technique | When to use |
|-----------|-------------|
| Be Specific | Always |
| Role Prompting | Professional tasks |
| Chain of Thought | Math, logic, planning |
| Few-Shot | Formatting, style |
| Context Setting | Technical explanations |

---

> **ඉඟිය:** Prompt writing is a skill — practice කරන තරමට, AI සමඟ collaborate කිරීමේ හැකියාව ඉහළ යයි.

> **WhatsApp Channel** → [Join කරන්න](/link/whatsapp)
`;
