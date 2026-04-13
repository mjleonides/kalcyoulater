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

### 3. Input: Equivalent Metric Weight

- [x] Create input field
- [x] Accept grams (numeric only)
- [x] Validate input (required, positive number)

---

### 4. Input: Calories per Serving

- [x] Create input field
- [x] Accept numeric value
- [x] Validate input (required, ≥ 0)

---

## ⚙️ Calculation Logic

### Metric Conversion

- [x] Formula implemented:

```

metric_weight = (amount_used / serving_size) * metric_equivalent

```

- [ ] Handles decimals correctly
- [ ] Handles edge cases (division by zero, missing inputs)

---

### Calorie Calculation

- [x] Formula implemented:

```

total_calories = (amount_used / serving_size) * calories_per_serving

```

- [ ] Rounds output appropriately
- [ ] Handles invalid inputs gracefully

---

## 🧮 Calculate Button

- [ ] Button triggers calculations
- [ ] Disabled until all required inputs are valid
- [ ] Loading/feedback state (optional but preferred)

---

## 📊 Output Display

### Metric Weight Result

- [ ] Displays calculated grams
- [ ] Updates dynamically on calculation
- [ ] Styled to match mockup (prominent number)

---

### Total Calories Result

- [ ] Displays total calories
- [ ] Updates dynamically
- [ ] Styled to match mockup

---

## 🎨 UI Implementation

### Layout

- [ ] Centered card layout
- [ ] Responsive (mobile + desktop)
- [ ] Matches spacing from mockup

---

### Inputs

- [ ] Rounded input fields
- [ ] Placeholder text implemented
- [ ] Inline helper icon (optional)

---

### Button

- [ ] Styled primary CTA
- [ ] Hover + active states
- [ ] Disabled state styling

---

### Results Cards

- [ ] Two-column layout
- [ ] Distinct styling for:
  - [ ] Metric Weight
  - [ ] Calories
- [ ] Typography hierarchy implemented

---

## 🌙 Theme / UX Enhancements

- [ ] Dark mode toggle
- [ ] Smooth transitions (optional)
- [ ] Input focus states

---

## 🧪 Validation & Error Handling

- [ ] Prevent calculation if inputs missing
- [ ] Show helpful error messages
- [ ] Handle invalid numbers (NaN, negative values)
- [ ] Unit mismatch warning (if implemented)

---

## 🔁 State Management

- [ ] Inputs stored in state
- [ ] Outputs derived from state
- [ ] Clear/reset functionality (optional)

---

## 🧱 Technical Setup

### Frontend

- [ ] Project initialized
- [ ] Component structure created
- [ ] Form state handling implemented

---

### Logic Layer

- [ ] Calculation functions isolated
- [ ] Unit tests (optional but ideal)

---

### Styling

- [ ] Global styles set
- [ ] Component-level styling complete

---

## 🚀 Final Polish

- [ ] Accessibility (labels, ARIA)
- [ ] Keyboard navigation
- [ ] Performance check
- [ ] Cross-browser testing

---

## ✅ Acceptance Criteria Checklist

- [ ] User can input recipe amount
- [ ] User can input serving size and metric equivalent
- [ ] User can input calories per serving
- [ ] App calculates correct metric weight
- [ ] App calculates correct total calories
- [ ] Results display clearly and accurately
- [ ] UI matches mockup design
- [ ] App prevents invalid calculations

---

## 💡 Future Enhancements (Optional)

- [ ] Unit conversion dropdown (cups → tbsp, etc.)
- [ ] Save favorite ingredients
- [ ] Multi-ingredient calculator
- [ ] Nutrition breakdown (fat, protein, carbs)
- [ ] Share/export results

---

## Notes

- Keep logic simple and predictable
- Prioritize accuracy over feature complexity
- UI should feel fast and frictionless

```

```
