<template>
  <div class="select-container">
    <select
      :name="`${name}-select`"
      v-model="model"
      :disabled
      :style="{ maxWidth: selectedOptionWidth }"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
      <option v-if="disabled" :value="model">{{ model }}</option>
    </select>
    <span ref="measure" class="measure">{{ selectedOption?.label }}</span>
    <i class="select-icon fa-solid fa-caret-down" v-if="!disabled"></i>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";

interface Props {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  hideLabel?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideLabel: false,
  disabled: false,
});

const model = defineModel();
const measure = ref();

const selectedOptionWidth = ref("0px");

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === model.value);
});

const getSelectedOptionWidth = () => {
  nextTick(() => {
    if (measure.value) {
      selectedOptionWidth.value = `${measure.value.offsetWidth + 42}px`;
    }
    return "0px";
  });
};

watch(model, getSelectedOptionWidth, { immediate: true });
watch(
  () => props.options,
  (newOptions, oldOptions) => {
    if (newOptions.length !== oldOptions.length) {
      model.value = newOptions[0].value;
    }
  },
);
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  min-width: fit-content;
}

select {
  border: none;
  background: inherit;
  min-height: var(--field-height);
  padding: 0 0.75rem;
  border-radius: var(--radius-field);
  appearance: none;
  font-size: var(--field-font-size);
  color: var(--color-on-surface);
}

select:not(:disabled) {
  cursor: pointer;
  padding-inline-end: 1.5rem;
}

select:disabled {
  color: var(--color-on-surface);
  opacity: 1 !important;
  appearance: none;
  text-align: right;
}

i {
  position: absolute;
  right: 0.75rem;
}

@media (max-width: 400px) {
  i {
    right: 0.5rem;
  }
}

option {
  width: 10px;
}

.measure {
  position: absolute;
  visibility: hidden;
}
</style>
