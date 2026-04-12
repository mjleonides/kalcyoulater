# Design System Document: KalcYouLater

## 1. Overview & Creative North Star

**Creative North Star: "The Modern Gastronome"**

This design system rejects the clinical, "app-like" feel of traditional utility software in favor of a high-end, editorial experience. It is inspired by the tactile nature of a chef’s marble countertop and the organized clarity of a boutique cookbook.

To break the "standard template" look, we employ **Asymmetric Breathing Room**. Instead of centering everything, we use generous, intentional white space to guide the eye. Elements should feel like they are "plated" on the screen—elegant, balanced, and unhurried. We prioritize tonal depth over structural lines, creating a UI that feels organic and inviting rather than rigid and mechanical.

---

## 2. Colors: The Fresh Palette

Our color strategy mimics a fresh kitchen garden. The greens provide a calm, "sage" foundation, while the oranges provide a "warm zest" for action.

### Color Tokens

- **Primary (Sage):** `#4e635a` | **On-Primary:** `#ffffff`
- **Secondary (Warm Orange):** `#944a00` | **Secondary Container:** `#fc8f34`
- **Background (Soft Parchment):** `#fbf9f7`
- **Surface Tiers:**
  - `surface_container_lowest`: `#ffffff` (Pure light)
  - `surface_container_low`: `#f5f3f1` (Subtle depth)
  - `surface_container_highest`: `#e4e2e0` (Strongest foundation)

### The "No-Line" Rule

**Explicit Instruction:** Do not use 1px solid borders to define sections. Period. Boundaries are created through background shifts. A recipe card (`surface_container_lowest`) should sit atop a section background (`surface_container_low`). If the user cannot distinguish sections through color alone, increase the contrast between the surface tiers rather than adding a line.

### The "Glass & Gradient" Rule

To add soul to the digital experience, use **Tonal Gradients** for high-impact areas.

- **Hero Sections:** Use a linear gradient from `primary` to `primary_container` at a 15-degree angle.
- **Glassmorphism:** For floating navigation or "active step" overlays, use `surface` at 70% opacity with a `24px` backdrop-blur. This keeps the cooking process visible underneath the utility.

---

## 3. Typography: Legibility for Action

In a kitchen, the user is often multi-tasking with messy hands. Typography must be "High-Glanceable."

- **Display (Plus Jakarta Sans):** Large, expressive, and sophisticated. Used for recipe titles and caloric totals. The wide apertures of Plus Jakarta Sans ensure readability even from three feet away on a kitchen counter.
- **Body (Work Sans):** Chosen for its tall x-height and clean terminals. This is the "workhorse" for ingredients and instructions.
- **Editorial Contrast:** Pair a `display-lg` title with a `label-md` meta-tag (e.g., "15 MINS") to create a professional, magazine-style hierarchy.

---

## 4. Elevation & Depth: Tonal Layering

We move away from the "shadow-everything" approach of the early 2010s.

- **The Layering Principle:** Treat the screen as a stack of fine paper.
  - Level 0 (Base): `surface`
  - Level 1 (Sections): `surface_container_low`
  - Level 2 (Interactive Cards): `surface_container_lowest`
- **Ambient Shadows:** Use shadows only for floating elements (e.g., a "Start Timer" button).
  - **Spec:** `0px 12px 32px rgba(27, 28, 27, 0.06)`. This is a tinted shadow using the `on_surface` color at a very low opacity, mimicking soft overhead kitchen lighting.
- **The "Ghost Border" Fallback:** If a container absolutely disappears into the background (e.g., in accessibility high-contrast modes), use `outline_variant` at **15% opacity**. Never use a fully opaque border.

---

## 5. Components: Functional Elegance

### Buttons

- **Primary:** High-radius (`full`), using the `primary` color. In hover states, transition to `primary_container`.
- **Secondary:** No background. Use `secondary` text with a `secondary_fixed` background only on active interaction.

### Cards (The "Ingredient" Card)

- **Style:** No borders. `lg` (1rem) rounded corners.
- **Layout:** Use asymmetrical padding (e.g., 24px on top/bottom, 20px on sides) to create a custom, non-bootstrapped appearance.

### Input Fields (The "Search & Scale" Component)

- **Style:** Filled style using `surface_container_high`. No bottom line.
- **Focus State:** The background shifts to `surface_container_lowest` with a subtle `primary` glow (ambient shadow).

### Chips (Dietary & Prep Filters)

- **Style:** Use `surface_container_highest` for unselected and `secondary_container` for selected.
- **Shape:** `md` (0.75rem) roundedness—distinctly different from the `full` roundness of buttons.

### Interactive Ingredient Lists

- **Rule:** Forbid divider lines. Use `spacing-lg` (1.5rem) between items.
- **Interactions:** When an item is checked, fade the opacity to 40% and shift the background to `surface_dim` rather than just striking through text.

---

## 6. Do’s and Don’ts

### Do

- **Do** use `display-sm` for section headers to create an editorial feel.
- **Do** lean into the "Sage" (`primary`) for utility and "Orange" (`secondary`) for emotional highlights (e.g., "Chef's Tip").
- **Do** ensure all tap targets are at least 48dp, accounting for "cooking hands" precision.

### Don't

- **Don't** use black (`#000000`). Use `on_surface` (`#1b1c1b`) to keep the palette soft and appetizing.
- **Don't** use standard 4px or 8px shadows. If it doesn't look like an ambient glow, it's too heavy.
- **Don't** crowd the screen. If a recipe has 20 steps, use "The Breathable Layout"—show only one or two steps at a time with massive `surface` padding.
