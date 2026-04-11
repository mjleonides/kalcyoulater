<template>
  <div class="input-number-unit">
    <InputNumber :label="label" :model-value="value" />
    <select>
      <option value="cups">cups</option>
      <option value="g">grams</option>
      <option value="oz">ounces</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InputNumber from "./InputNumber.vue";

interface Props {
  modelValue: number;
  label: string;
  hideLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideLabel: false,
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped>
.input-number-unit {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}
</style>
