# ADR 0001: Phased Test Adoption

## Status

Accepted

## Context

Milestone 1 established the Next.js foundation, design system baseline, and CI checks for linting, type safety, and production builds. The next step is to add automated verification without introducing unnecessary tooling or maintenance overhead too early.

## Decision

Adopt testing in two phases:

1. **Phase 1: unit and component testing with Vitest and React Testing Library**
   - Use for fast feedback on core UI primitives and layout behaviour.
   - Start with shared components such as `Button`, `Card`, and layout sanity coverage.
   - Integrate the test run into CI and block merges on failures once the scaffold is in place.

2. **Phase 2: end-to-end testing with Playwright**
   - Add once the core routes and content structure have stabilised.
   - Start with smoke coverage for homepage rendering, navigation, and key CTA flows.

## Rationale

- Vitest offers a fast, low-overhead unit testing setup that fits the current frontend stack.
- React Testing Library keeps early tests focused on user-visible behaviour rather than implementation details.
- Playwright is better introduced after the UI settles so E2E coverage stays targeted and maintainable.

## Out of Scope

- Heavy integration testing before the component layer is covered
- Broad snapshot-driven testing
- Introducing Cypress alongside Playwright
