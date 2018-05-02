<template>
  <div id="app">
    <view-header></view-header>
    <view-tab></view-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import ViewHeader from 'components/view-header/view-header'
  import ViewTab from 'components/view-tab/view-tab'
  import player from 'components/player/player'

  export default {
    name: 'App',
    components: {
      ViewHeader,
      ViewTab,
      player
    }
  }
</script>
<style>
</style>
