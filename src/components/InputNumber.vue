<template>
  <div class="input-number">
    <label v-if="!hideLabel">{{ label }}</label>
    <input type="number" v-model="value" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
interface Props {
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
}
</style>
