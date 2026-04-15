<template>
  <div class="input-number-unit">
    <label :for="name" v-if="!hideLabel">{{ label }}</label>
    <div class="field">
      <InputNumber
        :id
        :name="`${name}-input`"
        :label="label"
        v-model="value"
        hide-label
        v-bind="$attrs"
      />
      <div class="select-container">
        <select
          :name="`${name}-select`"
          v-model="unit"
          :disabled="selectDisabled"
        >
          <option value="cups" selected>cups</option>
          <option value="oz">ounces</option>
          <option value="tbsp">tbsps</option>
          <option value="tsp">tsp</option>
          <option value="g">grams</option>
          <option value="ml">ml</option>
          <option v-if="selectDisabled" :value="unit">{{ unit }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputNumber from "./InputNumber.vue";

interface Props {
  id: string;
  name: string;
  label: string;
  hideLabel?: boolean;
  selectDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideLabel: false,
  selectDisabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const value = defineModel("value");
const unit = defineModel("unit");
</script>

<style scoped>
.input-number-unit {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--color-surface-container-highest);
  border-radius: var(--radius-field);
  gap: 0.5rem;
}

label {
  font-family: var(--font-display);
  font-weight: 600;
}

.select-container {
  position: relative;
}

:deep(select) {
  border: none;
  background: inherit;
  min-height: var(--field-height);
  padding: 0.75rem;
  border-radius: var(--radius-field);
  appearance: none;
}

:deep(select:not(:disabled)) {
  padding-right: 1.5rem;
  cursor: pointer;
}

.select-container:not(:has(select:disabled))::after {
  display: inline-block;
  content: "\f0d7";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  pointer-events: none;
}

:deep(select:disabled) {
  color: var(--color-on-surface);
  opacity: 1 !important;
  appearance: none;
  text-align: right;
}
</style>
