<template>
  <main class="app-shell">
    <section class="hero">
      <p class="eyebrow">Vue 3 + Vite</p>
      <h1>CalcYouLater</h1>
      <form id="input-form" class="input-form">
        <!-- Amount used in recipe -->
        <InputNumberUnit
          label="Amount used in recipe"
          :model-value="recipeAmount"
        />

        <!-- Nutrition label serving size -->
        <div>
          <span class="label">Doubled</span>
          <strong>{{ doubledCount }}</strong>
        </div>

        <!-- Equivalent metric weight -->

        <!-- Calories per serving -->
      </form>

      <!-- Results -->
      <div class="results-container"></div>

      <button type="button" class="action" @click="counter.increment()">
        Increment
      </button>
    </section>
  </main>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
import InputNumberUnit from "./components/InputNumberUnit.vue";

const counter = useCounterStore();
const { count, doubledCount } = storeToRefs(counter);

const recipeAmount = 100;
</script>
