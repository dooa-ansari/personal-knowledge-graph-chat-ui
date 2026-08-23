<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { searchRag } from "./services/api";

const { t } = useI18n();
const userPrompt = ref("");
const answer = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleSend = async () => {
  const query = userPrompt.value.trim();
  if (!query || isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = "";
  answer.value = "";

  try {
    const data = await searchRag({
      prompt: query,
    });

    answer.value = data.answer;
  } catch (err: unknown) {
    errorMessage.value =
      err instanceof Error ? err.message : t("fetchAnswerError");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <div class="flex gap-2">
      <input
        v-model="userPrompt"
        type="text"
        :placeholder="t('promptPlaceHolder')"
        :disabled="isLoading"
        @keyup.enter="handleSend"
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="handleSend"
        :disabled="isLoading || !userPrompt.trim()"
        class="p-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ isLoading ? t('loading') : t('send') }}
      </button>
    </div>

    <div v-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>

    <p
      v-if="answer"
      class="text-lg mt-6 p-4 bg-gray-50 border border-gray-200 rounded text-gray-800 leading-relaxed"
    >
      {{ answer }}
    </p>
  </div>
</template>
