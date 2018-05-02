<template>
  <scroll class="list-view" @scroll="scroll" :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="scroll">
    <ul >
      <li class="list-group" ref="listGroup" v-for="(group,index) in data" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-item" @click="selectItem(item)" v-for="(item,index1) in group.items" :key="index1">
            <img class="avator" v-lazy='item.avatar' alt="avator">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStatrt" @touchmove.stop.prevent="onShortcutTouchmove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :key="index" :data-index="index" :class="{'current': index === currentIndex}">
          {{item}}
        </li>
      </ul>
    </div>
    <h2 class="fixed-title" ref="fixedTitle" v-show="fixedTitle">{{fixedTitle}}</h2>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import { processData } from 'common/js/dom.js'
  import Loading from 'base/loading/loading'
  const ANCHOR_HEIGHT = 18
  export default {
    data() {
      return {
        scrollY: 0,
        currentIndex: 0, // 当前的活跃shortcut
        diff: 0
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.listHeight = []
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < 30) ? (newVal - 30) : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixedTitle.style = `transform:translateY(${fixedTop}px)`
      }
    },
    methods: {
      onShortcutTouchStatrt(e) {
        this.touch.y1 = e.targetTouches[0].pageY
        this.touch.firstIndex = parseInt(processData(e.target, 'index'))

        this._scrollTo(this.touch.firstIndex)
      },
      onShortcutTouchmove(e) {
        this.touch.y2 = e.targetTouches[0].pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = this.touch.firstIndex + delta

        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      selectItem(item) {
        console.log(item)
        this.$emit('selectSinger', item)
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable";
  .list-view
    position relative
    width 100%
    height 100%
    overflow hidden
    background-color $color-background
    .fixed-title
      position absolute
      top 0
      left 0
      width 100%
      background-color $color-highlight-background
      color rgba(255,255,255,0.5)
      line-height 30px
      font-size 12px
      padding-left 20px
    .list-group
      .list-group-title
        background-color $color-highlight-background
        line-height 30px
        font-size 12px
        color rgba(255,255,255,0.5)
        padding-left 20px
      .list-item
        display flex
        align-items center
        box-sizing border-box
        height 70px
        font-size $font-size-medium
        padding 20px 0 0 30px
        .avator
          width 50px
          height 50px
          border-radius 25px
        .name
          color rgba(255,255,255,0.5)
          margin-left 20px
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
