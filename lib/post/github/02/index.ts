export const meta = {
  id: "02",
  category: "github",
  title: "GitHub Actions — CI/CD Pipelines ස්වයංක්‍රීය කිරීම",
  titleEn: "GitHub Actions — Automate CI/CD Pipelines",
  description: "GitHub Actions භාවිතා කර build, test, deploy ක්‍රියාවලිය ස්වයංක්‍රීය කරන ආකාරය.",
  descriptionEn: "Learn how to automate build, test, and deploy workflows using GitHub Actions.",
  date: "2025-06-10",
  tags: ["github", "ci-cd", "devops", "automation"],
  readingTime: 7,
};

export const content = `
## GitHub Actions යනු කුමක්ද?

**GitHub Actions** යනු GitHub repository තුළ software development workflows ස්වයංක්‍රීය කිරීමේ platform එකකි. Code push කළ වහාම test run කිරීම, deploy කිරීම, notifications යැවීම — මේ සියල්ල GitHub Actions මගින් කළ හැකිය.

## Workflow Structure

Workflow ගොනු \`.github/workflows/\` directory ය ඇතුළත YAML format හි ගබඩා කෙරේ.

\`\`\`yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
\`\`\`

## ප්‍රධාන Concepts

### Triggers (on)

Workflow ක්‍රියාත්මක කරන events:
- \`push\` — code push කළ විට
- \`pull_request\` — PR සෑදූ විට
- \`schedule\` — නිශ්චිත කාල සීමාවකට
- \`workflow_dispatch\` — manually trigger කිරීමට

### Jobs සහ Steps

- **Job** — parallel හෝ sequential ව ධාවනය වන task unit එකක්
- **Step** — job ඇතුළත ඇති තනි task එකක්

### Secrets භාවිතය

API keys, passwords repository settings ඇතුළත **Secrets** ලෙස ගබඩා කරන්න:

\`\`\`yaml
- name: Deploy
  env:
    API_KEY: \${{ secrets.API_KEY }}
  run: ./deploy.sh
\`\`\`

## Deploy Workflow උදාහරණය

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
\`\`\`

> **ඉඟිය:** GitHub Marketplace හි thousands of pre-built actions ඇත. ඒවා \`uses:\` keyword සමග භාවිතා කළ හැකිය.
`;
