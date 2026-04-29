# Contributing

Contributions welcome! Here's how to help improve Hunt.

## How to Contribute

1. **Fork** the repo
2. **Create a branch** (`git checkout -b feature/your-idea`)
3. **Make changes** — skill improvements, new CLI tools, better docs
4. **Test** — run `node --check tools/*.js` for CLI scripts
5. **Commit** (`git commit -m "Add: your change"`)
6. **Push** and open a **Pull Request**

## Skill Guidelines

When modifying `SKILL.md`:

- Keep YAML frontmatter valid
- `name` must match the directory name
- `description` must include all relevant trigger phrases
- Add Telegram formatting rules if adding new output patterns
- Test by running a "hunt" command after changes

## CLI Tool Guidelines

- Zero external dependencies (built-in Node.js APIs only)
- Node 18+ compatible (use native `fetch`)
- Support `--help` flag
- Support `--json` flag for machine-readable output
- Handle errors gracefully with meaningful messages

## Code of Conduct

Be excellent to each other. Keep it constructive.
