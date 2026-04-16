<template>
  <header>
    <img class="logo" src="@/assets/icons/icons-01.png" width="40px" />
    <nav></nav>
    <div class="header-buttons">
      <ButtonComponent
        id="theme-toggle"
        :label="themeToggleLabel"
        :icon="themeToggleIcon"
        :aria-label="themeToggleLabel"
        :aria-pressed="theme === 'dark'"
        icon-only
        text
        @click="toggleTheme"
      />
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
          :options="unitOptions"
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
            :options="unitOptions"
            placeholder="e.g. 1"
            required
            inputmode="decimal"
          />

          <!-- Equivalent weight -->
          <InputNumberUnit
            id="equivalent-weight"
            name="equivalent-weight"
            label="Equivalent Weight Conversion"
            v-model:value="equivalentWeight.value"
            v-model:unit="equivalentWeight.unit"
            :options="unitOptions"
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
          :options="[{ value: 'kcal', label: 'kcal' }]"
          placeholder="e.g. 220"
          required
          inputmode="decimal"
          min="0"
          select-disabled
        />
      </form>

      <div class="buttons">
        <ButtonComponent
          id="input-form-reset"
          label="Reset"
          icon="fa-solid fa-arrow-rotate-left"
          @click="onReset"
        />
      </div>

      <!-- Results -->
      <div class="results-container">
        <div class="result calculated-weight">
          <div>
            <h2>Calculated Result</h2>
            <p>Converted Weight to Use</p>
          </div>
          <p class="result-value" v-if="calculatedWeight">
            {{ calculatedWeight.toFixed(1) }}
            <span class="result-unit">{{ equivalentWeight.unit }}</span>
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
    <p class="attribution">
      Crafted by <a href="https://leonides.dev">leonides.dev</a>
    </p>
    <p class="copyright">
      &copy; {{ new Date().getFullYear() }}
      <a href="https://delightmedia.co"> Delight Media Co. </a>
    </p>
  </footer>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import InputNumberUnit from "./components/InputNumberUnit.vue";
import ButtonComponent from "./components/ButtonComponent.vue";
import { useThemeStore } from "./stores/theme";

const defaultValues = {
  recipe: { value: undefined, unit: "cups" },
  servingSize: { value: undefined },
  equivalentWeight: { value: undefined, unit: "g" },
  caloriesPerServing: { value: undefined, unit: "kcal" },
};

const recipe = ref(defaultValues.recipe);
const servingSize = ref(defaultValues.servingSize);
const equivalentWeight = ref(defaultValues.equivalentWeight);
const caloriesPerServing = ref(defaultValues.caloriesPerServing);
const themeStore = useThemeStore();
const { theme, themeToggleIcon, themeToggleLabel } = storeToRefs(themeStore);
const { cleanupTheme, initializeTheme, toggleTheme } = themeStore;

onMounted(() => {
  initializeTheme();
});

onBeforeUnmount(() => {
  cleanupTheme();
});

const unitOptions = [
  { value: "cups", label: "cups" },
  { value: "oz", label: "ounces" },
  { value: "tbsp", label: "tbsps" },
  { value: "tsp", label: "tsp" },
  { value: "g", label: "grams" },
  { value: "ml", label: "ml" },
];

const calculatedWeight = computed(() => {
  if (
    !recipe.value.value ||
    !servingSize.value.value ||
    !equivalentWeight.value.value
  ) {
    return undefined;
  }

  return (
    recipe.value.value *
    (equivalentWeight.value.value / servingSize.value.value)
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

const onReset = () => {
  recipe.value = { ...defaultValues.recipe };
  servingSize.value = { ...defaultValues.servingSize };
  equivalentWeight.value = { ...defaultValues.equivalentWeight };
  caloriesPerServing.value = { ...defaultValues.caloriesPerServing };
};
</script>
<style lang="css" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--theme-background);
  color: var(--theme-heading);
  font-style: italic;
}

@media (max-width: 600px) {
  header {
    padding: 0.5rem 0.75rem;
  }
}

.calculator-container {
  background: var(--theme-surface);
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

@media (max-width: 600px) {
  .field-row {
    flex-direction: column;
  }

  .field-row .input-number-unit {
    width: 100%;
  }
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin: 2rem 0;
}

#input-form-reset {
  width: 100%;
}

.results-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  justify-content: space-between;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--theme-surface-subtle);
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
  color: var(--theme-heading);
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
  background-color: var(--theme-footer-background);
  color: var(--theme-footer-foreground);
  position: fixed;
  bottom: 0;
  width: 100%;
  align-items: center;
}

@media (max-width: 600px) {
  footer {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    position: static;
  }
}

.site-name {
  font-weight: 700;
  font-style: italic;
}

.attribution {
  font-style: italic;
  font-size: 0.875rem;
}
</style>
