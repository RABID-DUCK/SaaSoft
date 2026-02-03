import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Label {
  text: string
}

export interface Account {
  id: string
  labels: Label[]
  rawLabels: string
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
}

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts') || '[]'))

  watch(
    accounts,
    (val) => {
      localStorage.setItem('accounts', JSON.stringify(val))
    },
    { deep: true },
  )

  const addAccount = () => {
    accounts.value.push({
      id: crypto.randomUUID(),
      labels: [],
      rawLabels: '',
      type: 'Локальная',
      login: '',
      password: '',
    })
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((a) => a.id !== id)
  }

  return { accounts, addAccount, removeAccount }
})
