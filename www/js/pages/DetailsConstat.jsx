import React from 'react'
import HeaderDetailsPage from '../components/HeaderDetailsPage'
import imgConstat from '../../../www/img/constats-thumbnails/constat_1.jpg'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import IcMailOutline from 'material-ui/lib/svg-icons/communication/mail-outline'
import IcFileDownload from 'material-ui/lib/svg-icons/file/file-download'
import { _LS_PREVIEW_DETAIL_CONSTAT } from '../constants/config'
import IcEdit from 'material-ui/lib/svg-icons/image/edit'
import IcDelete from 'material-ui/lib/svg-icons/action/delete'
import { connect } from 'react-redux'
import * as ConstatActions from '../actions/constats'
import { bindActionCreators } from 'redux'
import { localStorageGetItemByItemId } from '../utils/UtilsLocalStorage'
import { _LS_MES_CONSTATS } from '../constants/config'
import store from '../store/configureStore'
import { push } from 'react-router-redux'

const idConstat = window.localStorage.getItem("LS_PreviewDetailConstatID")
const btnActionsStyles = {
  height: "auto",
};

class DetailsConstatPage extends React.Component {
  render() {
    const {constatDetailData, actions} = this.props;
    return (
      <div>
        <HeaderDetailsPage title="Détails Constat" className="header-bar" />
        <div id="details-constat-container" className="container">
          <div className="actions-to-that-detail grid-2">
            <div className="box">
              <RaisedButton
                label="Download the finding"
                primary={true}
                style={btnActionsStyles}
                icon={<IcFileDownload />} />
            </div>
            <div className="box">
              <RaisedButton
                label="Send to mail"
                secondary={true}
                style={btnActionsStyles}
                icon={<IcMailOutline />} />
            </div>
          </div>
          <h1 className="title">{constatDetailData.titre}</h1>
          <div className="description-constat-container">
            <h2>Description</h2>
            <p>{constatDetailData.description}</p>
          </div>
          <div className="photos-constat-container">
            <h2>Photos</h2>
            <div className="photos-constat-detail">
              {constatDetailData.medias.map(constatPhoto => (
                <div key={constatPhoto.id} className="grid-2 photo-detail">
                  <div className="box">
                    <img src={constatPhoto.img} alt="" />
                  </div>
                  <div className="box">
                    <p>{constatPhoto.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="actions-to-that-detail grid-2">
            <div className="box">
              <RaisedButton
                label="Edit"
                primary={true}
                onClick= {() => {
                    store.dispatch(actions.viewEditConstatForm())
                    store.dispatch(push('/modifier_constat'))
                }}
                style={btnActionsStyles}
                icon={<IcEdit />} />
            </div>
            <div className="box">
              <RaisedButton
                label="Delete"
                secondary={true}
                onClick= {() => {
                    store.dispatch(actions.removeConstat(window.localStorage.getItem("LS_PreviewDetailConstatID")))
                    store.dispatch(push('/mes_constats'))
                }}
                style={btnActionsStyles}
                icon={<IcDelete />} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const _idConstatPreview = window.localStorage.getItem("LS_PreviewDetailConstatID")
  let _constatDetails = localStorageGetItemByItemId(_LS_MES_CONSTATS, _idConstatPreview)
  return {
    constatDetailData: _constatDetails,
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
)(DetailsConstatPage)
