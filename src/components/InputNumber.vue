<template>
  <div class="input-number">
    <label v-if="!hideLabel">{{ label }}</label>
    <input :id :name type="number" v-model="value" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  name: string;
  label: string;
  hideLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideLabel: false,
});

const emit = defineEmits(["update:modelValue"]);

const value = defineModel();
</script>

<style scoped>
.input-number {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

input {
  border: none;
  min-height: var(--field-height);
  padding: 0.75rem 1rem;
  background: inherit;
  border-radius: var(--radius-field);
}
</style>
