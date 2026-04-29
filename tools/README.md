# Tools

CLI tools included with the Hunt skill for deterministic hackathon scraping.

## hunt-scout.js

Zero-dependency Node.js script that scrapes online hackathon listings from MLH and Devfolio.

### Usage

```bash
# List all upcoming online/free hackathons
node tools/hunt-scout.js

# Output as JSON (for programmatic use)
node tools/hunt-scout.js --json

# Scrape only MLH
node tools/hunt-scout.js --source mlh

# Scrape only Devfolio
node tools/hunt-scout.js --source devfolio
```

### Requirements

- Node.js 18+ (built-in `fetch`)

### How the Agent Uses This

When `web_fetch` fails on JavaScript-heavy sites, the agent can fall back to this CLI for deterministic scraping.
