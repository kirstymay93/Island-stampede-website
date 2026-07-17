# Island Stampede — Product Requirements

## Original Problem Statement
Premium, conversion-focused landing page for ISLAND STAMPEDE — Tasmania's Premier Indoor Professional Bull Riding Event. Launceston Silverdome, 2–3 October 2026. Tagline: LET'S RIDE TASMANIA. Premium sports brand (UFC / F1 / Red Bull / PBR inspired), electric-blue/black/white/silver palette, NOT western/rustic. Sections: Hero + CTAs, live countdown, About, Why Attend, Event Info, Gallery carousel, Sponsors, Testimonials, FAQ, Final CTA. Responsive, fast, SEO, accessible, animated.

## Architecture
- Frontend: Expo Router (single scrollable screen `app/index.tsx`), reanimated, expo-image, expo-linear-gradient, expo-blur, expo-haptics. Fonts: Bebas Neue (display) + Manrope (body) via expo-font.
- Backend: FastAPI + MongoDB (motor). Lead capture endpoints under `/api`.
- Imagery: 5 cinematic bull-riding images generated via Gemini Nano Banana (`gemini-3.1-flash-image-preview`) stored as PNGs in `frontend/assets/images/`.

## User Personas
Families, sports fans, adventure seekers, corporate sponsors, Tasmania tourists.

## Core Requirements (static)
Conversion-focused single-page landing; ticket + sponsor lead capture; live countdown to 2 Oct 2026; premium dark sports aesthetic.

## Implemented (2026-07-17)
- Hero with cinematic bg, scrim, headline, dates/venue chips, BUY TICKETS + BECOME A SPONSOR CTAs
- Live animated countdown (days/hrs/min/sec)
- About + stats, Why Attend 2-col grid, Event Info list, Gallery paged carousel with dots
- Sponsors grid + sponsorship CTA, Testimonials horizontal scroll, FAQ accordion
- Final urgency CTA, sticky top header + sticky bottom BUY TICKETS/SPONSOR bar
- Lead-capture bottom sheet (ticket/sponsor) → POST /api/leads (MongoDB), success state
- Backend: POST/GET /api/leads, GET /api/stats. Tested 10/10 backend + all frontend flows pass.

## Backlog / Remaining
- P1: Wire real ticketing checkout URL when available; sponsor deck download.
- P2: Admin view for captured leads; email confirmation (Resend); analytics.
- P2: Tighten LeadSheet vertical spacing; return 201 on create.
