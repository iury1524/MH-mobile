import { VIEW_EDIT_CONSTAT_FORM, ADD_PHOTO, EDIT_PHOTO, DELETE_PHOTO, DELETE_ALL_PHOTO, _INIT_ACTION_TYPE } from '../constants/ActionsType'
import { localStorageSetArray, localStorageGetArray, localStorageUpdateArrayItem } from '../utils/UtilsLocalStorage'
import { _LS_PHOTOS_CONSTATS } from '../constants/config'

const defaultImg = {
  id: 0,
  img: require("../../../www/img/logo.png"),
  description: "",
}

let initialState = []
// let localStoragePhoto  = []
initialState.push(defaultImg)

// if(localStorageGetArray(_LS_PHOTOS_CONSTATS) !== undefined) {
//   localStoragePhoto = localStorageGetArray(_LS_PHOTOS_CONSTATS)
// }
// if(localStoragePhoto !== null) {
//   initialState = localStoragePhoto
// }

export default function photos(state = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
        if( window.localStorage.getItem("addPhotoReducer" + action.incrementedID) === "true") {
          window.localStorage.setItem("addPhotoReducer" + action.incrementedID, "false")
          return state
        }
        return [
          {
            id: action.incrementedID,
            img: action.img,
            description: action.description,
          },
          ...state,
        ]
    case DELETE_PHOTO:
      return state.filter(photo =>
        photo.id !== action.idPhoto
      )
    case DELETE_ALL_PHOTO:
      return state.filter(photo =>
        photo.id === -1
      )
    case EDIT_PHOTO:
      state.map(photo => {
        if (photo.id === parseInt(action.idPhoto)) {
          photo.id= action.idPhoto
          photo.img= action.image
          photo.description= action.description
        }
      })
      return state
    case VIEW_EDIT_CONSTAT_FORM:
      state = action._constatMedias
      return state
    default:
      return state
  }
}
