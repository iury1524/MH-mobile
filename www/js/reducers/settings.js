import { SET_LOADING_STATE } from '../constants/ActionsType'

const _initLoadingState = {
  isLoading: false,
  error: false,
  didInvalidate: false,
}
let initialState = []
initialState.push(_initLoadingState)

export default function settings(state = _initLoadingState, action) {
  switch (action.type) {
    case SET_LOADING_STATE:
      return {
        ...state,
        isLoading : action._loading,
      }
    default:
      return state
  }
}
