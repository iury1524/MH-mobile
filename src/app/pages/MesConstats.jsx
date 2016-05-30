import React from 'react';
import ConstatsListe from '../components/ConstatsListe'
import HeaderBar from '../components/HeaderBar'
import { connect } from 'react-redux'
import * as ConstatActions from '../actions/constats'
import { bindActionCreators } from 'redux'
import Paper from 'material-ui/lib/paper'
import { _LS_PREVIEW_DETAIL_CONSTAT } from '../constants/config'
import store from '../store/configureStore'
import { push } from 'react-router-redux'
import Box from 'react-layout-components'

class MesConstats extends React.Component {
  render() {
    const {constats, actions} = this.props;
    return (
      <div>
        <HeaderBar className="header-bar" />
        <Box id="mes-constats-container" className="liste-constat-grid" column="shortcut">
          {constats.map(constat => (
            <Paper zDepth={1} key={constat.id} className="constat-grid-details">
              <Box>
                <Box className="image-constat-container" width="40%">
                  <img
                    src={constat.medias[0].img}
                    onClick= {() => {
                        window.localStorage.setItem( _LS_PREVIEW_DETAIL_CONSTAT, constat.id )
                        store.dispatch(push('/details_constat'))
                    }}
                  />
                  <span className="constat-numero">{constat.medias.length}</span>
                </Box>
                <Box className="description-constat-container" width="60%" column="shortcut" alignSelf="baseline">
                  <Box className="title-state-container" alignContent="flex-start" justifyContent="space-between">
                    <Box>
                      <p className="title-constat"><strong>{constat.titre}</strong></p>
                    </Box>
                    <Box className="status-date">
                      <p>
                        <span>{constat.status}</span> <br />
                        <span>{constat._updated_at}</span>
                      </p>
                    </Box>
                  </Box>
                  <Box className="desciption">{constat.description}</Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </div>
    );
  }
};

function mapStateToProps(state) {
  let constatsState = state.myHuissier.constats
  if(constatsState.length === 1 && constatsState[0].id === 0){
    constatsState.shift()
  }
  return {
    constats: constatsState,
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
)(MesConstats)
