import { ADD_PHOTO, EDIT_PHOTO, DELETE_PHOTO, DELETE_ALL_PHOTO, ENVOIE_INSERT_CLIENT_PARSE } from '../constants/ActionsType'
import { _LS_PHOTOS_CONSTATS } from '../constants/config'
import { localStorageSetArray, localStorageGetArray, localStorageUpdateArrayItem } from '../utils/UtilsLocalStorage'

let constatImage = [];
let incrementedID = 0;

export function addPhoto(img, description) {
  // INSERTION DES IMAGES DANS LE LOCALSTORAGE
    // INITIALIZE LOCALSTORAGE
      // window.localStorage.removeItem("localStoragePhotosConstat");

    // ASSIGN LOCALSTORAGE
      let currentLocalStorage = localStorageGetArray(_LS_PHOTOS_CONSTATS)
      // console.log("actions currentLocalStorage ====")
      // console.log(currentLocalStorage)
      // console.log("actions currentLocalStorage ====")
      if(currentLocalStorage !== null) {
          incrementedID = currentLocalStorage.length
          console.log("actions length ==== " + incrementedID)
      }
      const newImage = {
        id: incrementedID,
        img: img,
        description: description,
      }
      constatImage.push(newImage)
      localStorageSetArray(_LS_PHOTOS_CONSTATS, constatImage)

  // SOLUTION DU PROBLEME DE DUPLLICATION DU STATE
  incrementedID ++
  window.localStorage.setItem("addPhotoReducer" + incrementedID, "true")

  return {
    type: ADD_PHOTO,
    incrementedID,
    img,
    description,
  }
}

export function editPhoto(idPhoto, image, description) {
  const newImgValue = {
    id: idPhoto,
    img: image,
    description: description,
  }
  console.log("actions editPhoto ==== " + idPhoto)
  localStorageUpdateArrayItem(_LS_PHOTOS_CONSTATS, idPhoto, newImgValue)

  return {
    type: EDIT_PHOTO,
    idPhoto,
    description,
  }
}

export function removePhoto(idPhoto) {
  return {
    type: DELETE_PHOTO,
    idPhoto,
  }
}
