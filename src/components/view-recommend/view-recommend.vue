
<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="sliderList.length>0">
          <slider>
            <div v-for="(item, index) in sliderList" :key="index">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="list-item" v-for="(item, index) in discList" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading class="loading" v-if="!discList.length"/>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import slider from 'base/slider/slider'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      sliderList: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDisList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderList = res.data.slider
        }
      })
    },
    _getDisList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    loadImage() {
      if (!this.imageLoaded) {
        this.$refs.scroll.refresh()
        this.imageLoaded = true
      }
    }
  },
  components: {
    slider,
    scroll,
    loading
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position fixed
    top 88px
    bottom 0
    width 100%
    .recommend-content
      height 100%
      overflow hidden
      position relative
      .slider-wrapper
        width 100%
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          color $color-theme
          font-size $font-size-medium
        .list-item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0, 0, 60px
            width 60px
            padding-right 20px
          .text
            flex 1
            display flex
            flex-direction column
            justify-content center
            text-align left
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading
        width 100%
        position absolute
        top 50%
        transform translateY(-50%)
</style>


