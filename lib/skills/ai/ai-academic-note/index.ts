export const meta = {
  slug: "ai-academic-note",
  category: "ai",
  title: "AI Academic Note Generator — PDF Skill by HS",
  titleSi: "AI Academic Note Generator — HS විසින් නිර්මිත PDF Skill",
  description: "Instantly generate a print-ready academic short note by simply providing your document. The skill formats it with proper academic structure.",
  descriptionSi: "ඔබගේ document එක provide කිරීමෙන් පමණක් print-ready academic short note එකක් ක්ෂණිකව generate කරගන්න. Skill එක proper academic structure සහිතව format කරයි.",
  date: "2025-06-20",
  tags: ["ai-skill", "academic", "pdf", "print-ready", "document"],
  coverImage: "",
  downloads: [
    {
      file: "/download/ai/ai-academic-note/pdf-academic-doc-by-HS.skill",
      label: "AI Academic Note Skill File",
      filename: "pdf-academic-doc-by-HS.skill",
      fileType: "SKILL",
      fileSize: "",
      description: "Drop this .skill file into your AI tool to activate the academic note generator.",
    },
  ],
  downloadLabel: "Download Skill File",
};

export const content = `
## AI Academic Note Generator — කෘතිම බුද්ධිය සමඟ Academic Notes ලිවීම

මෙම AI skill file එක භාවිතා කිරීමෙන් ඔබට ඕනෑම document, article, හෝ research content ක් **print-ready academic short note** ලෙස ක්ෂණිකව transform කර ගත හැකිය.

---

## Skill File එක කරන්නේ කුමක්ද?

මෙම **\`.skill\`** file එක AI tool (ChatGPT, Claude, Gemini ආදිය) ට load කළ පසු:

- ✅ ඔබගේ raw content academic format ලෙස structure කරයි
- ✅ Title, Abstract, Introduction, Body, Conclusion sections සෑදෙයි
- ✅ Citation/reference template include කරයි
- ✅ Print-ready HTML output generate කරයි
- ✅ Browser හරහා direct print / PDF save කළ හැකිය

---

## Skill File ඇතුළත ඇත්තේ කුමක්ද?

\`pdf-academic-doc-by-HS.skill\` file ඇතුළත:

\`\`\`
pdf-academic-doc/
├── SKILL.md               ← AI instructions & prompt template
└── references/
    └── template.html      ← Print-ready HTML output template
\`\`\`

- **SKILL.md** — AI ට කියා දෙන instructions සහ workflow
- **template.html** — Styled, print-ready academic document HTML layout

---

## භාවිතා කරන ආකාරය (How to Use)

### පියවර 1 — Skill File Download කරන්න
පහත ඇති **Download** button click කර \`.skill\` file ඔබේ device ට save කරන්න.

### පියවර 2 — AI Tool එකේ Load කරන්න
\`\`\`
ChatGPT / Claude / Gemini / Kiro හිදී:
→ Attach file option හරහා .skill file upload කරන්න
→ හෝ file content copy කර AI ට paste කරන්න
\`\`\`

### පියවර 3 — ඔබේ Document Provide කරන්න
\`\`\`
"Use the loaded skill. Here is my content:
[ඔබේ article / notes / research content paste කරන්න]"
\`\`\`

### පියවර 4 — HTML Output ලබා ගන්න
AI විසින් structured HTML file generate කරයි.

### පියවර 5 — Print / Save as PDF
\`\`\`
1. AI output HTML code copy කරන්න
2. New .html file එකක් create කරන්න
3. Browser හි open කරන්න
4. Ctrl+P (Print) → Save as PDF select කරන්න
\`\`\`

---

## Output Preview — Academic Note Structure

Generated document structure:

| Section | Content |
|---------|---------|
| **Header** | Institution, Date, Author |
| **Title** | Academic formatted title |
| **Abstract** | 150-word summary |
| **Introduction** | Background & objectives |
| **Body** | Structured content sections |
| **Conclusion** | Key findings |
| **References** | Citation list |

---

## Print Features — Print-Ready Elements

\`\`\`css
/* Built-in print features */
- A4 page size optimization
- Proper margins (2.5cm academic standard)
- Page numbers (auto)
- Print-safe fonts (Times New Roman / Georgia)
- No background colors in print mode
- Proper heading hierarchy
\`\`\`

---

## Use Cases — භාවිතා අවස්ථා

- 📄 University assignments සඳහා short notes
- 📚 Research summaries academic format ලෙස
- 🏫 Lecture notes proper structure ලෙස
- 📑 Conference notes printable version
- 🎓 Study guides academic layout ලෙස

---

## Tips — හොඳ Results සඳහා

> **ඉඟිය 1:** Content clear paragraphs ලෙස provide කරන්නේ නම් AI output ඉතාම හොඳ වේ.

> **ඉඟිය 2:** Institution name, course code, date ද include කරන්නේ නම් header section ද complete ව generate වේ.

> **ඉඟිය 3:** Output HTML browser හි preview කර, satisfied නම් PDF save කරන්න.

---

> **WhatsApp Channel** එකට join වී මෙවැනි AI skills ගැන latest updates ලබා ගන්න 👇
> [Join කරන්න →](/link/whatsapp)
`;
