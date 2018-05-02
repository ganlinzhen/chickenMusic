<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{'active': currentPageIndex === index}" v-for="(item, index) in dots" :key="index">{{index}}</span>
    </div>
  </div>
</template>

<script>
  import { addClass } from 'common/js/dom'
  import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: { // 可否循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: true,
            threshold: 0.2,
            bounce: true,
            easing: {
              style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              fn: function(t) {
                return t * (2 - t)
              }
            }
          }
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        pageIndex = pageIndex % 5
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    components: {
      BScroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable';
  .slider
    min-height 1px
    overflow hidden
    position relative
    .slider-group
      overflow hidden
      position relative
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
          img
            display block
            width 100%
    .dots
      position absolute
      left 0
      right 0
      bottom 12px
      text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 4px
        background $color-text-l
        &.active
          width: 20px
          background $color-text-ll

</style>
