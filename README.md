# Hunt 🎯

**Digital bounty hunter for AI agents — find, track, and conquer online hackathons.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-grade [Agent Skill](https://agentskills.io) that turns your AI agent into a personal hackathon scout. Works with OpenClaw, Claude Code, Cursor, Windsurf, and any agent that supports the Agent Skills specification.

## What It Does

| Capability | Description |
|------------|-------------|
| 🕵️ **Scout** | Browses MLH, Devfolio, Devpost for upcoming online hackathons |
| ✅ **Vet** | Filters for free, online, no-web3, skill-appropriate events |
| 📋 **Present** | Clean numbered list with dates, themes, and briefing notes |
| 🗺 **Track** | Saves selections to `map.md` on command |
| ⏰ **Remind** | Cron reminder fires 1 day before each event |

## Quick Start

```bash
# Add to your agent's skills directory
cp -r skills/hunt/ ~/.openclaw/workspace/skills/

# Say to your agent: "hunt"
# → Scouts web for hackathons matching your profile
# → Presents numbered list

# Say: "add 1,3,5 to map"
# → Tracks them, sets reminders

# Say: "show map"
# → Shows your bounty board
```

## Repository Structure

```
hunt-skill/
├── .claude-plugin/
│   └── marketplace.json       # Claude Code marketplace manifest
├── skills/
│   └── hunt/
│       ├── SKILL.md            # Core agent instructions
│       ├── README.md           # Skill-level docs
│       └── references/
│           └── map-format.md   # map.md format reference
├── tools/
│   ├── hunt-scout.js           # Zero-dep CLI for scraping hackathons
│   └── README.md               # Tools documentation
├── AGENTS.md                   # AI agent orientation
├── CONTRIBUTING.md             # How to contribute
├── LICENSE                     # MIT license
└── README.md                   # This file
```

## How the Skill Works

```
You: "hunt"
  │
  ▼
Agent checks USER.md for your skills & timezone
  │
  ▼
Agent queries MLH → Devfolio → Devpost → lablab.ai
  │
  ▼
Agent vets: online? free? no web3? matches your level?
  │
  ▼
Presents numbered list with verified details
  │
  ▼
You: "add 1,3,5 to map"
  │
  ▼
Writes to map.md + sets cron reminders + confirms
```

## Selection Criteria

| Requirement | Rule |
|-------------|------|
| Online | 100% digital — no travel |
| Free | $0 to register & participate |
| Open | Registration still accepting |
| No web3 | No blockchain/crypto/NFT unless you ask |
| Your level | Matches skills from your profile |

## Requirements

- AI agent with web fetching capability
- File read/write access to workspace
- Cron/scheduling for reminders (optional but recommended)

## Philosophy

> Work anywhere. No boss. Total freedom.
>
> Every hackathon is a bounty. Every project ships your portfolio forward.
> The map is your treasure tracker. Hunt well.

## License

MIT — use it, fork it, ship it.
