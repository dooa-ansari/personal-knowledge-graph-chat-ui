<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  text?: string
}

const props = defineProps<Props>()
const { t } = useI18n()

const infoKeys = [
  'info.aboutDooa.p1',
  'info.aboutDooa.p2',
  'info.aboutDooa.p3',
  'info.aboutDooa.p4',
  'info.aboutProject.p1',
  'info.aboutProject.p2',
  'info.aboutBackend.p1',
  'info.aboutBackend.p2',
  'info.aboutBackend.p3',
  'info.aboutBackend.p4',
]

const currentIndex = ref(Math.floor(Math.random() * infoKeys.length))
const currentInfoKey = computed(() => infoKeys[currentIndex.value] ?? infoKeys[0]!)
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % infoKeys.length
  }, 3000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div
    class="bg-portfolio-surface border border-portfolio-muted/30 rounded-xl p-4 flex flex-col gap-2.5 text-xs font-mono text-portfolio-muted shadow-md overflow-hidden transition-all duration-200"
  >
    <div class="flex items-center gap-3">
      <span
        class="inline-block w-3.5 h-3.5 border-2 border-portfolio-purple border-t-transparent rounded-full animate-spin shrink-0"
      ></span>
      <span class="text-gray-300 font-semibold">{{ props.text ?? t('loading') }}</span>
      <span class="text-portfolio-muted text-[11px] truncate">// retrieving knowledge graph</span>
    </div>

    <!-- Rotating Info Point -->
    <div class="pt-2 border-t border-portfolio-muted/15 min-h-[2.2rem] flex items-center">
      <Transition name="fade" mode="out-in">
        <p
          :key="currentIndex"
          class="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed flex items-center gap-2"
        >
          <span class="text-portfolio-cyan font-mono text-xs select-none">💡</span>
          <span>{{ t(currentInfoKey) }}</span>
        </p>
      </Transition>
    </div>
  </div>
</template>
