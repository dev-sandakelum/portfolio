export const meta = {
  id: "01",
  category: "github",
  title: "GitHub හි Git Basics — ආරම්භකයින් සඳහා",
  titleEn: "Git Basics on GitHub — For Beginners",
  description: "Git සහ GitHub භාවිතා කිරීමේ මූලික කරුණු ඉගෙන ගනිමු.",
  descriptionEn: "Learn the fundamentals of using Git and GitHub.",
  date: "2025-06-01",
  tags: ["git", "github", "version-control"],
  readingTime: 5,
};

export const content = `
## Git යනු කුමක්ද?

**Git** යනු distributed version control system එකකි. ඔබගේ code හි වෙනස්කම් track කිරීමට, team members සමග collaborate කිරීමට, සහ ඕනෑම කිසිවකට ආපසු යාමට Git ඉතාමත් ප්‍රයෝජනවත් වේ.

## GitHub යනු කුමක්ද?

**GitHub** යනු Git repositories host කිරීම සඳහා cloud-based platform එකකි. ලොව පුරා developers මිලියන ගණනක් GitHub භාවිතා කරති.

## මූලික Commands

### Repository නිර්මාණය කිරීම

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
\`\`\`

### Remote Repository සමග සම්බන්ධ වීම

\`\`\`bash
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
\`\`\`

## Branch සෑදීම

Branch නිර්මාණය කිරීම නව features develop කිරීමේ හොඳ ක්‍රමයකි:

\`\`\`bash
git checkout -b feature/new-feature
git push origin feature/new-feature
\`\`\`

## Pull Request

Branch එකේ වැඩ නිම වූ පසු, **Pull Request** (PR) එකක් ලෙස main branch ට merge කිරීම GitHub හි සාමාන්‍ය workflow ය.

> **ඉඟිය:** හොඳ commit messages ලිවීමෙන් team members ට ඔබගේ වෙනස්කම් වටහා ගැනීම පහසු වේ.

## සාරාංශය

- \`git init\` — නව repository සෑදීම
- \`git add\` — staging area ට files එකතු කිරීම  
- \`git commit\` — changes save කිරීම
- \`git push\` — remote ට upload කිරීම
- \`git pull\` — remote වෙනස්කම් download කිරීම
`;
