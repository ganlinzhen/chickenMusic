<template>
  <div class="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="backgroud">
        <img width="100%" height="100%" :src="currentSong.image" alt="">
      </div>
      <div class="top">

      </div>
      <div class="middle">

      </div>
      <div class="bottom">

      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
      mini 播放器
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'palyer',
    computed: {
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playlist',
        'currentSong'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .backgroud
        position absolute
        left 0
        top 0
        width: 100%
        height 100%
        z-index -1
        opacity 0.6
        filter blur(10px)
    .mini-player
      display flex
      align-items center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
</style>

