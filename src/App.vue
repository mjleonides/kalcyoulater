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
            v-model:unit="servingSize.unit"
            :options="limitedUnitOptions"
            placeholder="e.g. 1"
            required
            inputmode="decimal"
          />

          <!-- Equivalent measure -->
          <InputNumberUnit
            id="equivalent-measure"
            name="equivalent-measure"
            label="Equivalent Measure"
            v-model:value="equivalentMeasure.value"
            v-model:unit="equivalentMeasure.unit"
            :options="unitOptions"
            placeholder="e.g. 14"
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
          placeholder="e.g. 70"
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
            <p>{{ conversionRequired ? "Converted" : "" }} Measure to Use</p>
          </div>
          <p
            class="result-value"
            v-if="
              calculatedMeasure &&
              calculatedMeasure.measure &&
              calculatedMeasure.unit
            "
          >
            {{ calculatedMeasure.measure.toFixed(1) }}
            <span class="result-unit">{{ calculatedMeasure.unit }}</span>
          </p>
          <p v-else>--</p>
        </div>
        <div class="result calculated-calories">
          <div>
            <h2>Energy Content</h2>
            <p>Calories in Recipe Amount</p>
          </div>
          <p class="result-value" v-if="calculatedCalories">
            {{ Math.round(calculatedCalories) }}
            <span class="result-unit">kcal</span>
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
import { unitDefinitions, convertUnit } from "./lib/unit-conversions";

const defaultValues = {
  recipe: { value: undefined, unit: "cups" },
  servingSize: { value: undefined, unit: "tbsp" },
  equivalentMeasure: { value: undefined, unit: "g" },
  caloriesPerServing: { value: undefined, unit: "kcal" },
};

const recipe = ref({ ...defaultValues.recipe });
const servingSize = ref({ ...defaultValues.servingSize });
const equivalentMeasure = ref({ ...defaultValues.equivalentMeasure });
const caloriesPerServing = ref({ ...defaultValues.caloriesPerServing });
const themeStore = useThemeStore();
const { theme, themeToggleIcon, themeToggleLabel } = storeToRefs(themeStore);
const { cleanupTheme, initializeTheme, toggleTheme } = themeStore;

onMounted(() => {
  initializeTheme();
});

onBeforeUnmount(() => {
  cleanupTheme();
});

const unitOptions = Object.entries(unitDefinitions).map(
  ([unit, definition]) => ({
    value: unit,
    label: definition.label,
  }),
);

const limitedUnitOptions = computed(() => {
  const recipeUnit = recipe.value.unit;
  if (recipeUnit) {
    const reciptUnitCategory = unitDefinitions[recipeUnit].category;

    return Object.entries(unitDefinitions)
      .filter(([, definition]) => definition.category === reciptUnitCategory)
      .map(([unit, definition]) => ({
        value: unit,
        label: definition.label,
      }));
  }
  return unitOptions;
});

const conversionRequired = computed(() => {
  return (
    recipe.value.value &&
    servingSize.value.unit &&
    recipe.value.unit !== servingSize.value.unit
  );
});

const calculatedMeasure = computed(() => {
  /*
  This should output in 3 scenarios:
    if recipe has value and serving size has unit that is different, convert the receipe value else output nothing since that would not be valuable
    if recipe and serving size provided and equivalent measure provided but different units, convert recipe to serving size unit then use recipe * eq meausure / serving size
    if recipe, serving size, and equivalent measure all have value, and same units then use recipe * eq meausure / serving size
  */

  let measure: number | undefined = undefined;
  let unit: string | undefined = undefined;

  if (recipe.value.value && servingSize.value.unit) {
    if (conversionRequired.value) {
      measure = convertUnit(
        recipe.value.value,
        recipe.value.unit,
        servingSize.value.unit,
      );
      unit = servingSize.value.unit;
    } else {
      measure = recipe.value.value;
    }

    if (servingSize.value.value && equivalentMeasure.value.value) {
      measure =
        (measure * equivalentMeasure.value.value) / servingSize.value.value;
      unit = equivalentMeasure.value.unit;
    }
  }

  return { measure, unit };
});

const calculatedCalories = computed(() => {
  let measure: number | undefined = undefined;

  if (
    recipe.value.value &&
    servingSize.value.value &&
    caloriesPerServing.value.value
  ) {
    if (recipe.value.unit === servingSize.value.unit) {
      measure = recipe.value.value;
    } else {
      measure = convertUnit(
        recipe.value.value,
        recipe.value.unit,
        servingSize.value.unit,
      );
    }

    return (caloriesPerServing.value.value / servingSize.value.value) * measure;
  }

  return undefined;
});

const onReset = () => {
  recipe.value = { ...defaultValues.recipe };
  servingSize.value = { ...defaultValues.servingSize };
  equivalentMeasure.value = { ...defaultValues.equivalentMeasure };
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

@media (max-width: 400px) {
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

@media (max-width: 400px) {
  .calculator-container {
    margin: 1rem;
    padding: 1rem;
  }
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

@media (max-width: 500px) {
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
