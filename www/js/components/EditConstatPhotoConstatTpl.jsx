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

class EditConstatPhotoConstatTpl extends React.Component {
  constructor(props) {
    super(props);
    // this.state.myHuissier.photos = _constatDetails.medias
    this.state = {
      value: props.description,
    };
  }
  onChangeFunction(component, value){
      console.log("onChangeFunction ==== ")
      // console.log(component)
      // this.setState({value: event.target.value});
      // component.setValue({value:value});
  }
  render() {
    const { photo } = this.props
    const removePhoto = () => {
      store.dispatch(PhotoActions.removePhoto(photo.id))
    }
    const changePhoto = () => {
      console.log("changePhoto === " + photo.id)
      const newDescUpdated = "new description updated"
      // store.dispatch(PhotoActions.editPhoto(photo.id, photo.img, photo.description))
      store.dispatch(PhotoActions.editPhoto(photo.id, photo.img, newDescUpdated))
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
                onClick= {() => changePhoto()}
              />
            </Box>
            <Box column="shortcut" justifyContent="flex-start" alignItems="flex-start">
              <TextField
                hintText="Description de la photo"
                floatingLabelText="Description"
                multiLine={true}
                defaultValue= {photo.description}
                rows={2}
                onBlur= {(evt) => {
                  updatePhotoDescription(evt.target.value)
                }}
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

EditConstatPhotoConstatTpl.propTypes = {
  photo: PropTypes.object.isRequired,
}

export default EditConstatPhotoConstatTpl
