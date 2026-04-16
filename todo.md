# KalcYouLater – Implementation Tracker

## Overview

Single-page web application that converts recipe measurements and calculates total calories based on serving data.

---

## 🧩 Core Features

### 1. Input: Amount in Recipe

- [x] Create input field
- [x] Accept decimal values (e.g., 2.5)
- [x] Accept unit (e.g., cups, tbsp, etc.)
- [x] Validate input (required, numeric)

---

### 2. Input: Serving Size (Volume)

- [x] Create input field
- [x] Accept value + unit (must match recipe unit)
- [x] Add validation (required, unit consistency)

---

### 3. Input: Equivalent Measure

- [x] Create input field
- [x] Accept grams (numeric only)
- [x] Validate input (required, positive number)

---

### 4. Input: Calories per Serving

- [x] Create input field
- [x] Accept numeric value
- [x] Validate input (required, ≥ 0)

---

## ⚙️ Calculation Logic (Dynamic)

### Triggering Calculations

- [x] Calculations run automatically on input change
- [ ] Debounce input updates (optional, recommended)
- [ ] Prevent unnecessary re-renders

---

### Measure Conversion

- [x] Formula implemented:

```

metric_weight = (amount_used / serving_size) * metric_equivalent

```

- [ ] Handles decimals correctly
- [ ] Converts amount in recipe units to serving size units before calculating equivalent measure
  - e.g. Recipe gives 1 cups of chocolate chips, nutrition label says a serving size is 1 tbsp (14g) and 70 calories per serving
- [ ] Supports unit conversion across compatible volume units (e.g. cups, tbsp, tsp, oz, ml)
- [ ] Handles edge cases (division by zero, missing inputs)

---

### Calorie Calculation

- [x] Formula implemented:

```

total_calories = (amount_used / serving_size) * calories_per_serving

```

- [x] Rounds output appropriately
- [ ] Handles invalid inputs gracefully

---

## 📊 Output Display (Real-Time)

### General Behavior

- [x] Updates instantly as user types
- [x] Shows placeholder/default state before valid input
- [x] Avoids flickering or jumpy UI

---

### Converted Measure Result

- [x] Displays calculated grams
- [x] Updates dynamically
- [x] Styled to match mockup (prominent number)

---

### Total Calories Result

- [x] Displays total calories
- [x] Updates dynamically
- [x] Styled to match mockup

---

## 🎨 UI Implementation

### Layout

- [x] Centered card layout
- [x] Responsive (mobile + desktop)
- [x] Matches spacing from mockup

---

### Inputs

- [x] Rounded input fields
- [x] Placeholder text implemented
- [ ] Inline helper icon (optional)
- [x] Clear indication of active/focused field

---

### Removed: Submit Button

- [x] Remove "Calculate" button from UI
- [x] Ensure layout still feels balanced without it
- [x] Replace with subtle feedback (e.g., live updating results)

---

### Results Cards

- [x] Two-column layout
- [ ] Distinct styling for:
  - [ ] Metric Weight
  - [ ] Calories
- [x] Typography hierarchy implemented

---

## 🌙 Theme / UX Enhancements

- [x] Dark mode toggle
- [x] Smooth transitions (especially for updating numbers)
- [x] Input focus states
- [ ] Optional: animated number transitions

---

## 🧪 Validation & Error Handling

- [x] Prevent calculation if inputs missing
- [ ] Show inline validation states (instead of blocking submit)
- [ ] Handle invalid numbers (NaN, negative values)
- [ ] Unit mismatch warning (if implemented)

---

## 🔁 State Management

- [x] Inputs stored in state
- [x] Outputs derived from state (no manual trigger)
- [ ] Computed values memoized (if needed)
- [x] Clear/reset functionality (optional)

---

## 🧱 Technical Setup

### Frontend

- [x] Project initialized
- [x] Component structure created
- [x] Reactive form state handling implemented

---

### Logic Layer

- [x] Calculation functions isolated
- [ ] Pure functions (no side effects)
- [ ] Unit tests (optional but ideal)

---

### Styling

- [x] Global styles set
- [x] Component-level styling complete

---

## 🚀 Final Polish

- [ ] Accessibility (labels, ARIA)
- [ ] Keyboard navigation
- [ ] Performance check (no lag while typing)
- [ ] Cross-browser testing

---

## ✅ Acceptance Criteria Checklist

- [x] User can input recipe amount
- [x] User can input serving size and equivalent measure
- [ ] App converts recipe amount units into serving size units before calculating equivalent measure
- [x] User can input calories per serving
- [x] Results update automatically as inputs change
- [x] App calculates correct converted weight
- [x] App calculates correct total calories
- [x] Results display clearly and accurately
- [x] UI matches mockup design
- [x] App prevents invalid calculations without needing a submit button

---

## 💡 Future Enhancements (Optional)

- [ ] Unit conversion dropdown (cups → tbsp, etc.)
- [ ] Save favorite ingredients
- [ ] Multi-ingredient calculator
- [ ] Nutrition breakdown (fat, protein, carbs)
- [ ] Share/export results

---

## Notes

- Prioritize instant feedback and smooth UX
- Avoid overwhelming users with errors—guide instead
- Keep calculations fast and deterministic
