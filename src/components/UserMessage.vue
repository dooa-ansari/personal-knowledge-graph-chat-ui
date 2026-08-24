<script setup lang="ts">
interface Props {
  content: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex items-start gap-3">
    <span class="text-portfolio-cyan font-mono text-sm pl-2 select-none font-bold">❯</span>
    <div
      class="bg-portfolio-surface border border-portfolio-muted/30 rounded-xl px-4 py-2.5 text-sm sm:text-base font-sans text-gray-100 shadow-md"
    >
      {{ content }}
    </div>
  </div>
</template>
