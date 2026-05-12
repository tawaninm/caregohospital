# VoiceMed Design System

`DESIGN.md` is the source of truth for VoiceMed UI.

## Visual Direction

VoiceMed should feel like a Liquid Glass + AI startup healthcare product:

- Calm, warm, modern, trustworthy.
- Friendly enough for families.
- Clear enough for non-technical caregivers.
- Inspired by AivaChat mood and layout rhythm only.
- Do not copy AivaChat colors, logo, assets, text, or exact composition.

## Tokens

```css
--vm-bg: #f7fbff;
--vm-surface: rgba(255, 255, 255, 0.72);
--vm-glass-border: rgba(120, 145, 255, 0.22);
--vm-primary: #2563eb;
--vm-violet: #7c3aed;
--vm-pink: #ec5cff;
--vm-teal: #00897b;
--vm-navy: #102033;
--vm-muted: #64748b;
```

Typography:

- Primary: Manrope.
- Thai fallback: Noto Sans Thai, system Thai sans-serif.
- Use generous Thai line-height.

## Components

- Liquid glass cards with low-contrast border and soft blur.
- Gradient headline text for marketing surfaces.
- AI orb visuals built with CSS gradients.
- Phone mockups should be CSS/component based unless original assets are supplied.
- Buttons:
  - Primary: blue/violet/pink gradient.
  - Secondary: white glass with primary text.
- Alert chips:
  - Info: sky.
  - Watch: amber.
  - Urgent: rose.

## Product UI Rules

- Public pages should sell the subscription and explain the flow.
- Platform pages should help families manage care, bots, logs, and alerts.
- Avoid dense hospital command-center styling.
- Do not use diagnosis or treatment wording as product claims.
