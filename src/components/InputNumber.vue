<template>
  <div class="input-number">
    <label v-if="!hideLabel">{{ label }}</label>
    <input type="number" :value />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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
.input-number {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
