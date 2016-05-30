import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import IcAddPhoto from 'material-ui/lib/svg-icons/image/add-a-photo'
import IcEditPhoto from 'material-ui/lib/svg-icons/image/edit'
import IcDeletePhoto from 'material-ui/lib/svg-icons/action/delete'
import Box from 'react-layout-components'
import store from '../store/configureStore'
import * as PhotoActions from '../actions/constats'

const defaultImg = require('../../../www/img/constats-thumbnails/constat_2.jpg')

class AjouterPhotoConstatTpl extends React.Component {
  render() {
    const { photo } = this.props
    const removePhoto = () => {
      store.dispatch(PhotoActions.removePhoto(photo.id))
    }
    const updatePhotoDescription = (newDescriptionValue) => {
        store.dispatch(PhotoActions.editPhoto(photo, newDescriptionValue))
    }
    return (
      <Box className="photo">
          <Box justifyContent="center" alignItems="flex-start">
            <Box column="shortcut" justifyContent="center" alignItems="center">
              <img
                src= {photo.img}
              />
            </Box>
            <Box column="shortcut" justifyContent="flex-start" alignItems="flex-start">
              <TextField
                hintText="Description de la photo"
                floatingLabelText="Description"
                multiLine={true}
                onBlur= {(evt) => {
                  updatePhotoDescription(evt.target.value)
                }}
                rows={2}
              />
              <Box justifyContent="flex-start" alignItems="flex-start">
                <Box>
                    <RaisedButton
                        label="Supprimer"
                        secondary={true}
                        onClick= {() => removePhoto()}
                        icon={<IcDeletePhoto />} />
                </Box>
            </Box>
            </Box>
        </Box>
      </Box>
    );
  }
}

AjouterPhotoConstatTpl.propTypes = {
  photo: PropTypes.object.isRequired,
}

export default AjouterPhotoConstatTpl
