import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = { nickname: '', avatar: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const songs = ref<any[]>([])

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const getSongs = (data) => {
      songs.value = data
    }
    const isLogined = computed(() => !!userInfo.value.token)

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      getSongs,
    }
  },
  {
    persist: true,
  },
)