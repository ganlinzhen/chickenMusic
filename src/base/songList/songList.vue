<template>
  <ul class="song-list">
    <li class="item" @click="selectItem(item, index)" v-for="(item, index) in songList" :key="index">
      <div class="rank" v-show="rank">
        <span :class="getClass(index)">{{getText(index)}}</span>
      </div>
      <div class="content">
        <h1 class="name" v-html="item.name"></h1>
        <h1 class="desc">{{getDes(item)}}</h1>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'songList',
    props: {
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
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDes(item) {
        return `${item.singer}·${item.album}`
      },
      getText(index) {
        return index > 2 ? index + 1 : ''
      },
      getClass(index) {
        return index > 2 ? 'text' : `icon icon${index}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list
    padding 20px 30px
    .item
      display flex
      box-sizing border-box
      height 64px
      font-size 14px
      align-items center
      font-size: $font-size-medium
      .rank
        flex 0 0 25px
        margin-right 30px
        text-align center
        .icon
          display inline-block
          width 25px
          height 24px
          background-size 25px 24px
          &.icon0
            bg-image('./img/first')
          &.icon1
            bg-image('./img/second')
          &.icon2
            bg-image('./img/third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d

</style>
