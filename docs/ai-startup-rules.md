# AI Startup Operational Rules

This document codifies the operational guidelines and development practices for our AI startup. These rules ensure that our codebase remains robust, highly documentable, secure, and ready for rapid scale.

---

## 1. Pre-Push Documentation Sync (Foundational Mandate)
* **Rule:** Before pushing any modifications, features, or configurations to GitHub, **all relevant Markdown (`.md`) files must be fully updated** to reflect these changes.
* **Why:** In a fast-paced AI startup, code moves quickly. Outdated documentation slows down onboarding, confuses team members, and disrupts AI agent context loops. Maintaining accurate, real-time documentation is as important as writing correct code.
* **Actionable Steps:**
  1. Review your changed files (`git status` / `git diff`).
  2. Identify if any directories, APIs, images, or configuration rules were altered.
  3. Locate corresponding documentation files (e.g., in `docs/`, `README.md`, or specific instruction files) and update them.
  4. Commit both the code changes and the updated documentation together.

---
