<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  message: string
  prefix?: string
  canRetry?: boolean
  retryCountdown?: number
}

withDefaults(defineProps<Props>(), {
  prefix: '[ERR]',
  canRetry: false,
  retryCountdown: 0,
})

defineEmits<{
  (e: 'retry'): void
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="bg-portfolio-surface border border-red-500/30 rounded-xl p-4 text-xs font-mono text-red-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
  >
    <div class="flex items-start gap-2.5">
      <span class="text-red-500 font-bold select-none shrink-0">{{ prefix }}</span>
      <span class="leading-relaxed">{{ message }}</span>
    </div>

    <button
      v-if="canRetry"
      type="button"
      :disabled="retryCountdown > 0"
      @click="$emit('retry')"
      class="self-start sm:self-auto px-3 py-1.5 bg-red-500/15 hover:bg-red-500/25 active:scale-95 text-red-300 font-mono text-xs rounded-lg border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1.5 shrink-0"
    >
      <span v-if="retryCountdown > 0">⏳ {{ retryCountdown }}s</span>
      <span v-else>↻ {{ t('retry') }}</span>
    </button>
  </div>
</template>
