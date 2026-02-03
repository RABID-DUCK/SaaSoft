<script setup lang="ts">
import { Plus, HelpCircle } from 'lucide-vue-next';
import { useAccountStore } from '@/stores/useAccountStore';
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import AccountRow from '@/components/AccountRow.vue';

const store = useAccountStore();
</script>

<template>
  <div class="max-w-6xl mx-auto p-8">
    <div class="flex items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Учётные записи</h1>

      <button
        @click="store.addAccount"
        class="border-2 border-gray-300 p-1 rounded hover:bg-gray-50 transition-colors"
      >
        <Plus :size="24" />
      </button>
    </div>

    <div class="bg-blue-50/60 p-4 rounded-lg flex items-start gap-3 mb-8 text-blue-800">
      <HelpCircle :size="20" class="shrink-0 mt-0.5" />
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>

    <ScrollAreaRoot class="w-full overflow-hidden rounded-md border">
      <ScrollAreaViewport class="w-full h-full p-4">
        <div class="min-w-[800px]">
          <div class="grid grid-cols-5 gap-4 mb-2 px-1 text-sm font-medium text-gray-500">
            <div>Метки</div>
            <div>Тип записи</div>
            <div>Логин</div>
            <div>Пароль</div>
            <div class="w-10"></div>
          </div>

          <div class="space-y-4">
            <AccountRow
              v-for="acc in store.accounts"
              :key="acc.id"
              :account="acc"
              @remove="store.removeAccount(acc.id)"
            />
          </div>
        </div>
      </ScrollAreaViewport>

      <ScrollAreaScrollbar
        orientation="horizontal"
        class="flex select-none touch-none p-0.5 bg-gray-100 transition-colors duration-150 ease-out hover:bg-gray-200 h-2.5 flex-col"
      >
        <ScrollAreaThumb class="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
  </div>
</template>