import Vue from 'vue'
import Router from 'vue-router'

import viewRank from 'components/view-rank/view-rank'
import viewSearch from 'components/view-search/view-search'
import viewrecommend from 'components/view-recommend/view-recommend'
import viewSinger from 'components/view-singer/view-singer'
import singerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      component: viewrecommend
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: viewrecommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: viewRank
    },
    {
      path: '/singer',
      name: 'singer',
      component: viewSinger,
      children: [
        {
          path: ':id',
          name: 'singerDetail',
          component: singerDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: viewSearch
    }
  ]
})
