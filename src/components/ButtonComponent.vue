<template>
  <button :id class="button" v-bind="$attrs" :class="classes">
    <i v-if="icon" class="button-icon" :class="icon" />
    {{ !iconOnly ? label : "" }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  id: string;
  label?: string;
  icon?: string;
  iconOnly?: boolean;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  iconOnly: false,
  primary: true,
  secondary: false,
  text: false,
});

const classes = computed(() => {
  return {
    "button-primary": props.primary && !props.secondary && !props.text,
    "button-secondary": props.secondary,
    "button-text": props.text,
    "button-icon-only": props.iconOnly,
  };
});
</script>

<style scoped>
.button {
  min-height: var(--field-height);
  border-radius: var(--radius-pill);
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.button-primary {
  background-color: var(--color-primary);
  color: white;
}

.button-primary:hover,
.button-primary:focus {
  background-color: var(--color-primary-container);
}

.button-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.button-text {
  background-color: transparent;
  color: var(--color-primary);
}

.button-icon-only {
  padding: 0.75rem;
  height: var(--field-height);
  width: var(--field-height);
}
</style>
