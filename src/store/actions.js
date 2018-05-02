import * as Types from './mutation-type'

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(Types.SET_PLAYLIST, list)
  commit(Types.SET_SEQUENCE_LIST, list)
  commit(Types.SET_FULL_SCREEN, true)
  commit(Types.SET_PLAYING_STATE, true)
  commit(Types.SET_CURRENT_INDEX, index)
}
