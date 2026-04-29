# AGENTS.md

Guidelines for AI agents working in this repository.

## Repository Overview

This repository contains an **Agent Skill** for AI agents following the [Agent Skills specification](https://agentskills.io/specification.md). The skill installs to `.agents/skills/` (the cross-agent standard). This repo also serves as a **Claude Code plugin** via `.claude-plugin/marketplace.json`.

- **Name**: Hunt Skill
- **GitHub**: [lloyd-c137/hunt-skill](https://github.com/lloyd-c137/hunt-skill)
- **License**: MIT

## Repository Structure

```
hunt-skill/
├── .claude-plugin/
│   └── marketplace.json   # Claude Code plugin marketplace manifest
├── skills/
│   └── hunt/
│       ├── SKILL.md        # Core skill — agent instructions
│       ├── README.md       # Skill documentation
│       └── references/
│           └── map-format.md  # map.md format reference
├── tools/
│   ├── hunt-scout.js       # CLI tool: scrape and format hackathon listings
│   └── README.md           # Tools documentation
├── AGENTS.md               # This file
├── CONTRIBUTING.md         # Contribution guide
├── LICENSE                 # MIT license
└── README.md               # Repository-level README
```

## Key Files

- **`skills/hunt/SKILL.md`** — The core skill. Read this first to understand the workflow.
- **`tools/hunt-scout.js`** — Zero-dependency CLI for scraping hackathons from MLH and Devfolio. The agent can call this directly instead of web_fetch for deterministic results.

## Build / Lint / Test

Skills are content-only (no build step). Verify:
- YAML frontmatter is valid
- `name` field matches directory name
- `description` covers all trigger phrases

CLI tools are zero-dependency Node.js scripts (Node 18+):
```bash
node --check tools/hunt-scout.js   # Syntax check
node tools/hunt-scout.js           # Show usage
```
