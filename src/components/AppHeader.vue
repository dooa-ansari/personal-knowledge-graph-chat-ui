<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  version?: string
}

withDefaults(defineProps<Props>(), {
  title: 'knowledge_graph',
  subtitle: 'rag_query',
  version: 'v1.0.0',
})
</script>

<template>
  <header class="flex items-center justify-between pb-3 border-b border-portfolio-muted/20">
    <div class="flex items-center gap-2.5 font-mono text-xs text-portfolio-muted">
      <span class="inline-block w-2 h-2 rounded-full bg-portfolio-green animate-pulse"></span>
      <span class="text-gray-300 font-semibold tracking-wide">{{ title }}</span>
      <span class="text-portfolio-muted">/</span>
      <span>{{ subtitle }}</span>
    </div>
    <div
      class="font-mono text-[11px] text-portfolio-muted bg-portfolio-surface px-2 py-0.5 rounded border border-portfolio-muted/20"
    >
      {{ version }}
    </div>
  </header>
</template>
