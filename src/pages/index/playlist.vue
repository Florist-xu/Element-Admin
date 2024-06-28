<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '所有音乐',
  },
}
</route>

<template>
  <view
    v-for="(item, index) in songs"
    :key="item.songid"
    class="flex justify-between flex-items-center"
    :class="index == active ? 'bg-blue' : 'bg-white'"
    @click="playSong(index)"
  >
    <wd-card :title="item.albumname">
      <view v-for="v in item.singer" :key="v">
        {{ v.name }}
      </view>
    </wd-card>
    <view class="flex flex-col m-r-20px position-relative">
      <wd-img
        class="float-right m-b-10px rotation stop"
        round
        width="50px"
        height="50px"
        :src="getImg(item.albummid)"
      >
        <template #error>
          <view class="error-wrap">没图</view>
        </template>
      </wd-img>
      <wd-icon
        v-if="index != active"
        color="#0083ff"
        class="box"
        name="play-circle"
        size="22px"
      ></wd-icon>
      <wd-icon color="#0083ff" class="box" v-else name="pause-circle" size="22px"></wd-icon>
    </view>
  </view>
</template>

<script lang="ts" setup>
const songs = ref([])
const active = ref()
// 获取传递的参数
onLoad((options) => {
  songs.value = JSON.parse(options.param1)
})
const getImg = (id: string) => {
  return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg?max_age=2592000`
}
const playSong = (index) => {
  active.value = index
  const sound = {}
  const songId = track.id.slice('qqtrack_'.length)
  // thanks to https://github.com/Rain120/qq-music-api/blob/2b9cb811934888a532545fbd0bf4e4ab2aea5dbe/routers/context/getMusicPlay.js
  const guid = '10000'
  const songmidList = [songId]
  const uin = '0'

  // server won't response with 320kbps request, downgrade to 128kbps
  const fileType = '128'
  const fileConfig = {
    m4a: {
      s: 'C400',
      e: '.m4a',
      bitrate: 'M4A',
    },
    128: {
      s: 'M500',
      e: '.mp3',
      bitrate: '128kbps',
    },
    320: {
      s: 'M800',
      e: '.mp3',
      bitrate: '320kbps',
    },
    ape: {
      s: 'A000',
      e: '.ape',
      bitrate: 'APE',
    },
    flac: {
      s: 'F000',
      e: '.flac',
      bitrate: 'FLAC',
    },
  }
  const fileInfo = fileConfig[fileType]
  const file = songmidList.length === 1 && `${fileInfo.s}${songId}${songId}${fileInfo.e}`

  const reqData = {
    req_1: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        filename: file ? [file] : [],
        guid,
        songmid: songmidList,
        songtype: [0],
        uin,
        loginflag: 1,
        platform: '20',
      },
    },
    loginUin: uin,
    comm: {
      uin,
      format: 'json',
      ct: 24,
      cv: 0,
    },
  }
  uni.request({
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    methods: 'post',
    data: {
      id: songs.value[index].songid,
    },
    success: (res) => {
      console.log(res)
    },
  })
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.rotation {
  animation: rotation 10s linear infinite;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
// 暂停动画
.stop {
  animation-play-state: paused;
}
:deep(.wd-card) {
  background: none;
}
</style>
