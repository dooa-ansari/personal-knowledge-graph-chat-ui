<script setup lang="ts">
import { ref, nextTick, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { searchRag } from "./services/api";
import AppHeader from "./components/AppHeader.vue";
import ChatInput from "./components/ChatInput.vue";
import SendButton from "./components/SendButton.vue";
import AssistantMessage from "./components/AssistantMessage.vue";
import UserMessage from "./components/UserMessage.vue";
import LoadingIndicator from "./components/LoadingIndicator.vue";
import ErrorMessage from "./components/ErrorMessage.vue";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const { t } = useI18n();
const userPrompt = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const isRateLimited = ref(false);
const retryCountdown = ref(0);
const lastFailedPrompt = ref("");
const messages = ref<Message[]>([]);

let countdownTimer: ReturnType<typeof setInterval> | null = null;

const is429Error = (err: unknown): boolean => {
  return axios.isAxiosError(err) && err.response?.status === 429;
};

const startRateLimitCountdown = () => {
  if (countdownTimer) clearInterval(countdownTimer);
  retryCountdown.value = 30;
  countdownTimer = setInterval(() => {
    if (retryCountdown.value > 0) {
      retryCountdown.value--;
    } else if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }, 1000);
};

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

const scrollToBottom = async () => {
  await nextTick();
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

const handleSend = async (customQuery?: string, isRetry = false) => {
  const query = (customQuery ?? userPrompt.value).trim();
  if (!query || isLoading.value) return;

  // 1. Add user message if not a retry of existing query
  if (!isRetry) {
    messages.value.push({
      id: Date.now().toString(),
      role: "user",
      content: query,
    });
    userPrompt.value = "";
  }

  // 2. Clear previous error & trigger loading
  errorMessage.value = "";
  isRateLimited.value = false;
  isLoading.value = true;
  await scrollToBottom();

  try {
    const data = await searchRag({
      prompt: query,
    });

    // 3. Add assistant answer message
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.answer,
    });
    lastFailedPrompt.value = "";
    await scrollToBottom();
  } catch (err: unknown) {
    if (is429Error(err)) {
      isRateLimited.value = true;
      lastFailedPrompt.value = query;
      errorMessage.value = t("rateLimitError");
      startRateLimitCountdown();
    } else {
      isRateLimited.value = false;
      errorMessage.value =
        err instanceof Error ? err.message : t("fetchAnswerError");
    }
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
};

const handleRetry = async () => {
  if (!lastFailedPrompt.value || isLoading.value || retryCountdown.value > 0) return;
  await handleSend(lastFailedPrompt.value, true);
};
</script>

<template>
  <main class="min-h-screen bg-portfolio-dark text-gray-200 flex flex-col items-center justify-between p-4 sm:p-6 antialiased selection:bg-portfolio-purple/30 selection:text-white">
    <!-- Main Content Container -->
    <div class="w-full max-w-3xl flex-1 flex flex-col gap-5 pb-24">

      <!-- Developer Header -->
      <AppHeader />

      <!-- Messages Chat Stream -->
      <div v-if="messages.length > 0" class="flex flex-col gap-4">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex flex-col gap-2 transition-all duration-200"
        >
          <!-- User Prompt Message -->
          <UserMessage
            v-if="message.role === 'user'"
            :content="message.content"
          />

          <!-- Assistant Answer Message -->
          <AssistantMessage
            v-else
            :content="message.content"
          />
        </div>

        <!-- Assistant Loading State Indicator -->
        <LoadingIndicator v-if="isLoading" />
      </div>

      <!-- Error State Panel with Retry -->
      <ErrorMessage
        v-if="errorMessage"
        :message="errorMessage"
        :can-retry="isRateLimited"
        :retry-countdown="retryCountdown"
        @retry="handleRetry"
      />

    </div>

    <!-- Sticky Bottom Command / Query Input Box -->
    <div class="sticky bottom-0 left-0 right-0 w-full max-w-3xl pt-2 pb-2 bg-linear-to-t from-portfolio-dark via-portfolio-dark to-transparent z-20">
      <div
        class="bg-portfolio-surface border border-portfolio-muted/30 rounded-xl p-2 focus-within:border-portfolio-cyan/70 focus-within:ring-1 focus-within:ring-portfolio-cyan/40 transition-all duration-150 shadow-2xl shadow-black"
      >
        <div class="flex items-center gap-3">
          <ChatInput
            v-model="userPrompt"
            :placeholder="t('promptPlaceHolder')"
            :disabled="isLoading"
            @submit="() => handleSend()"
          />
          <SendButton
            :is-loading="isLoading"
            :disabled="!userPrompt.trim()"
            @click="() => handleSend()"
          />
        </div>
      </div>
    </div>
  </main>
</template>
