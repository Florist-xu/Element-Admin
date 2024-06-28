<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '测试',
  },
}
</route>

<template>
  <view class="card-swiper">
    <wd-tabs v-model="tab" animated :slidableNum="4" :map-num="5" :lineWidth="55">
      <block v-for="item in software" :key="item">
        <wd-tab :title="item">
          <wd-card type="rectangle" v-for="item in list" :key="item">
            <template #title>
              <view class="title">
                <view>{{ item.createtime }}</view>
              </view>
            </template>
            <view style="height: 100px" class="content">
              <wd-img
                :src="item.imgurl"
                width="40"
                height="40"
                alt="joy"
                style="margin-right: 12px; border-radius: 4px"
              />
              <view>
                <view style="font-size: 16 px; color: rgba(0, 0, 0, 0.85)">
                  {{ item.dissname }}
                </view>
                <view style="font-size: 12 px; color: rgba(0, 0, 0, 0.25)">
                  {{ item.creator.name }}
                </view>
              </view>
            </view>

            <template #footer>
              <view>
                <wd-button size="small" style="margin-right: 8px" @click="getPlayList(item.dissid)">
                  立即播放
                </wd-button>
                <wd-button size="small" @click="getDetails(item.dissid)" plain>查看详情</wd-button>
              </view>
            </template>
          </wd-card>
        </wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { getSongs, getPlaylist } from '@/service/index/foo'
const list: any = ref([])
const tab = ref(0)
const software = ['QQ音乐', '酷狗音乐', '酷我音乐', 'Bilibili', '咪咕音乐', '千千音乐']
onLoad(() => {
  getSongs({
    picmid: 1,
    rnd: Math.random(),
    g_tk: 732560869,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf - 8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
  }).then((res: any) => {
    console.log(res)
    list.value = res
  })
})
const getPlayList = (id) => {
  getPlaylist({ disstid: id }).then((res: any) => {
    console.log(res)
  })
}
const getDetails = (id) => {
  getPlaylist({ disstid: id }).then((res: any) => {
    uni.navigateTo({
      url: `/pages/index/playlist?param1=` + JSON.stringify(res),
    })
  })
}
</script>

<style lang="scss" scoped>
.content,
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.25);
}
</style>
