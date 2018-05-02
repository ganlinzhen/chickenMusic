<template>
  <transition name="slide">
    <music-list :bgImage="bgImage" :title="title" :songList="songs"></music-list>
  </transition>
</template>

<script>
  import { getSingerDetail } from 'api/singer'
  import { mapState } from 'vuex'
  import MusicList from 'components/music-list/music-list'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapState([
        'singer'
      ])
    },
    created() {
      this._getSongData()
    },
    methods: {
      _getSongData() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSong(res.data.list)
            console.log(this.songs)
          }
        })
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
