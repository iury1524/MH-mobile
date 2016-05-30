import React from 'react'
import store from '../store/configureStore'
import Box from 'react-layout-components'
import CircularProgress from 'material-ui/lib/circular-progress'

export default class LoadingBox extends React.Component {
  render() {
    const { constatsData }  = this.props
    return (
      <Box className="loadingLayout" justifyContent="center" alignItems="center">
        <CircularProgress justifyContent="center" alignItems="center" />
      </Box>
    )
  }
}
