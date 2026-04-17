## Doviqo landing page — implementation plan

### Component structure (responsibilities)
- **`src/app/page.tsx`**: composition only (no layout logic beyond section order)
- **`src/components/landing/*`**: one component per section
  - `navbar.tsx`: minimal nav + anchor links + primary CTA
  - `hero.tsx`: left messaging + right product preview, uses 3D background
  - `trust-strip.tsx`: compact positioning line + keywords
  - `problem.tsx`: single high-conviction problem statement
  - `how-it-works.tsx`: 3 steps (staggered reveal)
  - `product-preview.tsx`: interactive showcase (meeting picker + UI cards)
  - `why-doviqo.tsx`: bullet grid (staggered reveal)
  - `final-cta.tsx`: waitlist form + polished success state
  - `footer.tsx`: single line tagline

### Section breakdown (final order)
Navbar → Hero (3D) → Trust strip → Problem → How it works (3 steps) → Product preview → Why Doviqo → Final CTA → Footer

### 3D background approach (premium + restrained)
- **`hero-background-3d.tsx`**: isolated client component
- **Visual language**: low-brightness glass ribbons + soft glows + vignette
- **Readability**: keep dark overlay in hero; keep scene subtle (no sparkles)
- **Performance**:
  - adaptive DPR
  - simplified “small screen” scene
  - reduced-motion fallback = static gradient background

### Animation strategy (alive but controlled)
- **`Reveal`**: subtle in-view reveal for headings/blocks (once per view)
- **`Stagger` / `StaggerItem`**: used for grids and lists only (steps, bullets)
- **Hero preview floats**: slow, limited motion; disabled by reduced-motion
- Respect `prefers-reduced-motion` everywhere.

### Responsive strategy
- Mobile/tablet:
  - hero preview panels and product showcase **stack** (no overlaps)
  - maintain CTA prominence; avoid cropped text
- Desktop:
  - hero preview and product preview can layer with perspective/depth
- Use consistent vertical rhythm across sections (`py-*` scale).

### Design system decisions
- **Typography**: single `h1` in hero; `h2` via `SectionHeading`
- **Surfaces**: one `Card` primitive with layered borders/shadows + subtle sheen
- **Buttons**: `primary` / `secondary` / `ghost` variants; consistent focus ring
- **Texture**: restrained noise + glow layers; no bright gradients.

### File structure (current)
```
src/
  app/
    layout.tsx
    page.tsx
  components/
    landing/
      hero/
      product-preview/
      ui/
      waitlist/
      *.tsx (section components)
    motion/
      reveal.tsx
      stagger.tsx
    ui/
      button.tsx
      card.tsx
      container.tsx
      section-heading.tsx
  lib/
    cn.ts
docs/
  landing-implementation-plan.md
```

