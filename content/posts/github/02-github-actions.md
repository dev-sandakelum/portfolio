---
id: "02"
category: "github"
title: "GitHub Actions — CI/CD සිංහලෙන්"
titleEn: "GitHub Actions — CI/CD in Sinhala"
description: "GitHub Actions භාවිතයෙන් automated workflows නිර්මාණය කරන්නේ කෙසේද?"
descriptionEn: "How to create automated workflows using GitHub Actions."
date: "2025-06-15"
tags: ["github-actions", "ci-cd", "automation"]
readingTime: 7
coverImage: ""
---

## GitHub Actions යනු කුමක්ද?

**GitHub Actions** යනු GitHub හි built-in CI/CD platform එකකි. ඔබේ repository තුළ සිදුවන events වලට ප්‍රතිචාර ලෙස automated workflows create කිරීමට එය ඉඩ දෙයි.

## Workflow යනු කුමක්ද?

Workflow යනු ඔබේ repository තුළ `.github/workflows/` directory එකේ තබන YAML file එකකි.

## මූලික Workflow එකක්

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
```

> **ඉඟිය:** Workflow files YAML format වලින් ලිවිය යුතුය. Indentation නිවැරදිව තබා ගැනීම වැදගත් වේ.

## Events

Workflow එකක් trigger කරන පොදු events:

- `push` — code push කළ විට
- `pull_request` — PR open කළ විට
- `schedule` — cron schedule එකක් අනුව
- `workflow_dispatch` — manually trigger කිරීමට

## සාරාංශය

- GitHub Actions CI/CD සඳහා built-in solution එකක්
- YAML files `.github/workflows/` තුළ තබන්න
- Events, jobs, steps යනු main concepts තුනයි