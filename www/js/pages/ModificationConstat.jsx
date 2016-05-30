import React from 'react'
import HeaderBar from '../components/HeaderBar'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import IcFileUpload from 'material-ui/lib/svg-icons/file/file-upload'
import IcAddPhoto from 'material-ui/lib/svg-icons/image/add-a-photo'
import IcCollection from 'material-ui/lib/svg-icons/image/collections'
import imgConstat from "../../../www/img/constats-thumbnails/constat_2.jpg"
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import AjouterPhotoConstatTpl from '../components/AjouterPhotoConstatTpl'
import { push } from 'react-router-redux'
import Box from 'react-layout-components'

import { connect } from 'react-redux'
import * as ConstatActions from '../actions/constats'
import { bindActionCreators } from 'redux'
import MessageBox from '../components/MessageBox'
import EditConstatPhotoConstatTpl from '../components/EditConstatPhotoConstatTpl'
import IcSavePhoto from 'material-ui/lib/svg-icons/content/save'
import IcEditPhoto from 'material-ui/lib/svg-icons/image/edit'
import IcDeletePhoto from 'material-ui/lib/svg-icons/action/delete'
import { localStorageGetItemByItemId } from '../utils/UtilsLocalStorage'
import { _LS_MES_CONSTATS, _LS_PREVIEW_DETAIL_CONSTAT } from '../constants/config'

const submitBtnStyle = {
  marginTop: 14,
}
const btnActions = {
  margin: 10,
}

let image_id = 0

//-------------------------------------------------//
//-------------- Begin Form validation  -----------//
//-------------------------------------------------//
const validate = values => {
  const errors = {}
  if (!values.titre) {
    errors.titre = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }

  return errors
}
//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

class ModificationConstat extends React.Component {
  constructor(props) {
    super(props);
    // this.state.myHuissier.photos = _constatDetails.medias
    this.state = {
      openMessageBox: false,
      MessageBoxMessage: "",
      openPhotoAddBtn: false,
    };
  }
  onChangeFunction(component, value){
      this.setValue({value:value});
  }

  render() {
    const {fields: {titre, description}, handleSubmit, constatDetailData, medias, actions, _settingState} = this.props
    const is_loading = _settingState.isLoading
    const submit = (values, dispatch) => {
      const _editedConstat = {
        titre: values.titre,
        description: values.description,
        medias: medias,
      }
      store.dispatch(ConstatActions.updateConstatAsync( _editedConstat, '/paiement' ))
      // store.dispatch(actions.removeAllPhoto())
      //
      // store.dispatch(ConstatActions.addConstatAsync(_newConstat, "/mes_constats"))
    }

    const takePhotoFromGallerie = () => {
      console.log("takePhotoFromGallerie =======")
      if (!navigator.camera) {
          this.setState({
            openMessageBox: true,
            MessageBoxMessage: "Camera API not supported",
          });
          setTimeout(() => {
              this.setState({
                openMessageBox: false,
                MessageBoxMessage: "",
              });
          }, 4000);
        return;
      }
      const options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 2,      // 0:Photo Library, 1=Camera, 2=Saved Album
        encodingType: 0,     // 0=JPG 1=PNG
      };

      navigator.camera.getPicture(
        (fileUri) => store.dispatch(actions.addPhoto("data:image/jpeg;base64," + fileUri, "", medias)),
        (Errormsg) => {console.log("Error getting picture from gallery ::: " + Errormsg)},
        options,
      )
    }

    const takeNewCameraPicture = () => {
      // IMAGE STATIQUE
      if(image_id === 3) {
        image_id = 0
      }
      image_id ++
      store.dispatch(actions.addPhoto(require("../../../www/img/constats-thumbnails/constat_" + image_id + ".jpg"), "Default add description", medias))
      return;

      // UTILISATION DU CAMERA DU DEVICE
      if (!navigator.camera) {
          this.setState({
            openMessageBox: true,
            MessageBoxMessage: "Camera API not supported",
          });
          setTimeout(() => {
              this.setState({
                openMessageBox: false,
                MessageBoxMessage: "",
              });
          }, 4000);
        return;
      }
      const options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
        encodingType: 0,     // 0=JPG 1=PNG,
        saveToPhotoAlbum: true,
      };
      navigator.camera.getPicture (
        (fileUri) => store.dispatch(actions.addPhoto(fileUri, "", medias)),
        (Errormsg) => {console.log("Error getting picture ::: " + Errormsg)},
        options,
      )
    }

    return (
      <div>
        <HeaderBar title="Ajout constat" className="header-bar" />
        <div id="ajout-constat-container" className="container">
          <div>
            <form method="post" onSubmit={handleSubmit(submit)}>
              <div className="action-to-that-constat grid-2">
                <div className="box">
                    <RaisedButton
                      label="Envoyer"
                      primary={true}
                      type="submit"
                      icon={<IcFileUpload />} />
                </div>
                <div className="box">
                </div>
              </div>
              <div>
                <TextField
                  hintText="Titre du constat"
                  floatingLabelText="Titre"
                  value= {constatDetailData.titre}
                  onChange={this.onChangeFunction}
                  errorText={titre.touched && titre.error ? titre.error : ''}
                   {...titre}
                />
              </div>
              <div>
                <TextField
                  hintText="Description sur le constat"
                  floatingLabelText="Description"
                  value= {constatDetailData.description}
                  multiLine={true}
                  rows={2}
                  errorText={description.touched && description.error ? description.error : ''}
                   {...description}
                />
              </div>
              <div id="photos">
                  {medias.map(media =>
                    <EditConstatPhotoConstatTpl key={media.id} photo={media} />
                  )}
              </div>
              <div>
                <RaisedButton
                  label="Prendre une photo"
                  style= {btnActions}
                  secondary={true}
                  id="take-picture"
                  onClick= {() => takeNewCameraPicture()}
                  icon={<IcAddPhoto />} />
                <RaisedButton
                  label="Depuis ma gallerie"
                  style= {btnActions}
                  secondary={true}
                  onClick= {() => takePhotoFromGallerie()}
                  icon={<IcCollection />} />
                  <MessageBox message={this.state.MessageBoxMessage} open={this.state.openMessageBox} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

ModificationConstat = reduxForm({
  form: 'EditFinding',
  fields: ['titre', 'description'],
  validate,
})(ModificationConstat);

function mapStateToProps(state) {
  const _idConstatPreview = window.localStorage.getItem( _LS_PREVIEW_DETAIL_CONSTAT )
  const _settingState = state.myHuissier.settings
  let _constatDetails = localStorageGetItemByItemId( _LS_MES_CONSTATS, _idConstatPreview )
  let mediasState = state.myHuissier.photos
  if(mediasState.length === 1 && mediasState[0].id === 0) {
    mediasState.shift()
  }
  return {
    constatDetailData: _constatDetails,
    medias: mediasState,
    _settingState: _settingState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConstatActions, dispatch),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ModificationConstat)
