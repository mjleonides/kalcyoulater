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
          label="Amount in Recipe"
          v-model:value="recipe.value"
          v-model:unit="recipe.unit"
          placeholder="e.g. 1"
          required
          inputmode="decimal"
        />

        <!-- Nutrition label serving size -->
        <InputNumberUnit
          id="serving-size"
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
          label="Equivalent Metric Weight"
          v-model:value="equivalentMetricWeight.value"
          v-model:unit="equivalentMetricWeight.unit"
          placeholder="e.g. 63"
          required
          inputmode="decimal"
        />

        <!-- Calories per serving -->
        <InputNumberUnit
          id="calories-per-serving"
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
          <p>Metric Weight to Use</p>
          <p v-if="calculatedWeight">{{ calculatedWeight.toFixed(2) }} g</p>
          <p v-else>--</p>
        </div>
        <div class="result calculated-calories">
          <p>Calories in Recipe Amount</p>
          <p v-if="calculatedCalories">{{ calculatedCalories }} kcal</p>
          <p v-else>--</p>
        </div>
      </div>
    </section>
  </main>
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
