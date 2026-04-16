<template>
  <div class="input-number-unit">
    <label :for="name" v-if="!hideLabel">{{ label }}</label>
    <div class="field">
      <InputNumber
        :id="`${id}-input`"
        :name="`${name}-input`"
        :label="label"
        v-model="value"
        hide-label
        v-bind="$attrs"
      />

      <SelectComponent
        :id="`${id}-select`"
        :name="`${name}-select`"
        v-model="unit"
        :label
        :options
        :disabled="selectDisabled"
        hide-label
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputNumber from "./InputNumber.vue";
import SelectComponent from "./SelectComponent.vue";

interface Props {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
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
}

label {
  font-family: var(--font-display);
  font-weight: 600;
}
</style>
