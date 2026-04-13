<template>
  <header>
    <h1>KalcYouLater</h1>
    <nav><a class="nav-link">Calculators</a></nav>
    <div class="header-buttons">
      <button id="theme-toggle" class="button">Toggle Theme</button>
    </div>
  </header>
  <main class="app-shell">
    <section class="calculator-container">
      <form id="input-form" class="input-form">
        <!-- Amount used in recipe -->
        <InputNumberUnit
          id="recipe-amount"
          name="recipe-amount"
          label="Amount in Recipe"
          v-model:value="recipe.value"
          v-model:unit="recipe.unit"
          placeholder="e.g. 1"
          required
          inputmode="decimal"
        />

        <div class="field-row">
          <!-- Nutrition label serving size -->
          <InputNumberUnit
            id="serving-size"
            name="serving-size"
            label="Serving Size"
            v-model:value="servingSize.value"
            v-model:unit="recipe.unit"
            placeholder="e.g. 1"
            required
            inputmode="decimal"
          />

          <!-- Equivalent metric weight -->
          <InputNumberUnit
            id="equivalent-metric-weight"
            name="equivalent-metric-weight"
            label="Equivalent Metric Weight"
            v-model:value="equivalentMetricWeight.value"
            v-model:unit="equivalentMetricWeight.unit"
            placeholder="e.g. 63"
            required
            inputmode="decimal"
          />
        </div>
        <!-- Calories per serving -->
        <InputNumberUnit
          id="calories-per-serving"
          name="calories-per-serving"
          label="Calories per Serving"
          v-model:value="caloriesPerServing.value"
          v-model:unit="caloriesPerServing.unit"
          placeholder="e.g. 220"
          required
          inputmode="decimal"
          min="0"
          select-disabled
        />
      </form>

      <!-- Results -->
      <div class="results-container">
        <div class="result calculated-weight">
          <div>
            <h2>Calculated Result</h2>
            <p>Metric Weight to Use</p>
          </div>
          <p class="result-value" v-if="calculatedWeight">
            {{ calculatedWeight.toFixed(1) }}
            <span class="result-unit">{{ equivalentMetricWeight.unit }}</span>
          </p>
          <p v-else>--</p>
        </div>
        <div class="result calculated-calories">
          <div>
            <h2>Energy Content</h2>
            <p>Calories in Recipe Amount</p>
          </div>
          <p class="result-value" v-if="calculatedCalories">
            {{ calculatedCalories }} <span class="result-unit">kcal</span>
          </p>
          <p v-else>--</p>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <p class="site-name">KalcYouLater</p>
    <p class="copyright">
      &copy; {{ new Date().getFullYear() }} Delight Media Co.
    </p>
  </footer>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import InputNumberUnit from "./components/InputNumberUnit.vue";

const recipe = ref({ value: undefined, unit: "cups" });
const servingSize = ref({ value: undefined });
const equivalentMetricWeight = ref({ value: undefined, unit: "g" });
const caloriesPerServing = ref({ value: undefined, unit: "kcal" });

const calculatedWeight = computed(() => {
  if (
    !recipe.value.value ||
    !servingSize.value.value ||
    !equivalentMetricWeight.value.value
  ) {
    return undefined;
  }

  return (
    recipe.value.value *
    (equivalentMetricWeight.value.value / servingSize.value.value)
  );
});

const calculatedCalories = computed(() => {
  if (
    !caloriesPerServing.value.value ||
    !servingSize.value.value ||
    !recipe.value.value
  ) {
    return undefined;
  }

  return (
    (caloriesPerServing.value.value / servingSize.value.value) *
    recipe.value.value
  );
});
</script>
<style lang="css" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-background);
  color: var(--color-primary-dark);
}

.calculator-container {
  background: white;
  margin: 2rem auto;
  padding: 2rem;
  max-width: 40rem;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-row {
  display: flex;
  gap: 1rem;
}

.field-row .input-number-unit {
  width: 50%;
}

.results-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  justify-content: space-between;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: var(--radius-field);
}

.result h2 {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-secondary);
  text-transform: uppercase;
  font-size: 0.75rem;
}

.result-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.result-unit {
  font-size: 1.5rem;
  color: var(--color-primary);
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--color-primary-dark);
  color: var(--color-on-primary);
  position: fixed;
  bottom: 0;
  width: 100%;
}

.site-name {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: italic;
}
</style>
