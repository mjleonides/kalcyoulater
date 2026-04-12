<template>
  <div class="input-number-unit">
    <label v-if="!hideLabel">{{ label }}</label>
    <div class="field">
      <InputNumber :label="label" :model-value="value" hide-label />
      <select>
        <option value="cups">cups</option>
        <option value="oz">ounces</option>
        <option value="tbsp">tbsps</option>
        <option value="tsp">tsp</option>
        <option value="g">grams</option>
        <option value="ml">ml</option>
      </select>
    </div>
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
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped>
.input-number-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.field {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
