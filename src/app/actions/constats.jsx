import Parse from 'parse'
import ParseReact from 'parse-react'
import thunk from 'redux-thunk'
import { VIEW_EDIT_CONSTAT_FORM, ADD_CONSTAT, EDIT_CONSTAT, DELETE_CONSTAT, ADD_PHOTO, EDIT_PHOTO, DELETE_ALL_PHOTO, DELETE_PHOTO, ENVOIE_INSERT_CLIENT_PARSE } from '../constants/ActionsType'
import { _LS_PHOTOS_CONSTATS, _LS_MES_CONSTATS, _LS_PREVIEW_DETAIL_CONSTAT, _PARSE_APP_ID, _PARSE_SERVER_URL } from '../constants/config'
import { localStorageSetArray, localStorageGetArray, localStorageUpdateArrayItem, localStorageRemoveItemByItemId, localStorageGetItemByItemId, getNextId } from '../utils/UtilsLocalStorage'
import store from '../store/configureStore'
import * as SettingsActions from './settings'
import { push } from 'react-router-redux'

let constatImage = [];
let newConstatID = 0;
let incrementedID = 0;

function addConstat (_newConstat) {
  console.log("addConstat function in action ===")
  return {
    type: ADD_CONSTAT,
    newConstat: _newConstat,
  }
}

export function addConstatAsync(_constat, _nextPush) {
  return dispatch => {
        Parse.initialize(_PARSE_APP_ID)
        Parse.serverURL = _PARSE_SERVER_URL

        store.dispatch(SettingsActions.startLoading())

        //Create the new finding object from infos and medias
        let _dateNow = new Date()
        const _date = _dateNow.getDate() + "/" + (_dateNow.getMonth() + 1) + "/" + _dateNow.getFullYear()

        //create new medias element if user not adding any medias
        if(_constat.medias.length === 0) {
          const defaultImg = {
            id: 0,
            img: require("../../../www/img/logo.png"),
            description: "",
          }
          let defaultMedia = []
          defaultMedia.push(defaultImg)
          _constat.medias = defaultMedia
        }
        // return save finding promise
        const Constat = Parse.Object.extend("constat");
        const newParseConstat = new Constat();
        newParseConstat.set("title", _constat.titre);
        newParseConstat.set("description", _constat.description);
        newParseConstat.set("_updated_at", _date);
        newParseConstat.set("_created_at", _date);
        newParseConstat.set("medias", _constat.medias);
        newParseConstat.set("statut", "En cours");

        newParseConstat.save(null, {
          success: function(_savedConstat) {
            let _uptAt = new Date(_savedConstat.get("updatedAt"))
            let _crtAt = new Date(_savedConstat.get("createdAt"))
            let newConstat = {
              id: _savedConstat.id,
              titre: _savedConstat.get("title"),
              description: _savedConstat.get("description"),
              status: _savedConstat.get("statut"), //0: en cours, 1: Complet, 2: non envoyé
              _updated_at: _uptAt.getDate() + "/" + (_uptAt.getMonth()) + "/" + _uptAt.getFullYear(),
              _created_at: _crtAt.getDate() + "/" + (_crtAt.getMonth()) + "/" + _crtAt.getFullYear(),
              medias: _savedConstat.get("medias"),
            }
            // Updating finding localstorage
            let currentMesConstatsLocalStorage = localStorageGetArray( _LS_MES_CONSTATS )
            currentMesConstatsLocalStorage.unshift(newConstat)
            localStorageSetArray( _LS_MES_CONSTATS, currentMesConstatsLocalStorage )

            // SOLUTION FOR DUPLICATION STATE
            window.localStorage.setItem("addConstatReducer" + _savedConstat.id, "true")

            // UPADATING STORE STATE
            dispatch( addConstat( newConstat ) )
            dispatch( removeAllPhoto() )

            store.dispatch(SettingsActions.stopLoading())
            store.dispatch(push( _nextPush ))
          },
          error: function(constat, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Error saving new finding : ')
            console.log(error)
            // alert('Failed to create new object, with error code: ' + error.message);
          },
        }).then((constat) => {
          console.log("add constat reussit === ")
          store.dispatch(SettingsActions.stopLoading())
          // REDIRECT TO NEXTPAGE
          //check if user is already connected
          // if connected
              // redirect to nextPush
              // else redirect to connexion and send the nextPush value
          // store.dispatch(push('/paiement'))
      })
  }
}

// export function addConstat(_titreConstat, _descriptionConstat, _medias) {
//
// }

export function updateConstat(_titre, _description, _medias) {
  // reccuperation de l'id du constat modifié
  const _idConstat = window.localStorage.getItem("LS_PreviewDetailConstatID")
  let constatStateInLS = localStorageGetItemByItemId( _LS_MES_CONSTATS, _idConstat )
  // mettre a jour les valeurs
  let _dateNow = new Date()
  const _date = _dateNow.getDate() + "/" + (_dateNow.getMonth() + 1) + "/" + _dateNow.getFullYear()

  // creation du nouveau objet en fonction des infos et des medias
  constatStateInLS._updated_at= _date,
  constatStateInLS.titre = _titre
  constatStateInLS.description = _description
  constatStateInLS.medias = _medias

  // Mettre a jour le constat dans le localStorage
  localStorageUpdateArrayItem(_LS_MES_CONSTATS, _idConstat, constatStateInLS)

  return {
    type: EDIT_CONSTAT,
    _idConstat,
    constatStateInLS,
  }
}

export function removeConstat(_idConstat) {
  // supprimer du constat depuis le localStorage
  localStorageRemoveItemByItemId( _LS_MES_CONSTATS, _idConstat )
  // envoie du type de l'action et l'id du constat supprimé vers reducers pour mettre a jour le store
  return {
    type: DELETE_CONSTAT,
    _idConstat,
  }
}
export function addPhoto(img, description, _currentMediasState) {
      if(_currentMediasState === undefined || _currentMediasState === null) {
        incrementedID = 1
      }
      else {
        // incrementedID = _currentMediasState.length + 1
        incrementedID = getNextId( _currentMediasState )
      }
      const newImage = {
        id: incrementedID,
        img: img,
        description: description,
      }
      constatImage.push(newImage)
      localStorageSetArray( _LS_PHOTOS_CONSTATS, constatImage )
  // SOLUTION DU PROBLEME DE DUPLLICATION DU STATE
  window.localStorage.setItem("addPhotoReducer" + incrementedID, "true")

  return {
    type: ADD_PHOTO,
    incrementedID,
    img,
    description,
  }
}

export function editPhoto(_photo, description) {
  // reccuperation de l'etat actuel de la photo en state
  const image = _photo.img
  const idPhoto = _photo.id

  // creation d'une nouvelle photo avec la nouvelle description
  const newImgValue = {
    id: _photo.id,
    img: image,
    description: description,
  }
  // mise a jour du localstorage avec la nouvelle photo ainsi créée
  localStorageUpdateArrayItem( _LS_PHOTOS_CONSTATS, idPhoto, newImgValue)

  // prepration des parametres pour le reducer
  return {
    type: EDIT_PHOTO,
    idPhoto,
    image,
    description,
  }
}

export function viewEditConstatForm() {
  // reccuperation du constat en cours d'edition
  const _idConstat = window.localStorage.getItem( _LS_PREVIEW_DETAIL_CONSTAT )
  let constatStateInLS = localStorageGetItemByItemId( _LS_MES_CONSTATS, _idConstat )
  console.log("viewEditConstatForm =====")
  console.log(constatStateInLS)
  console.log("viewEditConstatForm =====")
  // mis à jour du state photos en fonction des medias du constat en cours d'edition
  let _constatMedias = constatStateInLS.medias
  return {
    type: VIEW_EDIT_CONSTAT_FORM,
    _idConstat,
    _constatMedias,
  }
}
export function removeAllPhoto() {
  return {
    type: DELETE_ALL_PHOTO,
  }
}

export function removePhoto(idPhoto) {
  return {
    type: DELETE_PHOTO,
    idPhoto,
  }
}
