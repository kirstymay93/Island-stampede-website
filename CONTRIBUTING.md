# Contributing

## Development standards

- Follow the content and brand rules in `docs/brand/website-brief.md`.
- Keep TypeScript strict and avoid `any` unless absolutely necessary.
- Reuse existing components before creating new ones.
- Keep functions focused and accessible by default.

## Workflow

1. Install dependencies with `npm install`.
2. Run `npm run lint` and `npm run type-check` before opening a pull request.
3. Use conventional commit messages.
4. Preserve future Manus imports inside `migration/original` before editing copies.
