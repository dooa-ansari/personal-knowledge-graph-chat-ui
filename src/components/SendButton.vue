<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  isLoading?: boolean
  disabled?: boolean
  text?: string
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  disabled: false,
  text: undefined,
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    :disabled="disabled || isLoading"
    @click="$emit('click', $event)"
    class="px-4 py-2 bg-portfolio-purple hover:bg-portfolio-purple/90 active:scale-[0.98] text-white font-medium text-xs sm:text-sm rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-portfolio-purple transition-all duration-150 cursor-pointer flex items-center gap-1.5 font-mono shadow-sm"
  >
    <span
      v-if="isLoading"
      class="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"
    ></span>
    <span>{{ isLoading ? t('loading') : text || t('send') }}</span>
    <kbd
      v-if="!isLoading"
      class="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-black/25 rounded border border-white/10 font-mono text-gray-200"
    >
      ↵
    </kbd>
  </button>
</template>
