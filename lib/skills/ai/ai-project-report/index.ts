export const meta = {
  slug: "ai-project-report",
  category: "ai",
  title: "AI Project Report Generator — Smart Report Skill",
  titleSi: "AI Project Report Generator — ස්මාර්ට් Report Skill",
  description: "Generate a complete, print-ready project report for anything by providing basic instructions and your document. Outputs structured HTML ready to print.",
  descriptionSi: "Basic instructions සහ ඔබේ document provide කිරීමෙන් ඕනෑම project සඳහා complete, print-ready project report එකක් generate කරගන්න. Print කිරීමට සූදානම් structured HTML output ලැබේ.",
  date: "2025-06-20",
  tags: ["ai-skill", "project-report", "html", "print-ready", "document"],
  coverImage: "",
  downloads: [
    {
      file: "/download/ai/ai-project-report/project-report.skill",
      label: "AI Project Report Skill File",
      filename: "project-report.skill",
      fileType: "SKILL",
      fileSize: "",
      description: "Drop this .skill file into your AI tool to activate the project report generator.",
    },
  ],
  downloadLabel: "Download Skill File",
};

export const content = `
## AI Project Report Generator — ඕනෑම Project Report ක්ෂණිකව සාදා ගන්න

මෙම AI skill file එක භාවිතා කිරීමෙන් basic instructions සහ document data **provide** කිරීම ම ප්‍රමාණවත් ය — AI ස්වයංක්‍රීයව **professional, print-ready project report** HTML file generate කරයි.

---

## Skill File එක කරන්නේ කුමක්ද?

\`project-report.skill\` file AI tool ට load කළ පසු:

- ✅ Basic info (project name, team, date) → Full formal report
- ✅ Industry-standard project report structure generate කරයි
- ✅ References, citation styles support (APA, MLA, IEEE)
- ✅ Print-ready HTML — browser හරහා direct PDF export
- ✅ A4 / Letter size print optimization

---

## Skill File ඇතුළත ඇත්තේ කුමක්ද?

\`project-report.skill\` file ඇතුළත:

\`\`\`
project-report/
├── SKILL.md                          ← AI instructions & workflow
└── references/
    ├── citation-styles.md            ← APA / MLA / IEEE citation guides
    └── report-template.html          ← Full print-ready HTML template
\`\`\`

- **SKILL.md** — AI ට project report generate කරන ආකාරය කියා දෙන instructions
- **citation-styles.md** — Multiple citation format support
- **report-template.html** — Complete styled HTML report template

---

## භාවිතා කරන ආකාරය (How to Use)

### පියවර 1 — Skill File Download කරන්න
**Download** button click කර \`.skill\` file save කරන්න.

### පියවර 2 — AI Tool ට Load කරන්න
\`\`\`
→ ChatGPT / Claude / Gemini / Kiro හිදී
→ Attach file / Upload option හරහා .skill file upload කරන්න
→ හෝ file content copy-paste කරන්න
\`\`\`

### පියවර 3 — Project Details Provide කරන්න

**Minimum input** (basic mode):
\`\`\`
Project Title: [ඔබේ project name]
Team Members: [names]
Date: [date]
Brief Description: [2-3 sentences about the project]
\`\`\`

**Full input** (best results):
\`\`\`
Project Title: Smart Irrigation System
Team: Hasitha (Team Lead), Sandakelum (Developer)
Date: June 2025
Objective: Automate water distribution using IoT sensors
Document/Data: [paste your research notes, data, findings here]
Citation Style: APA
\`\`\`

### පියවර 4 — Report Generate කරන්න
\`\`\`
"Generate a complete project report using the loaded skill.
Here are my project details: [paste your details]"
\`\`\`

### පියවර 5 — Print / PDF Save
\`\`\`
1. Generated HTML code copy කරන්න
2. report.html file ලෙස save කරන්න
3. Browser හි open → Ctrl+P
4. "Save as PDF" select කරන්න ✅
\`\`\`

---

## Generated Report Structure

| Section | Description |
|---------|-------------|
| **Cover Page** | Project title, team, institution, date |
| **Table of Contents** | Auto-generated TOC |
| **Executive Summary** | Brief project overview |
| **Introduction** | Background & problem statement |
| **Objectives** | Goals and expected outcomes |
| **Methodology** | Approach and tools used |
| **Results & Discussion** | Findings and analysis |
| **Conclusion** | Summary and recommendations |
| **References** | Citations (APA/MLA/IEEE) |
| **Appendices** | Additional data/diagrams |

---

## Supported Citation Styles

\`\`\`
APA  (American Psychological Association)
     Author, A. A. (Year). Title. Publisher.

MLA  (Modern Language Association)
     Author, First. "Title." Publisher, Year.

IEEE (Institute of Electrical and Electronics Engineers)
     [1] A. Author, "Title," Journal, vol. X, pp. X-X, Year.
\`\`\`

---

## Print-Ready Features

\`\`\`css
/* Built-in print optimizations */
- A4 / Letter page size support
- 2.5cm standard margins
- Automatic page numbering
- Table of Contents with page refs
- Print-safe typography
- No decorative backgrounds in print
- Proper heading hierarchy (H1→H6)
- Figure and table captions
\`\`\`

---

## Use Cases — භාවිතා අවස්ථා

- 🏫 School / University project reports
- 💼 Professional project documentation
- 🔬 Research project final reports
- 🛠️ Engineering design reports
- 📊 Business case studies
- 🌐 IT / Software project reports

---

## Academic vs Project Report — වෙනස කුමක්ද?

| Feature | Academic Note Skill | Project Report Skill |
|---------|--------------------|--------------------|
| Purpose | Short academic note | Full project report |
| Length | 1–3 pages | 5–20+ pages |
| Structure | Abstract → Body | Cover → Appendices |
| Citations | Basic | APA / MLA / IEEE |
| Input | Document/content | Project details + data |
| Best for | Study notes, summaries | Final reports, submissions |

---

> **ඉඟිය:** Project report generate කිරීමෙදී **ඔබේ data/findings text ලෙස** AI ට provide කළ හොත් results section ඉතාම detailed ව generate වේ. Images/diagrams ද describe කර provide කළ හැකිය.

---

> **WhatsApp Channel** එකට join වී AI skill updates ලබා ගන්න 👇
> [Join කරන්න →](/link/whatsapp)
`;
