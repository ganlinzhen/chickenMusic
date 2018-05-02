<template>
  <div class="singer">
    <list-view class="list-view" @selectSinger="toSingerDetail" :data="singerList"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_LENGTH = 10

export default {
  name: 'singer',
  data() {
    return {
      singerList: []
    }
  },
  mounted() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((element, index) => {
        if (index < HOT_LENGTH) {
          map.hot.items.push(new Singer({
            name: element.Fsinger_name,
            id: element.Fsinger_mid
          }))
        }

        let sortKey = element.Findex
        if (!map[sortKey]) {
          map[sortKey] = {
            title: sortKey,
            items: []
          }
        }

        map[sortKey].items.push(new Singer({
          name: element.Fsinger_name,
          id: element.Fsinger_mid
        }))
      })
      // 数组排序
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    toSingerDetail(item) {
      this.setSinger(item)
      this.$router.push({name: 'singerDetail', params: { id: item.id }})
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .singer
    position fixed
    width 100%
    top 90px
    bottom 0
</style>


