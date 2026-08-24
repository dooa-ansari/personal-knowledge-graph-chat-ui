<script setup lang="ts">
interface Props {
  placeholder?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
});

const modelValue = defineModel<string>({ default: "" });

defineEmits<{
  (e: "submit"): void;
}>();
</script>

<template>
  <div class="flex-1 flex items-center gap-3">
    <span class="text-portfolio-cyan font-mono text-sm pl-3 select-none font-bold">❯</span>
    <input
      v-model="modelValue"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      @keyup.enter="$emit('submit')"
      class="flex-1 bg-transparent text-gray-100 placeholder-portfolio-muted/70 text-sm sm:text-base font-sans focus:outline-none py-2"
    />
  </div>
</template>
