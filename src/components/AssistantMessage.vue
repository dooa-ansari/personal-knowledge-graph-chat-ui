<script setup lang="ts">
interface Props {
  content: string
  title?: string
  status?: string
}

withDefaults(defineProps<Props>(), {
  title: 'rag_response',
  status: '200 OK',
})
</script>

<template>
  <div
    class="bg-portfolio-surface border border-portfolio-muted/30 rounded-xl overflow-hidden shadow-xl shadow-black/40 transition-all duration-200"
  >
    <!-- Panel Header -->
    <div
      class="flex items-center justify-between px-4 py-2 bg-portfolio-dark/60 border-b border-portfolio-muted/20 font-mono text-xs"
    >
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-portfolio-green/80 inline-block"></span>
        <span class="ml-2 text-portfolio-muted text-[11px]">{{ title }}</span>
      </div>
      <div class="flex items-center gap-2 text-portfolio-green text-[11px]">
        <span>●</span>
        <span>{{ status }}</span>
      </div>
    </div>

    <!-- Panel Body -->
    <div
      class="p-4 sm:p-5 text-gray-200 text-sm sm:text-base leading-relaxed font-sans border-b-2 border-b-portfolio-cyan"
    >
      <p class="whitespace-pre-wrap">{{ content }}</p>
    </div>
  </div>
</template>
