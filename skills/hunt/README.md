# Hunt Skill 🎯

**Digital bounty hunter skill for OpenClaw** — find, track, and manage online hackathons to live the digital nomad lifestyle.

## What It Does

Hunt turns your AI agent into a personal hackathon scout. When you say **"hunt"**, it:

1. **Scouts** the web for upcoming online hackathons (MLH, Devfolio, Devpost, lablab.ai)
2. **Vets** each one — must be 100% online, free, and no web3 required (unless you ask)
3. **Presents** a clean numbered list with dates, themes, and briefing notes
4. **Tracks** selections in `map.md` when you say "add 1,3,5 to map"
5. **Reminds** you automatically 1 day before each event starts

## Installation

Install via ClawHub or place in your skills directory:

```bash
# From ClawHub
clawhub install hunt

# Or manually
cp hunt.skill ~/.openclaw/workspace/skills/
```

## Usage

```
You: hunt
🤖 → Presents numbered list of vetted hackathons

You: add 1,3,5 to map
🤖 → Adds to map.md, sets cron reminders

You: show map
🤖 → Displays your current hackathon tracker

You: remove 2 from map
🤖 → Removes entry and cancels reminder
```

## Map File

Your hackathons are tracked in [`map.md`](../map.md) — a living document you can check anytime:

```markdown
### 1. Global Hack Week: GenAI
- **Host:** MLH
- **Dates:** May 8–14, 2026
- **Theme:** Generative AI
- **Link:** https://...
- **Reminder:** ✅ Set
- **Status:** Upcoming
```

## Skill Files

```
hunt/
├── SKILL.md                    # Core instructions for the AI agent
├── references/
│   └── map-format.md           # Map.md format reference
└── hunt.skill                  # Packaged distributable skill
```

## Requirements

- OpenClaw with web_fetch tool enabled
- Cron capability for reminders
- Markdown file read/write access

## Philosophy

> Work anywhere. No boss. Total freedom.
>
> Every hackathon is a bounty. Every project ships your portfolio forward.
> The map is your treasure tracker. Hunt well.
