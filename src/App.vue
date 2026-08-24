<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";
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
const messages = ref<Message[]>([]);

const scrollToBottom = async () => {
  await nextTick();
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

const handleSend = async () => {
  const query = userPrompt.value.trim();
  if (!query || isLoading.value) return;

  // 1. Add user message immediately
  messages.value.push({
    id: Date.now().toString(),
    role: "user",
    content: query,
  });

  // 2. Clear input & reset error
  userPrompt.value = "";
  errorMessage.value = "";
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
    await scrollToBottom();
  } catch (err: unknown) {
    errorMessage.value =
      err instanceof Error ? err.message : t("fetchAnswerError");
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
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

      <!-- Error State Panel -->
      <ErrorMessage
        v-if="errorMessage"
        :message="errorMessage"
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
            @submit="handleSend"
          />
          <SendButton
            :is-loading="isLoading"
            :disabled="!userPrompt.trim()"
            @click="handleSend"
          />
        </div>
      </div>
    </div>
  </main>
</template>
