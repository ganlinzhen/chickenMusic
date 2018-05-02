<template>
  <div class="tab">
    <router-link tag="div" class="item" to="recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="item" to="singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" class="item" to="rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="search">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .tab
    display flex
    height 44px
    line-height 44px
    font-size $font-size-medium
    .item
      flex 1
      text-align center
      span
        padding-bottom 5px
        color $color-text-l
      &.router-link-active
        span
          color $color-theme
          border-bottom 2px solid $color-theme
</style>

