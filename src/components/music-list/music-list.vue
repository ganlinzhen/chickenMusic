<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bgImage" ref="bgImage" :style="bgStyle">
      <div class="playWrapper" ref="playWrapper">
        <div class="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="layer" ref="layer"></div>
    <scroll class="songlist" ref="songlist" @scroll="scroll" :listenScroll="listenScroll" :data="songList" :probe-type="probeType">
      <song-list @select="selectItem" :songList="songList" :rank="rank"></song-list>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/songList/songList'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    name: 'musicList',
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      songList: {
        type: Array,
        default: function() {
          return []
        }
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.bgImageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.bgImageHeight + RESERVED_HEIGHT
      this.$refs.songlist.$el.style.top = `${this.bgImageHeight}px`
      this.$refs.songlist.refresh()
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTranslateY, newVal)
        let zIndex = 0
        let scale = 1
        let blur = 0
        const percent = Math.abs(newVal / this.bgImageHeight)
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20, percent * 20)
        }

        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newVal < this.minTranslateY) {
          zIndex = 200
          this.$refs.bgImage.style.paddingTop = `${RESERVED_HEIGHT}px`
          this.$refs.playWrapper.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.playWrapper.style.display = 'block'
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    methods: {
      selectItem(item, index) {
        this.selectPlay({
          list: this.songList,
          index
        })
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 300
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 300
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bgImage
      position relative
      width 100%
      height: 0
      padding-top: 70%
      z-index 250
      transform-origin: top
      background-size cover
      .playWrapper
        position absolute
        z-index 250
        left 0
        bottom 20px
        width 100%
        .playBtn
          box-sizing: border-box
          width 135px
          padding 7px 0
          margin 0 auto
          text-align center
          border 1px solid $color-theme
          color $color-theme
          border-radius 100px
          font-size 0
          .icon-play
            display inline-block
            vertical-align middle
            margin-right 6px
            font-size $font-size-medium-x
          .text
            display inline-block
            vertical-align: middle
            font-size $font-size-small
      .filter
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(7, 17, 27, 0.4)
    .layer
      background-color $color-background
      height 100%
      position relative
      z-index 100
    .songlist
      position fixed
      z-index 100
      width 100%
      bottom 0
</style>
