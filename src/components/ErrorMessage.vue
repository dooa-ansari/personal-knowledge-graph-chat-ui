<script setup lang="ts">
interface Props {
  message: string;
  prefix?: string;
}

withDefaults(defineProps<Props>(), {
  prefix: "[ERR]",
});
</script>

<template>
  <div
    class="bg-portfolio-surface border border-red-500/30 rounded-xl p-4 text-xs font-mono text-red-400 flex items-start gap-2.5 shadow-md"
  >
    <span class="text-red-500 font-bold select-none">{{ prefix }}</span>
    <span class="leading-relaxed">{{ message }}</span>
  </div>
</template>
