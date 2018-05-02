import { playMode } from 'common/js/config.js'

const state = {
  singer: {},
  playing: false, // 播放暂停开始
  fullScreen: false, // 是全屏还是mini
  playlist: [], // 未排序的播放列表
  sequenceList: [], // 排序之后的播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前歌曲的 index
}

export default state
