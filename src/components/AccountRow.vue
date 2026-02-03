<script setup lang="ts">
import { ref } from 'vue';
import { Trash2, Eye, EyeOff, ChevronDown } from 'lucide-vue-next';
import { SelectContent, SelectIcon, SelectItem, SelectItemText, SelectPortal, SelectRoot, SelectTrigger, SelectValue, SelectViewport, } from 'reka-ui';
import type { Account } from '@/stores/useAccountStore';

const props = defineProps<{ account: Account }>();
const emit = defineEmits(['remove']);

const showPassword = ref(false);
const touched = ref({ login: false, password: false });

const handleLabelsBlur = () => {
  const parts = props.account.rawLabels
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s !== '');

  props.account.labels = parts.map((text) => ({ text }));
}

const handleTypeChange = () => {
  if (props.account.type === 'LDAP') {
    props.account.password = null;
  } else if (props.account.password === null) {
    props.account.password = '';
  }
}
</script>

<template>
  <div class="grid grid-cols-5 gap-4 items-start py-2">
    <input
      v-model="account.rawLabels"
      @blur="handleLabelsBlur"
      placeholder="Метка 1; Метка 2"
      maxlength="50"
      class="border p-2 rounded focus:ring-2 outline-none"
    />

    <SelectRoot v-model="account.type" @update:model-value="handleTypeChange">
      <SelectTrigger class="flex items-center justify-between border p-2 rounded outline-none bg-white w-full">
        <SelectValue />
        <SelectIcon>
          <ChevronDown class="h-4 w-4 text-gray-400" />
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="5"
          class="bg-white border rounded shadow-md z-50 min-w-[var(--reka-select-trigger-width)]"
        >
          <SelectViewport class="p-1">
            <SelectItem value="LDAP" class="p-2 hover:bg-blue-50 cursor-pointer outline-none rounded-sm">
              <SelectItemText>LDAP</SelectItemText>
            </SelectItem>

            <SelectItem value="Локальная" class="p-2 hover:bg-blue-50 cursor-pointer outline-none rounded-sm">
              <SelectItemText>Локальная</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <div class="flex flex-col">
      <input
        v-model="account.login"
        @blur="touched.login = true"
        maxlength="100"
        :class="[
          'border p-2 rounded outline-none',
          { 'border-red-500': touched.login && !account.login },
        ]"
      />
    </div>

    <div class="relative">
      <template v-if="account.type === 'Локальная'">
        <input
          v-model="account.password"
          :type="showPassword ? 'text' : 'password'"
          @blur="touched.password = true"
          maxlength="100"
          :class="['border p-2 rounded w-full outline-none pr-10', { 'border-red-500': touched.password && !account.password }]"
        />

        <button @click="showPassword = !showPassword" class="absolute right-2 top-2.5 text-gray-400">
          <Eye v-if="!showPassword" :size="18" />
          <EyeOff v-else :size="18" />
        </button>
      </template>
    </div>

    <button @click="emit('remove')" class="mt-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors">
      <Trash2 :size="20" />
    </button>
  </div>
</template>