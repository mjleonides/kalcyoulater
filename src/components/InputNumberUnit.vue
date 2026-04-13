<template>
  <div class="input-number-unit">
    <label v-if="!hideLabel">{{ label }}</label>
    <div class="field">
      <InputNumber :label="label" v-model="value" hide-label v-bind="$attrs" />
      <select v-model="unit" :disabled="selectDisabled">
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
</template>

<script setup lang="ts">
import InputNumber from "./InputNumber.vue";

interface Props {
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
  align-items: center;
}

.field {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
