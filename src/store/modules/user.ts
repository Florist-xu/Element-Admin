import { defineStore } from 'pinia'
import { storage } from '@/utils/storage'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: storage.get('token')
  }),
  actions: {}
})